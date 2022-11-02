import React from "react";
import { Container, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { NavLink, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export const loader: LoaderFunction = async ({ params }) => {
  console.log(params.userId);
  console.log(params.projectId);

  return "";
};

export default function Unsubscribe() {
  const data = useLoaderData();

  return (
    <Container mt="5em">
      <VStack>
        <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
        <Heading bgGradient="linear(to-br, #228be6, #15aabf)" bgClip="text">
          Unsubscribed Successfully
        </Heading>
        <Text color={"gray.500"} textAlign="center">
          We're sorry to see you go.
        </Text>

        <Button
          rightIcon={<ArrowForwardIcon />}
          variant="solid"
          colorScheme={"primary"}
          size="lg"
          as={NavLink}
          to="/"
          draggable={false}
        >
          Go to Home
        </Button>
      </VStack>
    </Container>

    // <Box textAlign="center" py={10} px={6}>
    //   <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
    //   <Heading bgGradient="linear(to-br, #228be6, #15aabf)" bgClip="text">
    //     Unsubscribed Successfully
    //   </Heading>
    //   <Text color={"gray.500"}>
    //     Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    //     eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    //     voluptua.
    //   </Text>

    // </Box>
  );
}
