import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Flex,
  Text,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  Checkbox,
} from "@chakra-ui/react";
import { useActionData } from "@remix-run/react";

import {
  ValidatedForm,
  validationError,
  useIsSubmitting,
  useField,
} from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { ses } from "app/utils/email.server";
import { EmailSubscribers } from "~/utils/db.server";
// import { db } from "app/utils/db.server";

export const validator = withZod(
  z.object({
    fullName: z
      .string()
      .min(1, { message: "Full Name is required" })
      .max(20, { message: "Full Name cannot be more than 20 characters" }),

    emailAddress: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email")
      .max(50, { message: "Email cannot be more than 50 characters" }),

    subject: z
      .string()
      .min(1, { message: "Subject is required" })
      .max(50, { message: "Subject cannot be more than 50 characters" }),

    body: z
      .string()
      .min(1, { message: "Body is required" })
      .max(500, { message: "Subject cannot be more than 500 characters" }),

    subscribe: z.any(),
  })
);

export async function action({ request }: { request: Request }) {
  const data = await validator.validate(await request.formData());

  if (data.error) {
    return validationError(data.error);
  }

  const { fullName, emailAddress, subject, body, subscribe } = data.data;

  try {
    if (subscribe) {
      const exists = await EmailSubscribers.query("EmailAddress")
        .eq(emailAddress)
        .exec();

      if (!exists[0]) {
        await EmailSubscribers.create({ EmailAddress: emailAddress });
      }
    }

    await ses.sendEmail({
      Destination: {
        ToAddresses: ["mproios@eucrona.com"],
      },
      Message: {
        Body: {
          Text: { Data: body },
        },

        Subject: { Data: `New inquiry ${fullName} - ${subject}` },
      },
      Source: "inquiries@eucrona.com",
    });

    return "success";
  } catch (error) {
    console.error(error);
    return "error";
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

function TextArea(props: any) {
  const { error, getInputProps } = useField(props.name);
  const actionData = useActionData();

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>{props.label}</FormLabel>
      <Textarea
        {...props}
        {...getInputProps()}
        disabled={actionData === "success"}
      />
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
      disabled={actionData === "success"}
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
      loadingText="Sending"
      disabled={actionData === "success" || isSubmitting}
    >
      {props.label}
    </Button>
  );
}

export default function Contacts() {
  const actionData = useActionData();

  return (
    <Container maxW="1200px" px={{ base: 6, md: 10 }} py={14}>
      <Flex align="center" justify="center" direction="column">
        <Heading fontSize="4xl" mb={2}>
          Contact Us
        </Heading>
        <Text fontSize="md" textAlign="center">
          Send us your requests and questions
        </Text>
      </Flex>
      <Stack
        spacing={10}
        as={ValidatedForm}
        validator={validator}
        method="post"
        id="contactForm"
        resetAfterSubmit={actionData !== "success"}
      >
        <VStack
          spacing={8}
          w="100%"
          bg={useColorModeValue("white", "gray.700")}
          rounded="lg"
          boxShadow="lg"
          p={{ base: 5, sm: 10 }}
        >
          <VStack spacing={6} w="100%">
            <Stack
              w="100%"
              spacing={3}
              direction={{ base: "column", md: "row" }}
            >
              <TextField
                label="Name"
                name="fullName"
                placeholder="Enter your full name"
                rounded="md"
                type="text"
              />

              <TextField
                label="Email"
                type="email"
                name="emailAddress"
                placeholder="Enter your email address"
                rounded="md"
              />
            </Stack>

            <TextField
              label="Subject"
              type="text"
              name="subject"
              placeholder="Enter the subject"
              rounded="md"
            />

            <TextArea
              label="Message"
              type="text"
              size="lg"
              name="body"
              placeholder="Enter your message"
              rounded="md"
            />

            <CheckBox
              type="checkbox"
              name="subscribe"
              label="Subscribe to receive updates and news"
            />

            <SubmitButton
              type="submit"
              colorScheme="primary"
              label="Send Message"
            />
          </VStack>

          {actionData && (
            <Alert
              status={actionData === "success" ? "success" : "error"}
              rounded="md"
            >
              <AlertIcon />
              <AlertTitle>
                {actionData === "success"
                  ? "Email sent successfully. Thank you!"
                  : "Email failed to send. Please try again."}
              </AlertTitle>
            </Alert>
          )}
        </VStack>
      </Stack>
    </Container>
  );
}
