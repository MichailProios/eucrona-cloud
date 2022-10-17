import { ReactNode, useState, useRef, forwardRef } from "react";

import {
  chakra,
  Box,
  Flex,
  Image,
  HStack,
  Button,
  IconButton,
  useColorModeValue,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerFooter,
  VStack,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerHeader,
  DrawerCloseButton,
} from "@chakra-ui/react";

import { NavLink, useLoaderData } from "@remix-run/react";

// import Footer from "app/components/Footer";

import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import logo from "public/logos/Logo-Sideways-Large-No-Padding.svg";
import logoDark from "public/logos/Logo-Sideways-Large-No-Padding-DarkMode.svg";

interface NavbarProps {
  children: ReactNode;
  cookies: string;
}

const Links = [
  { section: "Home", url: "" },
  { section: "Features", url: "Features" },
  { section: "Test", url: "Test" },
  { section: "No Page", url: "nopage" },
];

const NavLinkAppbar = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => (
  <chakra.span
    p={2}
    w={"6em"}
    textAlign="center"
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      color: "brand.main",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    draggable="false"
    prefetch="render"
    as={NavLink}
    to={href}
  >
    {children}
  </chakra.span>
);

const NavLinkDrawer = ({
  children,
  closeDialog,
  href,
}: {
  children: ReactNode;
  closeDialog: any;
  href: string;
}) => (
  <chakra.span
    p={2}
    rounded={"md"}
    textAlign={"center"}
    _hover={{
      textDecoration: "none",
      color: "brand.main",
      bg: useColorModeValue("gray.200", "gray.800"),
    }}
    onClick={closeDialog}
    w={"100%"}
    draggable="false"
    prefetch="render"
    as={NavLink}
    to={href}
  >
    {children}
  </chakra.span>
);

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie");

  return cookieHeader;
};

export default function Navbar({ children, cookies }: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
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
          <HStack spacing="40px">
            <NavLink to={"/"} prefetch="render">
              <Image
                objectFit="contain"
                h={55}
                w={"auto"}
                src={colorMode === "light" ? logo : logoDark}
                alt="PulseTrail-Sideways"
                draggable="false"
              />
            </NavLink>
            <HStack spacing="24px" display={{ base: "none", lg: "flex" }}>
              {Links.map((link, index) => (
                <NavLinkAppbar key={index} href={link.url}>
                  {link.section}
                </NavLinkAppbar>
              ))}
            </HStack>
          </HStack>

          <HStack spacing="12px">
            <IconButton
              aria-label="Color Scheme"
              onClick={() => {
                toggleColorMode();
              }}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </IconButton>
            <Button
              fontSize={"sm"}
              fontWeight={400}
              display={{ base: "none", lg: "flex" }}
            >
              Sign In
            </Button>
            <Button
              fontSize={"sm"}
              fontWeight={600}
              variant="solid"
              colorScheme={"primary"}
              display={{ base: "none", lg: "flex" }}
            >
              Sign Up
            </Button>

            <IconButton
              aria-label="Open Drawer"
              ref={btnRef}
              onClick={onOpen}
              display={{ lg: "none" }}
            >
              <HamburgerIcon />
            </IconButton>
          </HStack>
        </Flex>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader p={2} alignSelf="center">
            <NavLink to={"/"} onClick={onClose} prefetch="render">
              <Image
                objectFit="contain"
                h={55}
                w={"auto"}
                src={colorMode === "light" ? logo : logoDark}
                alt="PulseTrail-Sideways"
                draggable="false"
              />
            </NavLink>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing="16px" align="stretch">
              {Links.map((link, index) => (
                <NavLinkDrawer
                  key={index}
                  closeDialog={onClose}
                  href={link.url}
                >
                  {link.section}
                </NavLinkDrawer>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter alignSelf="center" width={"100%"}>
            <VStack spacing="12px" width={"100%"}>
              <Button fontSize={"sm"} width={"100%"} fontWeight={400}>
                Sign In
              </Button>
              <Button
                width={"100%"}
                fontSize={"sm"}
                fontWeight={600}
                variant="solid"
                colorScheme={"primary"}
              >
                Sign Up
              </Button>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Box h={16} />
      <Box>{children}</Box>
      {/* <Footer /> */}
    </Box>
  );
}
