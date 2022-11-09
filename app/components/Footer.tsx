import {
  Stack,
  HStack,
  Link,
  Divider,
  Image,
  IconButton,
  LinkProps,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons

import LogoPlain from "public/logos/Logo-Plain.svg";

import { NavLink } from "@remix-run/react";

// interface FooterProps {
//   navigationLinks: { label: string; url: string }[];
//   eucronaAccounts: {
//     label: string;
//     url: string;
//     isExternal: boolean;
//     icon: any;
//   }[];
// }

function Footer() {
  return (
    <Center p={2} marginInline="auto">
      <Text>Eucrona Cloud {new Date().getFullYear()}</Text>
    </Center>
  );
}

export default Footer;
