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
  Divider,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import type { LoaderFunction } from "@remix-run/node";
import {
  ValidatedForm,
  validationError,
  useIsSubmitting,
  useField,
} from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

import { redirect } from "@remix-run/node";

import * as auth from "app/utils/auth.server";
import { Link, useActionData } from "@remix-run/react";

const passwordRegex = new RegExp(
  "(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).*$"
);

export const validator = withZod(
  z.object({
    fullName: z.string().min(1, { message: "Full Name is required" }),
    emailAddress: z
      .string()
      .min(1, { message: "Email Address is required" })
      .email("Must be a valid email")
      .trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(passwordRegex, {
        message:
          "Password must contain at least one uppercase, one lowercase, one number, and one special character",
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password must be at least 8 characters" })
      .regex(passwordRegex, {
        message:
          "Password must contain at least one uppercase, one lowercase, one number, and one special character",
      })
      .trim(),
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

  const { fullName, emailAddress, password, confirmPassword } = data.data;

  try {
    if (password !== confirmPassword) {
      console.log("here");
      return "passwordMismatch";
    }

    console.log(fullName, emailAddress, password, confirmPassword);

    await auth.signUp(emailAddress, fullName, password);

    return redirect(`/verify?emailAddress=${emailAddress}`);
  } catch (error: any) {
    if (error.name === "UsernameExistsException") {
      return "accountExists";
    }
    return "unknownError";
  }
}

function TextField(props: any) {
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
  //   const [show, setShow] = useState(false);
  //   const handleClick = () => setShow(!show);
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
          type={"password"}
        />
        {/* <InputRightElement width="4.5rem">
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
        </InputRightElement> */}
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
      loadingText="Creating Account"
      // disabled={actionData === "success" || isSubmitting}
    >
      {props.label}
    </Button>
  );
}

export default function Register() {
  const actionData = useActionData();

  console.log(actionData);

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack
          spacing={4}
          as={ValidatedForm}
          validator={validator}
          method="post"
          id="registerForm"
        >
          <VStack
            boxSize={{ base: "xs", sm: "sm", md: "md" }}
            h="max-content !important"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
            spacing={8}
          >
            <Stack align="center">
              <Heading fontSize="2xl">Create Account</Heading>
            </Stack>

            <VStack spacing={4} w="100%">
              <TextField
                label="Full Name"
                name="fullName"
                placeholder="Enter your first and last name"
                rounded="md"
                type="text"
              />
              <TextField
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
              <PasswordTextField
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                rounded="md"
              />

              {actionData === "passwordMismatch" && (
                <Alert status="error" rounded="md">
                  <AlertIcon />
                  <AlertTitle>Passwords do not match</AlertTitle>
                </Alert>
              )}
              {actionData === "accountExists" && (
                <Alert status="error" rounded="md">
                  <AlertIcon />
                  <AlertTitle>Account already registered.</AlertTitle>

                  <Button
                    as={Link}
                    to={"/verify"}
                    colorScheme="primary"
                    size="sm"
                    maxW="125px"
                  >
                    Verify Account
                  </Button>
                </Alert>
              )}
              {actionData === "unknownError" && (
                <Alert status="error" rounded="md">
                  <AlertIcon />
                  <AlertTitle>Unknown error while registering</AlertTitle>
                </Alert>
              )}
            </VStack>
            <VStack w="100%" spacing={4}>
              <Checkbox colorScheme="primary" size="md">
                Agree with Terms & Conditions
              </Checkbox>

              <SubmitButton
                w="100%"
                colorScheme="primary"
                label="Create Account"
                type="submit"
              />
              <Text>
                Already have an account?&nbsp;
                <Text
                  as={Link}
                  to="/Login"
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
  );
}
