import React, { useState, useEffect } from "react";
import { Outlet, useMatches, Link } from "@remix-run/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  useColorModeValue,
  Container,
  Flex,
  SlideFade,
} from "@chakra-ui/react";
import * as auth from "app/utils/auth.server";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    return await auth.protectedRoute(request);
  } catch (error: any) {
    throw error;
  }
};

export default function User() {
  const location = useMatches()[2];
  const [tabIndex, setTabIndex] = useState();

  const handleTabsChange = (index: any) => {
    setTabIndex(index);
  };

  useEffect(() => {
    handleTabsChange(
      location?.pathname === "/user/profile"
        ? 0
        : location?.pathname === "/user/security"
        ? 1
        : location?.pathname === "/user/settings"
        ? 2
        : undefined
    );
  }, [location?.pathname]);

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Container maxW="3xl" p={{ base: 1, md: 10 }}>
        <Box
          p={{ base: 1, sm: 10 }}
          bg={useColorModeValue("white", "gray.700")}
          rounded="xl"
          boxShadow={"2xl"}
        >
          <Tabs
            colorScheme="primary"
            orientation="horizontal"
            isManual
            align="center"
            isFitted
            index={tabIndex}
            onChange={handleTabsChange}
          >
            <TabList>
              <Tab
                as={Link}
                to="/user/profile"
                _focus={{ boxShadow: "none" }}
                draggable={false}
              >
                Profile
              </Tab>
              <Tab
                as={Link}
                to="/user/security"
                _focus={{ boxShadow: "none" }}
                draggable={false}
              >
                Security
              </Tab>
              <Tab
                as={Link}
                to="/user/settings"
                _focus={{ boxShadow: "none" }}
                draggable={false}
              >
                Settings
              </Tab>
            </TabList>
          </Tabs>

          <Outlet />
        </Box>
      </Container>
    </SlideFade>
  );
}
