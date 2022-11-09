import { ReactNode, useEffect, useRef, forwardRef, Children } from "react";

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
  Avatar,
  CloseButton,
  Icon,
  Text,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Progress,
} from "@chakra-ui/react";

import { Form, NavLink, useLoaderData, useTransition } from "@remix-run/react";

import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";

import {
  HamburgerIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";

import LogoSideways from "public/logos/Logo-Sideways.svg";
import LogoPlain from "public/logos/Logo-Plain.svg";

interface NavbarProps {
  children: any;
}

export default function Dashboard({ children }: NavbarProps) {
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
      {/* <Header colorMode={colorMode} toggleColorMode={toggleColorMode} /> */}

      <Sidebar>{children}</Sidebar>

      {/* <NavbarDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        btnRef={btnRef}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        navigationLinks={navigationLinks}
        eucronaAccounts={eucronaAccounts}
      /> */}
    </>
  );
}

interface SidebarProps extends BoxProps {
  children: any;
  // onClose: () => void;
}

const Sidebar = ({ children, ...rest }: SidebarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex flexDirection="row">
      <Box
        // transition="1s ease"
        zIndex={850}
        bg={useColorModeValue("gray.50", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.800")}
        boxShadow={"md"}
        w={{ base: "full", md: 60 }}
        position="fixed"
        h="full"
        {...rest}
      >
        <Flex h={16} alignItems="center" justifyContent="center">
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
        </Flex>
      </Box>

      <Box w={"100%"}>
        <Header colorMode={colorMode} toggleColorMode={toggleColorMode} />
        <Box ml={60}>{children}</Box>
      </Box>
    </Flex>
  );
};

interface HeaderProps {
  colorMode: any;
  toggleColorMode: any;
}

function Header({ colorMode, toggleColorMode }: HeaderProps) {
  const transition = useTransition();

  return (
    <>
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
          justifyContent={"flex-end"}
          w={"100%"}
          // maxW={"1920px"}
        >
          <HStack spacing={4}>
            <IconButton
              variant={"ghost"}
              aria-label="Color Scheme"
              onClick={() => {
                toggleColorMode();
              }}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </IconButton>

            <IconButton variant={"ghost"} aria-label="Notifications">
              <BellIcon fontSize={"xl"} />
            </IconButton>
            <UserMenu />
          </HStack>
        </Flex>
      </Flex>
      <Progress
        isIndeterminate
        width={"100%"}
        display={transition.state !== "idle" ? "flex" : "none"}
        ml={60}
        size="xs"
        position="fixed"
        top={"64px"}
        zIndex={800}
        backgroundColor="transparent"
        colorScheme={"primary"}
      />
    </>
  );
}

function UserMenu() {
  const { user } = useLoaderData();

  return (
    <Flex alignItems={"center"}>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          p={1}
          rightIcon={<ChevronDownIcon />}
          transition="all 0.3s"
        >
          <HStack>
            <Avatar size={"sm"} />
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">{user.data.UserId.payload.name}</Text>
              <Text fontSize="xs" color="gray.600">
                Base
              </Text>
            </VStack>
          </HStack>
        </MenuButton>
        <MenuList
          bg={useColorModeValue("white", "gray.900")}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          boxShadow="md"
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          {/* <MenuItem>Billing</MenuItem> */}
          <MenuDivider />
          <Form method="post" replace>
            <MenuItem type="submit">Sign out</MenuItem>
          </Form>
        </MenuList>
      </Menu>
    </Flex>
  );
}
