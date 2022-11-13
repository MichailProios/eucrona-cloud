import { useState, useEffect, useRef } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Center,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  PinInput,
  PinInputField,
  HStack,
  Spinner,
  SlideFade,
} from "@chakra-ui/react";

import { redirect } from "@remix-run/node";

import type { LoaderFunction } from "@remix-run/node";

import * as auth from "app/utils/auth.server";
import * as cookie from "app/utils/cookie.server";

import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useMatches,
  useSubmit,
  useTransition,
} from "@remix-run/react";

import { RepeatIcon } from "@chakra-ui/icons";

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const session = await cookie.getSession(request.headers.get("Cookie"));
  const emailAddress = session.get("registered-emailAddress") || null;
  const type: any = data.get("type");
  const otp: any = data.get("otp");

  // const otp: any = data.get("otp");

  try {
    switch (type) {
      case "verify": {
        await auth.verifyAccount(emailAddress, otp);

        session.flash("verification-status", true);

        return redirect("/login", {
          headers: {
            "Set-Cookie": await cookie.commitSession(session),
          },
        });
      }
      case "resend": {
        return await auth.sendCode(emailAddress);
      }

      default: {
        return "";
      }
    }
  } catch (error: any) {
    if (error.name && error.message) {
      return { res: { name: error.name, message: error.message } };
    } else {
      return {
        res: { name: "unknownException", message: "Unknown exception" },
      };
    }
  }
}

export const loader: LoaderFunction = async ({
  request,
}: {
  request: Request;
}) => {
  try {
    await auth.unprotectedRoute(request);

    const session = await cookie.getSession(request.headers.get("Cookie"));
    const emailAddress = session.get("registered-emailAddress") || null;

    if (emailAddress) {
      return emailAddress;
    } else {
      return redirect("/verify-identify");
    }
  } catch (error) {
    return error;
  }
};

export default function Verify() {
  const actionData = useActionData();

  const submit = useSubmit();
  const isSubmitting: any = useTransition().submission;
  const emailAddress = useLoaderData();

  // console.log(emailAddress);

  function handleResend() {
    const formData = new FormData();
    formData.set("type", "resend");
    submit(formData, { method: "post" });
  }

  function handleVerify(value: any) {
    const formData = new FormData();
    formData.set("otp", value);
    formData.set("type", "verify");
    if (emailAddress) {
      submit(formData, { method: "post" });
    }
  }

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Container maxW="7xl" p={{ base: 1, md: 10 }}>
        <Center>
          <Stack spacing={4}>
            <Stack align="center">
              <Heading fontSize="2xl">Verify Account</Heading>
            </Stack>
            <VStack
              boxSize={{ base: "auto", xs: "xs", sm: "sm", md: "md" }}
              h="max-content !important"
              bg={useColorModeValue("white", "gray.700")}
              rounded="xl"
              boxShadow={"2xl"}
              p={{ base: 5, sm: 10 }}
              spacing={8}
            >
              <VStack spacing={4} w="100%">
                <FormControl id={"otp"}>
                  <FormLabel textAlign={"center"}>One Time Pin</FormLabel>
                  <HStack
                    w="100%"
                    display="flex"
                    justifyContent="center"
                    as={Form}
                    method="post"
                    spacing={{ base: 1, sm: 2 }}
                  >
                    <PinInput
                      otp
                      size={{ base: "sm", xs: "md", sm: "lg" }}
                      autoFocus
                      onComplete={(value) => {
                        handleVerify(value);
                      }}
                    >
                      <PinInputField readOnly={isSubmitting} />
                      <PinInputField readOnly={isSubmitting} />
                      <PinInputField readOnly={isSubmitting} />
                      <PinInputField readOnly={isSubmitting} />
                      <PinInputField readOnly={isSubmitting} />
                      <PinInputField readOnly={isSubmitting} />
                    </PinInput>
                  </HStack>
                </FormControl>

                {actionData?.res && !isSubmitting ? (
                  <Alert status="error" rounded="md">
                    <AlertIcon />
                    <AlertTitle>{actionData?.res.message} </AlertTitle>
                  </Alert>
                ) : isSubmitting ? (
                  <Spinner size="xl" />
                ) : (
                  <Alert status="info" rounded="md">
                    <AlertIcon />
                    <AlertTitle>
                      A one time pin was sent to {emailAddress}.
                    </AlertTitle>
                  </Alert>
                )}
              </VStack>

              <VStack spacing={4} w="100%">
                {actionData?.res?.name === "ExpiredCodeException" &&
                  !isSubmitting && (
                    <Button onClick={handleResend} colorScheme="primary">
                      Resend Code
                    </Button>
                  )}

                <Text>
                  Account already verified?&nbsp;
                  <Text
                    as={Link}
                    to="/login"
                    fontSize={{ base: "md", sm: "md" }}
                    fontWeight="bold"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Sign In
                  </Text>
                </Text>
              </VStack>
            </VStack>
          </Stack>
        </Center>
      </Container>
    </SlideFade>
  );
}
