import { Fragment } from "react";
import {
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Button,
  Icon,
  HStack,
  SimpleGrid,
  Flex,
  Box,
  Heading,
  Input,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Center,
  Image,
} from "@chakra-ui/react";

import type { LoaderFunction } from "@remix-run/node";

import * as auth from "app/utils/auth.server";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    await auth.protectedRoute(request);

    const user = await auth.getUser(request);

    return user;
  } catch (error) {
    return "";
  }
};

export default function Whoami() {
  // const actionData = useActionData();

  const UserId = useLoaderData();

  return (
    <Fragment>
      <Center py={6}>
        <Box
          // maxW={"1200px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          // boxShadow={"2xl"}
          // rounded={"md"}
          overflow={"hidden"}
        >
          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {UserId.payload.name}
              </Heading>
              <Text color={"gray.500"}>User Email: {UserId.payload.email}</Text>
              <Text color={"gray.500"}>
                AWS Cognito Username ID: {UserId.payload["cognito:username"]}
              </Text>
              <Text color={"gray.500"}>
                Verified: {UserId.payload.email_verified ? "Yes" : "No"}
              </Text>
              <Text color={"gray.500"}>
                Authentication Time:{" "}
                {new Date(UserId.payload.auth_time * 1000).toUTCString()}
              </Text>
              <Text color={"gray.500"}>
                EXP: {new Date(UserId.payload.exp * 1000).toUTCString()}
              </Text>
              <Text color={"gray.500"}>
                IAT: {new Date(UserId.payload.iat * 1000).toUTCString()}
              </Text>
              <Text color={"gray.500"}>ID: {UserId.id}</Text>

              <Text color={"gray.500"}>
                Event ID: {UserId.payload.event_id}
              </Text>
              <Text color={"gray.500"}>AUD: {UserId.payload.aud}</Text>
              <Text color={"gray.500"}>JTI: {UserId.payload.jti}</Text>
              <Text color={"gray.500"}>ISS: {UserId.payload.iss}</Text>
              <br />
              <Text
                color={"gray.500"}
                w={"100%"}
                maxW={"1000px"}
                align="center"
              >
                JWT Token
              </Text>
              <Text color={"gray.500"} w={"100%"} maxW={"1000px"}>
                {UserId.jwtToken}
              </Text>
            </Stack>
          </Box>
        </Box>
      </Center>
    </Fragment>
  );
}
