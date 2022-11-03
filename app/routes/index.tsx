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

import * as utils from "app/utils/auth.server";
import { Form } from "@remix-run/react";

export const action = async ({ request }: any) => {
  try {
    const res = await utils.signOut(request);

    return res;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const loader = async ({ request }: any) => {
  try {
    const res = await utils.isAuthenticated(request);

    return res;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export default function Index() {
  // const actionData = useActionData();

  return (
    <Fragment>
      <Form method="post">
        <Button type="submit">Sign Out</Button>
      </Form>
    </Fragment>
  );
}
