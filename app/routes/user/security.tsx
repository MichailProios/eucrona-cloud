// import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Flex,
  Avatar,
  AvatarBadge,
  Heading,
  Center,
  InputGroup,
  InputRightElement,
  SlideFade,
  IconButton,
  Badge,
  Text,
  Icon,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useColorModeValue,
} from "@chakra-ui/react";
import * as auth from "app/utils/auth.server";
import type { LoaderFunction } from "@remix-run/node";

import { MdOutlineSupervisorAccount, MdOutlineSecurity } from "react-icons/md";

import { RiLockPasswordLine } from "react-icons/ri";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    return await auth.protectedRoute(request);
  } catch (error: any) {
    throw error;
  }
};

export default function Security() {
  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Flex align={"center"} justify={"center"} p={6}>
        <Stack w="full" spacing={4}>
          <Heading lineHeight={1.1} fontSize={"2xl"} my={2} textAlign="center">
            Account Security
          </Heading>

          {/* <Stack
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="center"
            w="100%"
          >
            <Icon as={MdOutlineSecurity} w={8} h={8} color="red.400" />

            <Text fontSize="xl" textAlign="center">
              Multi Factor Authentication is not enabled
            </Text>
          </Stack>

          <Stack
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="center"
            w="100%"
          >
            <Icon
              as={MdOutlineSupervisorAccount}
              w={8}
              h={8}
              color="green.400"
            />

            <Text fontSize="xl" textAlign="center">
              No Unauthorized Sessions Detected
            </Text>
          </Stack> */}

          <Stack
            bg={useColorModeValue("whiteAlpha.50", "whiteAlpha.100")}
            rounded="xl"
            boxShadow={"md"}
            p={{ base: 4, sm: 8 }}
            justifyContent="space-between"
            alignItems="center"
            direction={{ base: "column", md: "row" }}
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              alignItems="center"
            >
              <Icon as={MdOutlineSecurity} w={6} h={6} color="green.400" />
              <Stack
                direction={{ base: "column", lg: "row" }}
                alignItems="center"
              >
                <Text textAlign="center">Two-Factor Authentication</Text>
                <Badge colorScheme="red">Not Enabled</Badge>
              </Stack>
            </Stack>
            <Button colorScheme="primary">Manage</Button>
          </Stack>
          <Stack
            bg={useColorModeValue("whiteAlpha.50", "whiteAlpha.100")}
            rounded="xl"
            boxShadow={"md"}
            p={{ base: 4, sm: 8 }}
            justifyContent="space-between"
            alignItems="center"
            direction={{ base: "column", md: "row" }}
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              alignItems="center"
            >
              <Icon
                as={MdOutlineSupervisorAccount}
                w={6}
                h={6}
                color="green.400"
              />
              <Text textAlign="center">Active Sessions</Text>
              {/* <Badge colorScheme="red">Not Enabled</Badge> */}
            </Stack>
            <Button colorScheme="primary">Manage</Button>
          </Stack>
          <Stack
            bg={useColorModeValue("whiteAlpha.50", "whiteAlpha.100")}
            rounded="xl"
            boxShadow={"md"}
            p={{ base: 4, sm: 8 }}
            justifyContent="space-between"
            alignItems="center"
            direction={{ base: "column", md: "row" }}
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              alignItems="center"
            >
              <Icon as={RiLockPasswordLine} w={6} h={6} color="green.400" />
              <Text textAlign="center">Account Password</Text>
              {/* <Badge colorScheme="red">Not Enabled</Badge> */}
            </Stack>
            <Button colorScheme="primary">Change</Button>
          </Stack>
        </Stack>
      </Flex>
    </SlideFade>
  );
}
