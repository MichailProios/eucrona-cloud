import { ReactNode, useState, useRef, forwardRef } from "react";

import {
  Box,
  Flex,
  Image,
  IconButton,
  useColorModeValue,
  useColorMode,
  Link,
} from "@chakra-ui/react";

import { useLoaderData } from "@remix-run/react";

// import Footer from "app/components/Footer";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import logo from "public/logos/Logo-Sideways-Large-No-Padding.svg";
import logoDark from "public/logos/Logo-Sideways-Large-No-Padding-DarkMode.svg";

interface NavbarProps {
  children: ReactNode;
  cookies: string;
}

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie");

  return cookieHeader;
};

export default function Navbar({ children, cookies }: NavbarProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  cookies = useLoaderData();

  return (
    <Box>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"center"}
        px={{ base: 6, lg: 12 }}
        bg={useColorModeValue("gray.100", "gray.900")}
        position="fixed"
        top={0}
        zIndex={800}
        width={"100%"}
        as="header"
      >
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"100%"}
          maxW={"1400px"}
        >
          <Link href="https://pulsetrail.com">
            <Image
              objectFit="contain"
              h={55}
              w={"auto"}
              src={colorMode === "light" ? logo : logoDark}
              alt="PulseTrail-Sideways"
              draggable="false"
            />
          </Link>

          <IconButton
            aria-label="Color Scheme"
            onClick={() => {
              toggleColorMode();
            }}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </IconButton>
        </Flex>
      </Flex>

      <Box h={16} />
      <Box>{children}</Box>
      {/* <Footer /> */}
    </Box>
  );
}
