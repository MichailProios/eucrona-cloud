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
} from "@chakra-ui/react";

import type { LoaderFunction } from "@remix-run/node";

import * as auth from "app/utils/auth.server";
import { Form, useLoaderData } from "@remix-run/react";

export const action = async ({ request }: any) => {
  try {
    const res = await auth.signOut(request);

    return res;
  } catch (error) {
    return "";
  }
};

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    return await auth.protectedRoute(request);
  } catch (error) {
    return "";
  }
};

export default function Index() {
  // const actionData = useActionData();

  useLoaderData();

  return (
    <Fragment>
      <Form method="post" replace>
        <Button type="submit">Sign Out</Button>
      </Form>
    </Fragment>
  );
}
