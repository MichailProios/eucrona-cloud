import React, { Fragment } from "react";
import {
  Box,
  chakra,
  Container,
  Text,
  HStack,
  VStack,
  Flex,
  useColorModeValue,
  useBreakpointValue,
  Link,
  Stack,
  Button,
  Skeleton,
  Image,
} from "@chakra-ui/react";

import type { TextProps } from "@chakra-ui/react";

import type { PropsWithChildren } from "react";

import temp2 from "public/temp2.webp";

const milestones = [
  {
    id: 1,
    date: "MARCH 30, 2022",
    title: "Chakra Hackathon",
    description: `Winner of first ever ChakraUI Hackathon. On sait depuis longtemps que travailler avec du texte lisible et contenant du sens.`,
  },
  {
    id: 2,
    date: "July 30, 2021",
    title: "Open Source, first contribution",
    description: `Fixing a typo, to fix a bug, contributing to Open Source and collaborating to improve technology for everyone, Ahmad's world changed again!.`,
  },
  {
    id: 3,
    date: "July 30, 2018",
    title: "Freelancing, started working for myself",
    description:
      "Ahmad starts his own business consulting for companies as a fullstack developer. Clients include UK Government departments, UK banks, global fintechs and startups.",
  },
  {
    id: 4,
    date: "July 30, 2018",
    title: "Freelancing, started working for myself",
    description:
      "Ahmad starts his own business consulting for companies as a fullstack developer. Clients include UK Government departments, UK banks, global fintechs and startups.",
  },
  {
    id: 5,
    date: "July 30, 2018",
    title: "Freelancing, started working for myself",
    description:
      "Ahmad starts his own business consulting for companies as a fullstack developer. Clients include UK Government departments, UK banks, global fintechs and startups.",
  },
  {
    id: 6,
    date: "July 30, 2018",
    title: "Freelancing, started working for myself",
    description:
      "Ahmad starts his own business consulting for companies as a fullstack developer. Clients include UK Government departments, UK banks, global fintechs and startups.",
  },

  {
    id: 7,
    date: "July 30, 2018",
    title: "Freelancing, started working for myself",
    description:
      "Ahmad starts his own business consulting for companies as a fullstack developer. Clients include UK Government departments, UK banks, global fintechs and startups.",
  },
  {
    id: 8,
    date: "July 30, 2018",
    title: "Freelancing, started working for myself",
    description:
      "Ahmad starts his own business consulting for companies as a fullstack developer. Clients include UK Government departments, UK banks, global fintechs and startups.",
  },
];

//

export default function Infrastructure() {
  return (
    <Fragment>
      <Container maxW="1200px" px={{ base: 6, md: 10 }} py={14}>
        <chakra.h3 fontSize="4xl" fontWeight="bold" mb={18} textAlign="center">
          Infrastructure
        </chakra.h3>
        <Stack
          direction={{ base: "column", lg: "row" }}
          justifyContent="center"
        >
          <Box mr={{ base: 0, md: 5 }} pos="relative">
            <DottedBox />
            <Image
              boxShadow="lg"
              w="100%"
              h="100%"
              minW={{ base: "auto", md: "30rem" }}
              maxH="20rem"
              objectFit="cover"
              src={temp2}
              rounded="md"
              loading="eager"
              fallback={<Skeleton />}
            />
          </Box>
          <Stack direction="column" spacing={6} justifyContent="center">
            <chakra.h1
              fontSize="5xl"
              lineHeight={1}
              fontWeight="bold"
              textAlign="left"
            >
              On a mission to empower Front end developers
            </chakra.h1>
            <Box>
              <Content>
                Building products is hard. We've built our fair share and we've
                noticed the problems you always run into.
              </Content>
              <Content mt={4}>
                TemplatesKart provides the best ChakraUI templates. Now you can
                focus on your business, not on the boilerplate.
              </Content>
              <Content mt={4}>
                You want to build a product and we want to help you. Building
                products has changed our lives in ways we couldn't imagine and
                we want to help you achieve that success too.
              </Content>
            </Box>
            <Link href="#" fontSize="sm" color="blue.400">
              See how people are using our components →
            </Link>
          </Stack>
        </Stack>
      </Container>
      <Container maxW="1200px" px={{ base: 6, md: 10 }} py={14}>
        {milestones.map((milestone) => (
          <div key={milestone.id}>
            <Flex mb="10px" display={{ base: "none", md: "flex" }}>
              {milestone.id % 2 === 0 && (
                <>
                  <EmptyCard />
                  <LineWithDot />
                  <Card {...milestone} />
                </>
              )}
              {/* </chakra.span> */}

              {/* <chakra.span display={{ base: "none", md: "flex" }}> */}
              {milestone.id % 2 !== 0 && (
                <>
                  <Card {...milestone} />

                  <LineWithDot />
                  <EmptyCard />
                </>
              )}
            </Flex>

            <Flex mb="10px" display={{ base: "flex", md: "none" }}>
              <>
                <LineWithDot />
                <Card {...milestone} />
              </>
            </Flex>
          </div>
        ))}
      </Container>
    </Fragment>
  );
}

const Content = ({ children, ...props }: PropsWithChildren<TextProps>) => {
  return (
    <Text
      fontSize="md"
      textAlign="left"
      lineHeight="1.375"
      fontWeight="400"
      color="gray.500"
      {...props}
    >
      {children}
    </Text>
  );
};

function DottedBox() {
  return (
    <Box
      position="absolute"
      left="-45px"
      top="-30px"
      height="full"
      maxW="700px"
      zIndex={-1}
    >
      <svg
        color={useColorModeValue("rgba(55,65,81, 0.1)", "rgba(55,65,81, 0.7)")}
        width="350"
        height="420"
        fill="none"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
        ></rect>
      </svg>
    </Box>
  );
}

interface CardProps {
  id: number;
  title: string;
  description: string;
  date: string;
}

const Card = ({ id, title, description, date }: CardProps) => {
  // For even id show card on left side
  // For odd id show card on right side
  const isEvenId = id % 2 == 0;
  let borderWidthValue = isEvenId ? "15px 15px 15px 0" : "15px 0 15px 15px";
  let leftValue = isEvenId ? "-15px" : "unset";
  let rightValue = isEvenId ? "unset" : "-15px";

  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isMobile) {
    leftValue = "-15px";
    rightValue = "unset";
    borderWidthValue = "15px 15px 15px 0";
  }

  return (
    <HStack
      flex={1}
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue("gray.100", "gray.800")}
      spacing={5}
      rounded="lg"
      alignItems="center"
      pos="relative"
      _before={{
        content: `""`,
        w: "0",
        h: "0",
        borderColor: `transparent ${useColorModeValue(
          "#edf2f6",
          "#1a202c"
        )} transparent`,
        borderStyle: "solid",
        borderWidth: borderWidthValue,
        position: "absolute",
        left: leftValue,
        right: rightValue,
        display: "block",
      }}
    >
      <Box>
        <Text fontSize="lg" color={isEvenId ? "teal.400" : "blue.400"}>
          {date}
        </Text>

        <VStack spacing={2} mb={3} textAlign="left">
          <chakra.h1 fontSize="2xl" lineHeight={1.2} fontWeight="bold" w="100%">
            {title}
          </chakra.h1>
          <Text fontSize="md">{description}</Text>
        </VStack>
      </Box>
    </HStack>
  );
};

const LineWithDot = () => {
  return (
    <Flex
      pos="relative"
      alignItems="center"
      mr={{ base: "40px", md: "40px" }}
      ml={{ base: "0", md: "40px" }}
    >
      <chakra.span
        position="absolute"
        left="50%"
        height="calc(100% + 10px)"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        top="0px"
      ></chakra.span>
      <Box pos="relative" p="10px">
        <Box
          pos="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
          width="100%"
          height="100%"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          bg={useColorModeValue("gray.600", "gray.200")}
          borderRadius="100px"
          backgroundImage="none"
          opacity={1}
        ></Box>
      </Box>
    </Flex>
  );
};

const EmptyCard = () => {
  return (
    <Box
      flex={{ base: 0, md: 1 }}
      p={{ base: 0, md: 6 }}
      bg="transparent"
    ></Box>
  );
};
