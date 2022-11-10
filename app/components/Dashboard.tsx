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
  Stack,
  useBoolean,
  SlideFade,
  Slide,
  ScaleFade,
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
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import LogoSideways from "public/logos/Logo-Sideways.svg";
import LogoPlain from "public/logos/Logo-Plain.svg";
import { useWindowDimensions } from "~/utils/hooks";

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
  const [sidebar, setSidebar] = useBoolean();
  const transition = useTransition();
  const { height } = useWindowDimensions();
  const breakpoint = useBreakpoint({ ssr: true });

  useEffect(() => {
    if (breakpoint === "lg" || breakpoint === "md") {
      setSidebar.on();
    } else {
      setSidebar.off();
    }
  }, [breakpoint, setSidebar]);

  return (
    <Flex
      flexDirection="row"
      justifyContent="flex-start"
      display={{ sm: "none", md: "flex" }}
    >
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
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        {...rest}
      >
        <Flex h={16} alignItems="center" justifyContent="center">
          <HStack direction={"row"} align="center" spacing={sidebar ? 0 : 4}>
            <SlideFade in={!sidebar} reverse>
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
            <SlideFade in={sidebar} reverse>
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

      <Box w={"100%"}>
        <Header colorMode={colorMode} toggleColorMode={toggleColorMode} />
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
    </Flex>
  );
};

interface HeaderProps {
  colorMode: any;
  toggleColorMode: any;
}

function Header({ colorMode, toggleColorMode }: HeaderProps) {
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
    </>
  );
}

function UserMenu() {
  const { user } = useLoaderData();

  return (
    <Flex alignItems={"center"}>
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
        <MenuList bg={useColorModeValue("gray.50", "gray.900")} boxShadow="md">
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuDivider />
          <Form method="post" replace>
            <MenuItem type="submit">Sign out</MenuItem>
          </Form>
        </MenuList>
      </Menu>
    </Flex>
  );
}
