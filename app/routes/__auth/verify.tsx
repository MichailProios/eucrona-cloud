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
  const url = new URL(request.url);
  const emailAddress: any = url.searchParams.get("emailAddress");
  const type: any = data.get("type");
  const otp: any = data.get("otp");

  // const otp: any = data.get("otp");

  try {
    switch (type) {
      case "verify": {
        await auth.verifyAccount(emailAddress, otp);

        return redirect("/login?verificationSuccessful");
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
  const res = await auth.unprotectedRoute(request);

  if (res !== false) {
    return res;
  }

  const url = new URL(request.url);

  const emailAddress: any = url.searchParams.get("emailAddress");

  if (emailAddress) {
    return emailAddress;
  } else {
    return redirect("/verify-identify");
  }
};

// export const loader: LoaderFunction = async ({ request }: any) => {
//   try {
//     return await auth.unprotectedRoute(request);
//   } catch (error) {
//     return error;
//   }
// };

export default function Verify() {
  const actionData = useActionData();

  const submit = useSubmit();
  const isSubmitting: any = useTransition().submission;
  const emailAddress = useLoaderData();

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
                  >
                    <PinInput
                      otp
                      size="lg"
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
                      A one time pin was sent to your email. Please enter the
                      code.
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
        {/* <EmailModal /> */}
      </Container>
    </SlideFade>
  );
}

// function EmailModal() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const submit = useSubmit();
//   const emailAddress = useLoaderData();

//   const [email, setEmail] = useState("");
//   const [validationError, setValidationError] = useState(false);
//   const [validationMessage, setValidationMessage] = useState(null);

//   function handleEmail(value: string) {
//     try {
//       setEmail(value);
//       emailValidator.parse(value);
//     } catch (error: any) {
//       setValidationError(true);
//       setValidationMessage(error.message);
//       console.log(validationMessage);
//     }
//   }

//   useEffect(() => {
//     if (!emailAddress) {
//       onOpen();
//     } else {
//       onClose();
//     }
//   }, [emailAddress, onOpen, onClose]);

//   const isSubmitting: any = useTransition().submission;

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       autoFocus
//       closeOnEsc={false}
//       closeOnOverlayClick={false}
//     >
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Verify Account</ModalHeader>
//         <Form method="post" replace>
//           <ModalBody pb={6}>
//             <Text>
//               In order to further verify your account, please enter your email
//               address.
//             </Text>
//             <br />
//             <FormControl>
//               <FormLabel>Email</FormLabel>
//               <Input
//                 placeholder="Email Address"
//                 type="email"
//                 name="emailAddress"
//                 readOnly={isSubmitting}
//                 value={email}
//                 onChange={(e) => {
//                   handleEmail(e.target.value);
//                 }}
//                 // onSubmit={handleSet}
//               />
//               <input type="hidden" name="type" value="set" />
//             </FormControl>
//           </ModalBody>
//         </Form>

//         <ModalFooter>
//           <Button
//             colorScheme="primary"
//             mr={3}
//             type="submit"
//             w={"100%"}
//             isLoading={isSubmitting}
//           >
//             Set Email
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// }
