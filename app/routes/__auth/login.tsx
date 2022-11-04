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
} from "@chakra-ui/react";

import type { LoaderFunction } from "@remix-run/node";

import { Link, useMatches } from "@remix-run/react";
import {
  ValidatedForm,
  validationError,
  useIsSubmitting,
  useField,
} from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

import * as auth from "app/utils/auth.server";
import { useActionData, useLoaderData } from "@remix-run/react";

export const validator = withZod(
  z.object({
    emailAddress: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
);

// export const loader: LoaderFunction = async ({ request }) => {
//!Register
// const res = await utils.signUp(
//   "mproios12@eucrona.com",
//   "name",
//   "!Mike32083705"
// );
//!Sign In
// const res = await utils.signIn(
//   request,
//   "mproios12@eucrona.com",
//   "!Mike32083705"
// );
//!Verify
// const res = await utils.verifyAccount("mproios12@eucrona.com", "559423");

//!Send Code
// const res = await utils.sendCode("mproios12@eucrona.com");
//!Forgot Password
// const res = await utils.forgotPassword(
//   "mproios1@eucrona.com",
//   "924445",
//   "!Mike32083705"
// );
//!Log Out
// const res = await utils.signOut(request);

//!GetSession
// const res = await utils.getSession(request);

//   return "s";
// };

export async function action({ request }: { request: Request }) {
  const data = await validator.validate(await request.formData());

  if (data.error) {
    return validationError(data.error);
  }

  const { emailAddress, password } = data.data;

  try {
    const res = await auth.signIn(request, emailAddress, password);

    return res;
  } catch (error) {
    return "Incorrect Password";
  }
}

function EmailTextField(props: any) {
  const { error, getInputProps } = useField(props.name);
  const actionData = useActionData();

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>{props.label}</FormLabel>
      <Input
        {...props}
        {...getInputProps()}
        disabled={actionData === "success"}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

function PasswordTextField(props: any) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { error, getInputProps } = useField(props.name);
  const actionData = useActionData();

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>{props.label}</FormLabel>
      <InputGroup size="md">
        <Input
          {...props}
          {...getInputProps()}
          // disabled={actionData === "success"}
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
  const actionData = useActionData();

  return (
    <Checkbox
      {...props}
      {...getInputProps()}
      defaultChecked
      value={"yes"}
      // disabled={actionData === "success"}
    >
      {props.label}
    </Checkbox>
  );
}

function SubmitButton(props: any) {
  const isSubmitting = useIsSubmitting();
  const actionData = useActionData();

  return (
    <Button
      {...props}
      isLoading={isSubmitting}
      loadingText="Signing In"
      // disabled={actionData === "success" || isSubmitting}
    >
      {props.label}
    </Button>
  );
}

export default function Login() {
  const actionData = useActionData();

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack
          spacing={4}
          as={ValidatedForm}
          validator={validator}
          method="post"
          id="loginForm"
        >
          <Stack align="center">
            <Heading fontSize="2xl">Sign in to your account</Heading>
          </Stack>
          <VStack
            boxSize={{ base: "xs", sm: "sm", md: "md" }}
            h="max-content !important"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
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
            </VStack>
            <VStack w="100%">
              <Stack direction="row" justify="space-between" w="100%">
                <Checkbox colorScheme="green" size="md">
                  Remember me
                </Checkbox>
                <Text as={Link} to="/login" fontSize={{ base: "md", sm: "md" }}>
                  Forgot password?
                </Text>
              </Stack>
              {/* <Button
                bg="green.300"
                color="white"
                _hover={{
                  bg: "green.500",
                }}
                rounded="md"
              >
                Sign in
              </Button> */}
              <SubmitButton
                w="100%"
                colorScheme="primary"
                label="Sign In"
                type="submit"
              />

              <Text
                as={Link}
                to="/register"
                fontSize={{ base: "md", sm: "md" }}
              >
                Register
              </Text>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
}
