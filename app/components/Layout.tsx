import { Fragment, ReactNode, useEffect, useState } from "react";

import {
  Fade,
  Divider,
  IconButton,
  Box,
  useDisclosure,
  Show,
  Tooltip,
  Center,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";

import { animateScroll as scroll } from "react-scroll";

import ExecutionEnvironment from "exenv";

import Navbar from "app/components/Navbar";
import Footer from "app/components/Footer";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import { useWindowDimensions } from "app/utils/hooks";
import { useScrollButtonVisibility } from "app/utils/hooks";
import { ChevronUpIcon } from "@chakra-ui/icons";

interface LayoutProps {
  children: ReactNode;
}

const navigationLinks = [
  { label: "Solutions", url: "Solutions" },
  { label: "Infrastructure", url: "Infrastructure" },
  { label: "Resources", url: "Resources" },
  { label: "Contacts", url: "Contacts" },
];

const eucronaAccounts = [
  {
    label: "Michail Proios LinkedIn",
    url: "https://www.linkedin.com/in/michail-proios/",
    isExternal: true,
    icon: <FaLinkedin />,
  },
  {
    label: "Michail Proios Github",
    url: "https://github.com/MichailProios",
    isExternal: true,
    icon: <FaGithub />,
  },
];

export default function Layout({ children }: LayoutProps) {
  const [flag, setFlag] = useState(false);
  const { height } = useWindowDimensions();

  const showButton = useScrollButtonVisibility();

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      setFlag(true);
    }
  }, [setFlag]);

  const handleScrollToTop = () => {
    if (ExecutionEnvironment.canUseDOM) {
      scroll.scrollToTop({
        duration: 400,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  };

  return (
    <Box
      display={"flex"}
      width={"100%"}
      minHeight={height || "100vh"}
      flexDirection={"column"}
      justifyContent="flex-start"
    >
      <Navbar
        navigationLinks={navigationLinks}
        eucronaAccounts={eucronaAccounts}
      />

      <Box display={{ base: "none", md: "flex" }}>
        <Fade in={showButton} unmountOnExit style={{ zIndex: 1000 }}>
          <Tooltip label="Scroll to Top" closeOnScroll>
            <IconButton
              onClick={handleScrollToTop}
              aria-label="top"
              zIndex={1000}
              shadow="lg"
              size="lg"
              rounded={"full"}
              position="fixed"
              bottom={12}
              right={16}
              colorScheme={"primary"}
            >
              <ChevronUpIcon fontSize="1.5em" />
            </IconButton>
          </Tooltip>
        </Fade>
      </Box>

      <Box>{children}</Box>
      <Box marginTop={"auto"}>
        <Divider />
        <Footer
          navigationLinks={navigationLinks}
          eucronaAccounts={eucronaAccounts}
        />
      </Box>
    </Box>
  );
}
