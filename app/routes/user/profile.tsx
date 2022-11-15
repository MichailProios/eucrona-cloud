import React, { useEffect } from "react";

import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Flex,
  Avatar,
  AvatarBadge,
  Heading,
  useColorModeValue,
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
  SlideFade,
  HStack,
  IconButton,
  VStack,
  Badge,
} from "@chakra-ui/react";

import {
  ValidatedForm,
  validationError,
  useIsSubmitting,
  useField,
} from "remix-validated-form";

import { SmallCloseIcon } from "@chakra-ui/icons";
import * as auth from "app/utils/auth.server";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

export const validator = withZod(
  z.object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),

    emailAddress: z
      .string()
      .min(1, { message: "Email Address is required" })
      .email("Must be a valid email")
      .trim(),

    agreed: z.any(),
  })
);

export const loader: LoaderFunction = async ({ request }) => {
  try {
    await auth.protectedRoute(request);
    const userRes = await auth.getUser(request);

    return userRes;
  } catch (error: any) {
    throw error;
  }
};

function TextField(props: any) {
  const { error, getInputProps } = useField(props.name);
  const isSubmitting = useIsSubmitting();
  const userData = useLoaderData();

  const isEmailVerified = () => {
    if (props.name === "emailAddress" && userData?.email_verified) {
      return <Badge colorScheme="green">Verified</Badge>;
    }
  };

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>
        {props.label} {isEmailVerified()}
      </FormLabel>
      <Input {...props} {...getInputProps()} isReadOnly={isSubmitting} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

function PasswordTextField(props: any) {
  const { error, getInputProps } = useField(props.name);
  const isSubmitting = useIsSubmitting();

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>{props.label}</FormLabel>
      <InputGroup size="md">
        <Input
          {...props}
          {...getInputProps()}
          isReadOnly={isSubmitting}
          type={"password"}
        />
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

// function CheckBox(props: any) {
//   const { getInputProps } = useField(props.name);
//   const isSubmitting = useIsSubmitting();

//   return (
//     <Checkbox
//       {...props}
//       {...getInputProps()}
//       value={"yes"}
//       isReadOnly={isSubmitting}
//     >
//       {props.label}
//     </Checkbox>
//   );
// }

function CheckBox(props: any) {
  const { getInputProps } = useField(props.name);
  const isSubmitting = useIsSubmitting();

  return (
    <Checkbox
      {...props}
      {...getInputProps()}
      value={"yes"}
      isReadOnly={isSubmitting}
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

export default function Profile() {
  const userData = useLoaderData();

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Flex
        align={"center"}
        justify={"center"}
        p={6}
        as={ValidatedForm}
        validator={validator}
        defaultValues={{
          firstName: userData?.given_name,
          lastName: userData?.family_name,
          emailAddress: userData?.email,
        }}
        method="post"
        id="registerForm"
        replace
      >
        <Stack w="full">
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "xl", sm: "1xl" }}
            my={2}
            textAlign="center"
          >
            User Profile
          </Heading>

          <Stack
            w="full"
            direction={{ base: "column", sm: "row" }}
            spacing={{ base: 6, sm: 0 }}
          >
            <Center w="full">
              <Avatar size="2xl" name={userData?.name}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Avatar</Button>
            </Center>
          </Stack>

          <Stack direction={{ base: "column", md: "row" }} w="100%">
            <TextField
              label="First Name"
              name="firstName"
              placeholder="Enter your first name"
              rounded="md"
              type="text"
            />
            <TextField
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              rounded="md"
              type="text"
            />
          </Stack>

          <TextField
            label="Email Address"
            name="emailAddress"
            placeholder="Enter your email"
            rounded="md"
            type="email"
          />

          <TextField
            label="Phone Number"
            name="phoneNumber"
            placeholder="Enter your phone number"
            rounded="md"
            type="tel"
          />

          {/* {actionData?.res && (
                  <Alert status="error" rounded="md">
                    <AlertIcon />
                    <AlertTitle>{actionData?.res?.message}</AlertTitle>
                  </Alert>
                )} */}
        </Stack>
      </Flex>
    </SlideFade>
  );
}
