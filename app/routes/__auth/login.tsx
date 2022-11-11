import { useState } from "react";
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
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SlideFade,
} from "@chakra-ui/react";
import { json } from "@remix-run/node"; // or cloudflare/deno

import type { LoaderFunction } from "@remix-run/node";

import { redirect } from "@remix-run/node";

import { Link, useLoaderData } from "@remix-run/react";
import {
  ValidatedForm,
  validationError,
  useIsSubmitting,
  useField,
} from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

import * as auth from "app/utils/auth.server";
import { useActionData } from "@remix-run/react";

export const validator = withZod(
  z.object({
    emailAddress: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),

    remember: z.any(),
  })
);

export const loader: LoaderFunction = async ({ request, test }: any) => {
  try {
    await auth.unprotectedRoute(request);

    const session = await auth.getSession(request.headers.get("Cookie"));
    const verificationStatus = session.get("verification-status") || null;

    return json(
      { verificationStatus },
      {
        headers: { "Set-Cookie": await auth.commitSession(session) },
      }
    );
  } catch (error) {
    return error;
  }
};

export async function action({ request }: { request: Request }) {
  const data = await validator.validate(await request.formData());

  if (data.error) {
    return validationError(data.error);
  }

  const { emailAddress, password, remember } = data.data;

  try {
    return await auth.signIn(
      request,
      emailAddress,
      password,
      remember ? true : false
    );
  } catch (error: any) {
    if (error.name && error.message) {
      return {
        res: { name: error.name, message: error.message, formData: data.data },
      };
    } else {
      return {
        res: {
          name: "unknownException",
          message: "Unknown exception",
          formData: data.data,
        },
      };
    }
  }
}

function EmailTextField(props: any) {
  const { error, getInputProps } = useField(props.name);
  const isSubmitting = useIsSubmitting();

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>{props.label}</FormLabel>
      <Input {...props} {...getInputProps()} readOnly={isSubmitting} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

function PasswordTextField(props: any) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { error, getInputProps } = useField(props.name);
  const isSubmitting = useIsSubmitting();

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>{props.label}</FormLabel>
      <InputGroup size="md">
        <Input
          {...props}
          {...getInputProps()}
          readOnly={isSubmitting}
          type={show ? "text" : "password"}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            rounded="md"
            bg={useColorModeValue("gray.300", "gray.700")}
            _hover={{
              bg: useColorModeValue("gray.400", "gray.800"),
            }}
            disabled={isSubmitting}
            onClick={handleClick}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

function CheckBox(props: any) {
  const { getInputProps } = useField(props.name);
  const isSubmitting = useIsSubmitting();

  return (
    <Checkbox
      {...props}
      {...getInputProps()}
      value={"yes"}
      readOnly={isSubmitting}
    >
      {props.label}
    </Checkbox>
  );
}

function SubmitButton(props: any) {
  const isSubmitting = useIsSubmitting();

  return (
    <Button {...props} isLoading={isSubmitting} loadingText="Signing In">
      {props.label}
    </Button>
  );
}

export default function Login() {
  const actionData = useActionData();
  const { verificationStatus } = useLoaderData();

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Container maxW="7xl" p={{ base: 1, md: 10 }}>
        <Center
          as={ValidatedForm}
          validator={validator}
          method="post"
          id="loginForm"
          replace
        >
          <Stack spacing={4}>
            <Stack align="center">
              <Heading fontSize="2xl">Sign In to your Account</Heading>
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
                <EmailTextField
                  label="Email Address"
                  name="emailAddress"
                  placeholder="Enter your email"
                  rounded="md"
                  type="email"
                />

                <PasswordTextField
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  rounded="md"
                />

                {actionData?.res && (
                  <Alert status="error" rounded="md">
                    <AlertIcon />
                    <AlertTitle>{actionData?.res?.message}</AlertTitle>
                  </Alert>
                )}

                {verificationStatus && (
                  <Alert status="success" rounded="md">
                    <AlertIcon />
                    <AlertTitle>
                      Account verification successful! Please login with your
                      credentials.
                    </AlertTitle>
                  </Alert>
                )}
              </VStack>
              <VStack w="100%" spacing={4}>
                <Stack direction="row" justify="space-between" w="100%">
                  <CheckBox
                    type="checkbox"
                    name="remember"
                    label="Remember me"
                  />
                  <Text
                    as={Link}
                    to="/forgot"
                    fontSize={{ base: "md", sm: "md" }}
                    _hover={{ textDecoration: "underline" }}
                  >
                    Forgot Password?
                  </Text>
                </Stack>

                <SubmitButton
                  w="100%"
                  colorScheme="primary"
                  label="Sign In"
                  type="submit"
                />

                <Text>
                  Don't have an account?&nbsp;
                  <Text
                    as={Link}
                    to="/register"
                    fontSize={{ base: "md", sm: "md" }}
                    fontWeight="bold"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Register
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
