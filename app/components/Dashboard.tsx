import { useEffect, useRef, useContext } from "react";

import {
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
  useBreakpoint,
  Box,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Progress,
  useBoolean,
  SlideFade,
  Icon,
  Link as ChakraLink,
} from "@chakra-ui/react";

import type { BoxProps, FlexProps } from "@chakra-ui/react";

import { Form, NavLink, Link, useTransition } from "@remix-run/react";

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
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import LogoSideways from "public/logos/Logo-Sideways.svg";
import LogoPlain from "public/logos/Logo-Plain.svg";
import { useWindowDimensions } from "~/utils/hooks";
import type { IconType } from "react-icons/lib";
import { useLoaderData } from "@remix-run/react";

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];
interface NavbarProps {
  children: any;
}

export default function Dashboard({ children }: NavbarProps) {
  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  );
}

interface SidebarProps extends BoxProps {
  children: any;
  // onClose: () => void;
}

const Sidebar = ({ children, ...rest }: SidebarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [sidebar, setSidebar] = useBoolean(false);
  const transition = useTransition();
  const { height } = useWindowDimensions();
  const breakpoint = useBreakpoint({ ssr: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (breakpoint === "md") {
      onClose();
    }
  }, [breakpoint, onClose]);

  return (
    <Flex flexDirection="row" justifyContent="flex-start">
      <Box
        transition="0.3s ease"
        zIndex={850}
        bg={useColorModeValue("gray.50", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.800")}
        boxShadow={"md"}
        w={sidebar ? "60px" : "240px"}
        position="fixed"
        h="full"
        flexDirection={"column"}
        justifyContent="center"
        {...rest}
        display={{ base: "none", md: "flex" }}
      >
        <Flex h={16} alignItems="center" justifyContent="center">
          <HStack direction={"row"} align="center" spacing={sidebar ? 0 : 4}>
            <SlideFade in={!sidebar} reverse delay={0.3}>
              <NavLink
                to={"/"}
                draggable={false}
                style={{ display: sidebar ? "none" : "flex" }}
              >
                <Box>
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
              </NavLink>
            </SlideFade>
            <SlideFade in={sidebar} reverse delay={0.3}>
              <NavLink
                to={"/"}
                draggable={false}
                style={{ display: sidebar ? "flex" : "none" }}
              >
                <Box>
                  <Image
                    objectFit="contain"
                    h={"35px"}
                    w={"auto"}
                    src={LogoPlain}
                    alt="Eucrona-Logo"
                    draggable="false"
                    loading="eager"
                  />
                </Box>
              </NavLink>
            </SlideFade>
          </HStack>
        </Flex>

        <Box display={!sidebar ? "flex" : "none"} flexDirection="column">
          {LinkItems.map((link, index) => (
            <SlideFade
              in={!sidebar}
              key={link.name}
              reverse
              delay={index * 0.1}
            >
              <NavItem icon={link.icon}>{link.name}</NavItem>
            </SlideFade>
          ))}
        </Box>

        <Box
          display={sidebar ? "flex" : "none"}
          alignItems="center"
          flexDirection="column"
        >
          {LinkItems.map((link, index) => (
            <SlideFade in={sidebar} key={link.name} reverse delay={index * 0.1}>
              <NavItem2 icon={link.icon} />
            </SlideFade>
          ))}
        </Box>

        <Box
          display="flex"
          w="100%"
          justifyContent="flex-end"
          alignItems="flex-end"
          marginTop="auto"
        >
          <IconButton
            variant={"ghost"}
            aria-label="Sidebar Toggle"
            onClick={setSidebar.toggle}
            m={"10px"}
          >
            {sidebar ? (
              <ChevronRightIcon fontSize={"xl"} />
            ) : (
              <ChevronLeftIcon fontSize={"xl"} />
            )}
          </IconButton>
        </Box>
      </Box>

      <Box
        w={"100%"}
        display={{ base: "none", md: "flex" }}
        flexDirection="column"
      >
        <Header
          colorMode={colorMode}
          toggleColorMode={toggleColorMode}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          btnRef={btnRef}
        />
        <Progress
          isIndeterminate
          width={"100%"}
          display={transition.state !== "idle" ? "flex" : "none"}
          ml={sidebar ? "60px" : "240px"}
          size="xs"
          position="fixed"
          top={"64px"}
          zIndex={800}
          backgroundColor="transparent"
          colorScheme={"primary"}
        />
        <Box
          transition="0.3s ease"
          ml={sidebar ? "60px" : "240px"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent="flex-start"
          minHeight={height ? `calc(${height}px - 64px)` : `calc(100vh - 64px)`}
        >
          {children}
        </Box>
      </Box>

      <Box
        w={"100%"}
        display={{ base: "flex", md: "none" }}
        flexDirection="column"
      >
        <Header
          colorMode={colorMode}
          toggleColorMode={toggleColorMode}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          btnRef={btnRef}
        />
        <Progress
          isIndeterminate
          width={"100%"}
          display={transition.state !== "idle" ? "flex" : "none"}
          size="xs"
          position="fixed"
          top={"64px"}
          zIndex={800}
          backgroundColor="transparent"
          colorScheme={"primary"}
        />
        <Box
          transition="0.3s ease"
          display={"flex"}
          flexDirection={"column"}
          justifyContent="flex-start"
          minHeight={height ? `calc(${height}px - 64px)` : `calc(100vh - 64px)`}
        >
          {children}
        </Box>
      </Box>

      <SidebarDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        btnRef={btnRef}
      />
    </Flex>
  );
};

interface HeaderProps {
  colorMode: any;
  toggleColorMode: any;
  isOpen: any;
  onOpen: any;
  onClose: any;
  btnRef: any;
}

function Header({
  colorMode,
  toggleColorMode,
  isOpen,
  onOpen,
  onClose,
  btnRef,
}: HeaderProps) {
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
          justifyContent={{ base: "space-between", md: "flex-end" }}
          w={"100%"}
          // maxW={"1920px"}
        >
          <HStack spacing={4} display={{ base: "flex", md: "none" }}>
            <IconButton aria-label="Open Drawer" ref={btnRef} onClick={onOpen}>
              <HamburgerIcon />
            </IconButton>
            <SlideFade in={true} reverse delay={0.3}>
              <NavLink to={"/"} prefetch="render" draggable={false}>
                <Image
                  objectFit="contain"
                  h={"35px"}
                  w={"auto"}
                  src={LogoPlain}
                  alt="Eucrona-Logo"
                  draggable="false"
                  loading="eager"
                />
              </NavLink>
            </SlideFade>
          </HStack>

          <HStack spacing={{ base: 0, sm: 4 }}>
            <HStack spacing={{ base: 0, sm: "2px" }}>
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
            </HStack>
            <UserMenu />
          </HStack>
        </Flex>
      </Flex>
    </>
  );
}

function UserMenu() {
  const appData = useLoaderData();

  return (
    <>
      <Flex alignItems={"center"} display={{ base: "none", xs: "flex" }}>
        <Menu>
          <MenuButton
            h={12}
            as={Button}
            variant="ghost"
            p={2}
            rightIcon={<ChevronDownIcon />}
            transition="all 0.3s"
          >
            <HStack>
              <Avatar size={"sm"} name={appData?.user.name} />
              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">{appData?.user.name}</Text>
                <Text fontSize="xs" color="gray.600">
                  Basic User
                </Text>
              </VStack>
            </HStack>
          </MenuButton>

          <MenuList boxShadow="md">
            <MenuItem
              as={Link}
              to="/user/profile"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              draggable={false}
            >
              Profile
            </MenuItem>
            <MenuItem
              as={Link}
              to="/user/settings"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              draggable={false}
            >
              Settings
            </MenuItem>
            <MenuDivider />
            <Form method="post" replace>
              <MenuItem type="submit">Sign out</MenuItem>
            </Form>
          </MenuList>
        </Menu>
      </Flex>
      <Flex alignItems={"center"} display={{ base: "flex", xs: "none" }}>
        <Menu>
          <MenuButton
            h={12}
            as={Button}
            variant="ghost"
            p={2}
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
                <Text fontSize="sm">{appData?.user.name}</Text>
                <Text fontSize="xs" color="gray.600">
                  Basic User
                </Text>
              </VStack>
            </HStack>
          </MenuButton>

          <MenuList
            // bg={useColorModeValue("gray.50", "gray.900")}
            boxShadow="md"
          >
            <MenuItem
              as={Link}
              to="/user/profile"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              draggable={false}
            >
              Profile
            </MenuItem>
            <MenuItem
              as={Link}
              to="/user/settings"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              draggable={false}
            >
              Settings
            </MenuItem>
            <MenuDivider />
            <Form method="post" replace>
              <MenuItem type="submit">Sign out</MenuItem>
            </Form>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
}

interface SidebarDrawerProps {
  isOpen: any;
  onOpen: any;
  onClose: any;
  btnRef: any;
}

function SidebarDrawer({
  isOpen,
  onOpen,
  onClose,
  btnRef,
}: SidebarDrawerProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
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
          {/* <VStack spacing="12px" align="stretch"> */}
          {/* {navigationLinks.map((link, index) => (
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
            ))} */}
          {/* </VStack> */}

          <Box>
            {LinkItems.map((link, index) => (
              // <SlideFade in={true} reverse delay={index * 0.1}>
              <NavItem key={link.name} icon={link.icon}>
                {link.name}
              </NavItem>
              // </SlideFade>
            ))}
          </Box>
        </DrawerBody>

        <DrawerFooter alignSelf="center" width={"100%"}>
          {/* <VStack spacing="12px" width={"100%"}>
            <Button
              fontSize={"sm"}
              width={"100%"}
              fontWeight={400}
              as={Link}
              href="https://cloud.eucrona.com/login"
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
              as={Link}
              style={{ textDecoration: "none" }}
              href="https://cloud.eucrona.com/register"
            >
              Sign Up
            </Button>
          </VStack> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: any;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <ChakraLink href="#" style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </ChakraLink>
  );
};

interface NavItemProps2 extends FlexProps {
  icon: IconType;
}
const NavItem2 = ({ icon, children, ...rest }: NavItemProps2) => {
  return (
    <ChakraLink href="#" style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            // mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
      </Flex>
    </ChakraLink>
  );
};
