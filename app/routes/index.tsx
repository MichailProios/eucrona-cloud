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
      <Link to={"/whoami"} draggable="false" prefetch="render">
        User Info
      </Link>
    </Fragment>
  );
}
