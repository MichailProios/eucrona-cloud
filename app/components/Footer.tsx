import {
  Stack,
  HStack,
  Link,
  Divider,
  Image,
  IconButton,
  LinkProps,
  Button,
  Box,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons

import LogoPlain from "public/logos/Logo-Plain.svg";

import { NavLink } from "@remix-run/react";

interface FooterProps {
  navigationLinks: { label: string; url: string }[];
  eucronaAccounts: {
    label: string;
    url: string;
    isExternal: boolean;
    icon: any;
  }[];
}

function Footer({ navigationLinks, eucronaAccounts }: FooterProps) {
  return (
    <Stack
      maxW="1200px"
      marginInline="auto"
      p={2}
      spacing={{ base: 3, md: 0 }}
      justifyContent="space-between"
      alignItems="center"
      direction={{ base: "column", md: "row" }}
    >
      <NavLink to={""} draggable="false">
        <Image
          objectFit="contain"
          h={50}
          w={"auto"}
          src={LogoPlain}
          alt="Eucrona-Logo"
          draggable="false"
        />
      </NavLink>

      <Box
        sx={{
          display: "flex",
          "@media screen and (max-width: 370px)": {
            display: "none",
          },
        }}
      >
        <Stack spacing={4} alignItems="center" direction={"row"}>
          {navigationLinks.map((link, index) => (
            <NavLink key={index} to={link.url} draggable="false">
              <Button variant={"link"} fontSize="sm">
                {link.label}
              </Button>
            </NavLink>
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          display: "none",
          "@media screen and (max-width: 370px)": {
            display: "flex",
          },
        }}
      >
        <Stack spacing={2} alignItems="center" direction={"column"}>
          {navigationLinks.map((link, index) => (
            <NavLink key={index} to={link.url} draggable="false">
              <Button variant={"link"} fontSize="sm">
                {link.label}
              </Button>
            </NavLink>
          ))}
        </Stack>
      </Box>

      <Stack direction="row" spacing={2} alignItems="center">
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
      </Stack>
    </Stack>
  );
}

export default Footer;
