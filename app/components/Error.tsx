import React from "react";
import { Heading, Text, Button, Container, VStack } from "@chakra-ui/react";
import { NavLink } from "@remix-run/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface ErrorProps {
  error: any;
}

export default function Error({ error }: ErrorProps) {
  console.error(error.stack);
  return (
    <Container mt="5em">
      <VStack>
        <Heading bgGradient="linear(to-br, #228be6, #15aabf)" bgClip="text">
          Application Error
        </Heading>
        <Text fontSize="18px">{error.message}</Text>

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
