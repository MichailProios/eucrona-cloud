import React from "react";
import { Heading, Text, Button, Container, VStack } from "@chakra-ui/react";
import { NavLink } from "@remix-run/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function resources() {
  return (
    <Container mt="5em">
      <VStack>
        <Heading bgGradient="linear(to-br, #228be6, #15aabf)" bgClip="text">
          Under Development
        </Heading>
        <Text fontSize="18px" textAlign={"center"}>
          This page will be available upon the release of <br />
          Eucrona Cloud
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
  );
}
