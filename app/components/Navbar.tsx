import { ReactNode, useEffect, useRef, forwardRef } from "react";

import {
  Show,
  Spinner,
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
  Link,
  DrawerCloseButton,
  useBreakpoint,
  Box,
} from "@chakra-ui/react";

import { NavLink } from "@remix-run/react";

// import Footer from "app/components/Footer";

import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import LogoSideways from "public/logos/Logo-Sideways.svg";
import LogoPlain from "public/logos/Logo-Plain.svg";

interface NavbarProps {
  navigationLinks: { label: string; url: string }[];
  eucronaAccounts: {
    label: string;
    url: string;
    isExternal: boolean;
    icon: any;
  }[];
}

export default function Navbar({
  navigationLinks,
  eucronaAccounts,
}: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const breakpoint = useBreakpoint({ ssr: true });

  useEffect(() => {
    if (breakpoint === "lg") {
      onClose();
    }
  }, [breakpoint, onClose]);

  return (
    <>
      <NavbarHeader
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        btnRef={btnRef}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        navigationLinks={navigationLinks}
        eucronaAccounts={eucronaAccounts}
      />
      <NavbarDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        btnRef={btnRef}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        navigationLinks={navigationLinks}
        eucronaAccounts={eucronaAccounts}
      />
    </>
  );
}

interface NavbarHeaderProps {
  isOpen: any;
  onOpen: any;
  onClose: any;
  btnRef: any;
  colorMode: any;
  toggleColorMode: any;
  navigationLinks: { label: string; url: string }[];
  eucronaAccounts: {
    label: string;
    url: string;
    isExternal: boolean;
    icon: any;
  }[];
}

function NavbarHeader({
  isOpen,
  onOpen,
  onClose,
  btnRef,
  colorMode,
  toggleColorMode,
  navigationLinks,
  eucronaAccounts,
}: NavbarHeaderProps) {
  return (
    <Flex
      h={16}
      alignItems={"center"}
      justifyContent={"center"}
      px={{ base: 4, sm: 6, lg: 8 }}
      bg={useColorModeValue("gray.50", "gray.900")}
      position="sticky"
      top={0}
      zIndex={800}
      width={"100%"}
      as="header"
      boxShadow={"md"}
    >
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"100%"}
        maxW={"1600px"}
      >
        <HStack spacing="40px">
          <NavLink to={"/"} prefetch="render" draggable={false}>
            <Box
              sx={{
                display: "flex",
                "@media screen and (max-width: 370px)": {
                  display: "none",
                },
              }}
            >
              <Image
                objectFit="contain"
                h={50}
                w={"auto"}
                minWidth="156px"
                src={LogoSideways}
                alt="Eucrona-Logo"
                draggable="false"
                loading="eager"
              />
            </Box>
            <Box
              sx={{
                display: "none",
                "@media screen and (max-width: 370px)": {
                  display: "flex",
                },
              }}
            >
              <Image
                objectFit="contain"
                h={50}
                w={"auto"}
                src={LogoPlain}
                alt="Eucrona-Logo"
                draggable="false"
                loading="eager"
              />
            </Box>
          </NavLink>
          <HStack spacing="12px" display={{ base: "none", lg: "flex" }}>
            {navigationLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.url}
                draggable="false"
                prefetch="render"
              >
                {({ isActive }) => (
                  <Button onClick={onClose} variant="ghost" isActive={isActive}>
                    {link.label}
                  </Button>
                )}
              </NavLink>
            ))}
          </HStack>
        </HStack>

        <HStack spacing="12px">
          <HStack spacing="2px">
            {eucronaAccounts.map((value, index) => (
              <IconButton
                key={index}
                variant={"ghost"}
                aria-label="Color Scheme"
                as={Link}
                href={value.url}
                isExternal={value.isExternal}
              >
                {value.icon}
              </IconButton>
            ))}

            <IconButton
              variant={"ghost"}
              aria-label="Color Scheme"
              onClick={() => {
                toggleColorMode();
              }}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </HStack>

          <Button
            fontSize={"sm"}
            fontWeight={400}
            display={{ base: "none", lg: "flex" }}
            as={Link}
            href="https://cloud.eucrona.com"
            style={{ textDecoration: "none" }}
            variant={"solid"}
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
  );
}

interface NavbarDrawerProps {
  isOpen: any;
  onOpen: any;
  onClose: any;
  btnRef: any;
  colorMode: any;
  toggleColorMode: any;
  navigationLinks: { label: string; url: string }[];
  eucronaAccounts: {
    label: string;
    url: string;
    isExternal: boolean;
    icon: any;
  }[];
}

function NavbarDrawer({
  isOpen,
  onOpen,
  onClose,
  btnRef,
  colorMode,
  toggleColorMode,
  navigationLinks,
  eucronaAccounts,
}: NavbarDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      size="xs"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader p={2} alignSelf="center">
          <NavLink to={"/"} onClick={onClose} prefetch="render">
            <Image
              objectFit="contain"
              h={50}
              w={"auto"}
              src={LogoPlain}
              alt="Eucrona-Logo"
              draggable="false"
              loading="eager"
            />
          </NavLink>
        </DrawerHeader>
        <DrawerBody>
          <VStack spacing="12px" align="stretch">
            {navigationLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.url}
                draggable="false"
                prefetch="render"
              >
                {({ isActive }) => (
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    isActive={isActive}
                    w={"100%"}
                  >
                    {link.label}
                  </Button>
                )}
              </NavLink>
            ))}
          </VStack>
        </DrawerBody>

        <DrawerFooter alignSelf="center" width={"100%"}>
          <VStack spacing="12px" width={"100%"}>
            <Button
              fontSize={"sm"}
              width={"100%"}
              fontWeight={400}
              as={Link}
              href="https://cloud.eucrona.com"
              style={{ textDecoration: "none" }}
              variant={"solid"}
            >
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
  );
}
