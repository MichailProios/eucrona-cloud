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
  InputGroup,
  InputRightElement,
  Checkbox,
  FormErrorMessage,
  Textarea,
  Divider,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  PinInput,
  PinInputField,
  HStack,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Spinner,
  IconButton,
  SlideFade,
} from "@chakra-ui/react";

import { LoaderFunction, redirect } from "@remix-run/node";
import {
  ValidatedForm,
  validationError,
  useIsSubmitting,
  useField,
} from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

import * as auth from "app/utils/auth.server";
import { Link, useActionData } from "@remix-run/react";

export const validator = withZod(
  z.object({
    emailAddress: z
      .string()
      .min(1, { message: "Email Address is required" })
      .email("Must be a valid email")
      .trim(),
  })
);

export async function action({ request }: { request: Request }) {
  const data = await validator.validate(await request.formData());

  if (data.error) {
    return validationError(data.error);
  }

  const { emailAddress } = data.data;

  try {
    await auth.sendCode(emailAddress);

    const session = await auth.getSession(request.headers.get("Cookie"));
    session.flash("registered-emailAddress", emailAddress);
    return redirect("/verify", {
      headers: {
        "Set-Cookie": await auth.commitSession(session),
      },
    });
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
    return await auth.unprotectedRoute(request);
  } catch (error) {
    return error;
  }
};

function TextField(props: any) {
  const { error, getInputProps } = useField(props.name);
  const isSubmitting = useIsSubmitting();

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>{props.label}</FormLabel>
      <Input {...props} {...getInputProps()} isReadOnly={isSubmitting} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

// function TextField(props: any) {
//   const { error, getInputProps } = useField(props.name);
//   const isSubmitting = useIsSubmitting();

//   return (
//     <FormControl id={props.name} isInvalid={error ? true : false}>
//       <FormLabel>{props.label}</FormLabel>
//       <Input {...props} {...getInputProps()} isReadOnly={isSubmitting} />
//       <FormErrorMessage>{error}</FormErrorMessage>
//     </FormControl>
//   );
// }

function SubmitButton(props: any) {
  const isSubmitting = useIsSubmitting();
  const actionData = useActionData();

  return (
    <Button
      {...props}
      isLoading={isSubmitting}
      loadingText="Sending OTP"
      // disabled={actionData === "success" || isSubmitting}
    >
      {props.label}
    </Button>
  );
}

export default function VerifyIdentify() {
  const actionData = useActionData();

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Container maxW="7xl" p={{ base: 1, md: 10 }}>
        <Center
          as={ValidatedForm}
          validator={validator}
          method="post"
          id="verifyIdentifyForm"
          replace
        >
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
                <TextField
                  label="Email Address"
                  name="emailAddress"
                  placeholder="Enter your email"
                  rounded="md"
                  type="email"
                />
                {actionData?.res && (
                  <Alert status="error" rounded="md">
                    <AlertIcon />
                    <AlertTitle>{actionData?.res?.message}</AlertTitle>
                  </Alert>
                )}
              </VStack>

              <VStack spacing={4} w="100%">
                <SubmitButton
                  w="100%"
                  colorScheme="primary"
                  label="Verify Account"
                  type="submit"
                />

                <Text>
                  Already verified?&nbsp;
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
