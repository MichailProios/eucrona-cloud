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
  VStack,
} from "@chakra-ui/react";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import * as auth from "app/utils/auth.server";
import { Link } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    return await auth.protectedRoute(request);
  } catch (error) {
    return "";
  }
};

export default function Index() {
  return (
    <Fragment>
      <Center display={"flex"} flexDirection="column">
        <VStack>
          <Text fontSize="xl"> Welcome to the Eucrona Cloud Dashboard </Text>
          <Button
            as={Link}
            to={"/whoami"}
            draggable="false"
            prefetch="render"
            colorScheme={"primary"}
          >
            Show Signed User Information
          </Button>
        </VStack>
      </Center>
    </Fragment>
  );
}
