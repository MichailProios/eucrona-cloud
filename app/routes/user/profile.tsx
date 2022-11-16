import React, { useEffect } from "react";

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
} from "@chakra-ui/react";

import { SmallCloseIcon } from "@chakra-ui/icons";
import * as auth from "app/utils/auth.server";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    await auth.protectedRoute(request);
    const userRes = await auth.getUser(request);

    return userRes?.attributes;
  } catch (error: any) {
    throw error;
  }
};

export default function Profile() {
  const userData = useLoaderData();

  const isVerifiedExists = (verified: boolean, exists: string) => {
    if (!exists) {
      return <Badge colorScheme="red">Not Provided</Badge>;
    }

    if (verified) {
      return <Badge colorScheme="green">Verified</Badge>;
    } else {
      return <Badge colorScheme="red">Not Verified</Badge>;
    }
  };

  const exists = (exists: string) => {
    if (!exists) {
      return <Badge colorScheme="red">Not Provided</Badge>;
    }
  };

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Flex align={"center"} justify={"center"} p={6}>
        <Stack w="full" spacing={4}>
          <Heading lineHeight={1.1} fontSize={"2xl"} my={2} textAlign="center">
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

          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <InputGroup size="md">
              <Input
                isReadOnly={true}
                rounded="md"
                type="text"
                pr="5.3rem"
                value={userData?.name}
              />
              <InputRightElement width="5.3rem">
                <Button h="1.75rem" size="sm">
                  Change
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>
              Email Address{" "}
              {isVerifiedExists(userData?.email_verified, userData?.email)}
            </FormLabel>
            <InputGroup size="md">
              <Input
                isReadOnly={true}
                rounded="md"
                type="text"
                pr="5.3rem"
                value={userData?.email}
              />
              <InputRightElement width="5.3rem">
                <Button h="1.75rem" size="sm">
                  Change
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>
              Phone Number{" "}
              {isVerifiedExists(
                userData?.phone_number_verified,
                userData?.phone_number
              )}
            </FormLabel>
            <InputGroup size="md">
              <Input
                isReadOnly={true}
                rounded="md"
                type="text"
                placeholder={
                  !userData?.phone_number ? `Click 'Add' to update` : ""
                }
                pr={
                  userData?.phone_number && userData?.phone_number_verified
                    ? "5.3rem"
                    : !userData?.phone_number_verified
                    ? "4.6rem"
                    : "3.9rem"
                }
                value={userData?.phone_number}
              />
              <InputRightElement
                width={
                  userData?.phone_number && userData?.phone_number_verified
                    ? "5.3rem"
                    : !userData?.phone_number_verified
                    ? "4.6rem"
                    : "3.9rem"
                }
              >
                <Button h="1.75rem" size="sm">
                  {userData?.phone_number && userData?.phone_number_verified
                    ? "Change"
                    : !userData?.phone_number_verified
                    ? "Verify"
                    : "Add"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Date of Birth {exists(userData?.birthdate)}</FormLabel>
            <InputGroup size="md">
              <Input
                isReadOnly={true}
                rounded="md"
                type="text"
                placeholder={
                  !userData?.birthdate ? `Click 'Add' to update` : ""
                }
                pr={userData?.birthdate ? "5.3rem" : "3.9rem"}
                value={userData?.birthdate}
              />
              <InputRightElement
                width={userData?.birthdate ? "5.3rem" : "3.9rem"}
              >
                <Button h="1.75rem" size="sm">
                  {userData?.birthdate ? "Change" : "Add"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Address {exists(userData?.address)}</FormLabel>
            <InputGroup size="md">
              <Input
                isReadOnly={true}
                rounded="md"
                type="text"
                placeholder={!userData?.address ? `Click 'Add' to update` : ""}
                pr={userData?.address ? "5.3rem" : "3.9rem"}
                value={userData?.address}
              />
              <InputRightElement
                width={userData?.address ? "5.3rem" : "3.9rem"}
              >
                <Button h="1.75rem" size="sm">
                  {userData?.address ? "Change" : "Add"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Stack>
      </Flex>
    </SlideFade>
  );
}
