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
import { Form, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }: any) => {
  // const cookieHeader = request.headers.get("Cookie");
  // const cookie = (await auth.sessionCookie.parse(cookieHeader)) || {};

  // console.log(cookie);

  try {
    return await auth.protectedRoute(request);
  } catch (error) {
    return "";
  }
};

export default function Whoami() {
  // const actionData = useActionData();

  const user = useLoaderData();

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
                {user.data.UserId.payload.name}
              </Heading>
              <Text color={"gray.500"}>
                User Email: {user.data.UserId.payload.email}
              </Text>
              <Text color={"gray.500"}>
                AWS Cognito Username ID:{" "}
                {user.data.UserId.payload["cognito:username"]}
              </Text>
              <Text color={"gray.500"}>
                Verified:{" "}
                {user.data.UserId.payload.email_verified ? "Yes" : "No"}
              </Text>
              <Text color={"gray.500"}>
                Authentication Time:{" "}
                {new Date(
                  user.data.UserId.payload.auth_time * 1000
                ).toUTCString()}
              </Text>
              <Text color={"gray.500"}>
                EXP:{" "}
                {new Date(user.data.UserId.payload.exp * 1000).toUTCString()}
              </Text>
              <Text color={"gray.500"}>
                IAT:{" "}
                {new Date(user.data.UserId.payload.iat * 1000).toUTCString()}
              </Text>
              <Text color={"gray.500"}>ID: {user.id}</Text>

              <Text color={"gray.500"}>
                Event ID: {user.data.UserId.payload.event_id}
              </Text>
              <Text color={"gray.500"}>
                AUD: {user.data.UserId.payload.aud}
              </Text>
              <Text color={"gray.500"}>
                JTI: {user.data.UserId.payload.jti}
              </Text>
              <Text color={"gray.500"}>
                ISS: {user.data.UserId.payload.iss}
              </Text>
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
                {user.data.UserId.jwtToken}
              </Text>
            </Stack>
          </Box>
        </Box>
      </Center>
    </Fragment>
  );
}
