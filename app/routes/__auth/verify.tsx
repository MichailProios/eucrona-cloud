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
  ModalCloseButton,
  IconButton,
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
  const url = new URL(request.url);
  const data = await request.formData();

  const emailAddress: any = url.searchParams.get("emailAddress");
  const type: any = data.get("type");
  const otp: any = data.get("otp");

  try {
    switch (type) {
      case "verify": {
        await auth.verifyAccount(emailAddress, otp);

        return redirect("/login");
      }
      case "resend": {
        const res = await auth.sendCode(emailAddress);
        console.log(res);
        return "success";
      }
      default: {
        return null;
      }
    }
  } catch (error) {
    console.log(error);
    return "Incorrect Password";
  }
}

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);

  const emailAddress: any = url.searchParams.get("emailAddress");

  if (emailAddress) {
    return emailAddress;
  } else {
    return null;
  }
}

export default function Verify() {
  const actionData = useActionData();
  const loading = useTransition();
  const submit = useSubmit();

  function handleResend() {
    const formData = new FormData();
    formData.set("type", "resend");
    submit(formData, { method: "post" });
  }

  function handleVerify(value: any) {
    const formData = new FormData();
    formData.set("otp", value);
    formData.set("type", "verify");
    submit(formData, { method: "post" });
  }

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Verify Account</Heading>
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
            <FormControl id={"otp"}>
              <FormLabel textAlign={"center"}>One Time Pin</FormLabel>
              <HStack
                w="100%"
                display="flex"
                justifyContent="center"
                as={Form}
                method="post"
              >
                <PinInput
                  otp
                  size="lg"
                  autoFocus
                  // type="number"
                  onComplete={(value) => {
                    handleVerify(value);
                  }}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </FormControl>

            <Alert status="info" rounded="md">
              <AlertIcon />
              <AlertTitle>
                A one time pin was sent to your email. Please enter the code
                above
              </AlertTitle>
            </Alert>

            <Flex alignItems={"center"} as={Form} method="post">
              <Text>Resend one time pin?&nbsp;</Text>
              <IconButton
                aria-label="Resend"
                icon={<RepeatIcon />}
                size="sm"
                onClick={() => handleResend()}
              />
            </Flex>

            {/* <input type="hidden" name="otp" value={otp || ""} /> */}
          </VStack>
        </Stack>
      </Center>
      <EmailModal />
    </Container>
  );
}

function EmailModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const submit = useSubmit();
  const emailAddress = useLoaderData();

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!emailAddress) {
      onOpen();
    }
  }, [emailAddress, onOpen]);

  // function handleSetEmail() {
  //   submit(null, { method: "post",  });
  // }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Verify Account</ModalHeader>

        <ModalBody
          pb={6}
          as={Form}
          method="post"
          action={`/verify?emailAddress=${email}`}
        >
          <Text>Please enter your email address</Text> <br />
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              type="email"
              name="emailAddress"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose} type={"submit"}>
            Set
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
