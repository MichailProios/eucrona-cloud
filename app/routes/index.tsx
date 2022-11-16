import { Fragment, useEffect } from "react";
import { Text, Button, Center, Image, VStack } from "@chakra-ui/react";
import { useDataRefresh } from "remix-utils";

import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node";

import * as auth from "app/utils/auth.server";
import { useTransition } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    await auth.protectedRoute(request);

    return "";
  } catch (error) {
    throw error;
  }
};

export default function Index() {
  return (
    <Fragment>
      <Center display={"flex"} flexDirection="column">
        <VStack>
          <Text fontSize="xl"> Welcome to the Eucrona Cloud Dashboard </Text>
          <Button>test</Button>
        </VStack>
      </Center>
    </Fragment>
  );
}
