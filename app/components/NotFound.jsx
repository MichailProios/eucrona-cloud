import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { NavLink } from "@remix-run/react";

export default function NotFound() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading bgGradient="linear(to-br, #228be6, #15aabf)" bgClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Button
        h={12}
        px={6}
        variant="primary"
        size="lg"
        rounded="md"
        fontWeight="bold"
        mb={{ base: 2, sm: 0 }}
        as={NavLink}
        to="/"
      >
        Go to Home
      </Button>
    </Box>
  );
}
