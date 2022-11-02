import {
  Container,
  Box,
  chakra,
  Text,
  Icon,
  SimpleGrid,
  Stack,
  HStack,
  VStack,
  Flex,
  Image,
  Button,
  useColorModeValue,
  Link as ChakraLink,
} from "@chakra-ui/react";

// import type { SVGProps } from "react";
import { Link } from "@remix-run/react";
// Here we have used react-icons package for the icons
import {
  MdOutlinePersonPin,
  MdPermDeviceInformation,
  MdOutlineFlashlightOn,
} from "react-icons/md";
import { SiMinds } from "react-icons/si";
import type { IconType } from "react-icons";
import { Fragment } from "react";

import pic from "public/temp.png";

interface IFeature1 {
  heading: string;
  content: string;
  icon: IconType;
}

const Solution: IFeature1[] = [
  {
    heading: "Learn with flashcards",
    content:
      "The main part of the learning process is using flashcards, you see a question, then you answer it.",
    icon: MdOutlineFlashlightOn,
  },
  {
    heading: "Never forget",
    content: `With our latest SRS algorithm, you will never forget what you've learned. The more you remember something, the less often the system will ask you to review it.`,
    icon: SiMinds,
  },
  {
    heading: "Tiny bits of information",
    content:
      "Instead of showing you a wall of text that will take you a long time to read and then that you quickly forget, we show you tiny bits of information every day.",
    icon: MdPermDeviceInformation,
  },
  {
    heading: "Community",
    content: `Keep your learning streak going, see stats of what you've learned and share it with others via your public profile. You can also join our private discord server!`,
    icon: MdOutlinePersonPin,
  },
];

interface IFeature2 {
  heading: string;
  content: string;
  icon: any;
}

const features: IFeature2[] = [
  {
    heading: "Payments",
    content:
      "Choose from Stripe, Paddle, Braintree, or PayPal to launch your product quickly.",
    icon: (
      <svg
        width={36}
        height={36}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        ></path>
      </svg>
    ),
  },
  {
    heading: "Invoicing",
    content:
      "Webhooks are wired up to automatically email customers PDF receipts and invoices.",
    icon: (
      <svg
        width={36}
        height={36}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        ></path>
      </svg>
    ),
  },
  {
    heading: "API Included",
    content:
      "Roll your own API to easily connect with other apps or services. Pull in updates.",
    icon: (
      <svg
        width={36}
        height={36}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        ></path>
      </svg>
    ),
  },
];

const overviewList = [
  {
    id: 1,
    label: "Login once per day",
    subLabel: "The process should be quick.",
  },
  {
    id: 2,
    label: "Do your reviews",
    subLabel: "Reviews come from previous flashcards that you chose.",
  },
  {
    id: 3,
    label: "Streak increase",
    subLabel:
      "Your streak increases once per day as long as you finish your reviews.",
  },
  {
    id: 4,
    label: "Choose your lesson",
    subLabel: "This will add 5 new flashcards to your reviews.",
  },
];

const Solutions = () => {
  return (
    <Fragment>
      <Container maxW="1200px" px={{ base: 6, md: 10 }} py={14}>
        <chakra.h3 fontSize="4xl" fontWeight="bold" mb={3} textAlign="center">
          Solutions
        </chakra.h3>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          placeItems="center"
          spacing={16}
          mt={12}
          mb={4}
        >
          {Solution.map((feature, index) => (
            <Box key={index} textAlign="center">
              <Icon as={feature.icon} w={10} h={10} color="blue.400" />
              <chakra.h3 fontWeight="semibold" fontSize="2xl">
                {feature.heading}
              </chakra.h3>
              <Text fontSize="md">{feature.content}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
      <Box overflow="hidden">
        <svg
          fill={useColorModeValue("#f7fafc", "#171923")}
          width="150%"
          height="56px"
          // transform="scaleX(-1)"
          filter="drop-shadow(10px 5px 5px rgba(0, 0, 0, 0.05))"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 
            250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 
            3V0H0v27.35a600.21 600.21 0 00321.39 29.09z`}
          ></path>
        </svg>
      </Box>
      <Container maxW="1200px" px={{ base: 6, md: 10 }} py={14}>
        <chakra.h3 fontSize="4xl" fontWeight="bold" mb={20} textAlign="center">
          Everything your app needs and more
        </chakra.h3>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          placeItems="center"
          spacing={10}
          mb={4}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              _light={{ bg: "gray.50" }}
              _dark={{ bg: "gray.700" }}
              rounded="lg"
              boxShadow="2xl"
              p={6}
              textAlign="center"
              pos="relative"
            >
              <Flex
                p={2}
                w="max-content"
                color="white"
                bgGradient="linear(to-br, #228be6, #15aabf)"
                rounded="md"
                marginInline="auto"
                pos="absolute"
                left={0}
                right={0}
                top="-1.5rem"
                boxShadow="lg"
              >
                {feature.icon}
              </Flex>
              <chakra.h3 fontWeight="semibold" fontSize="2xl" mt={6}>
                {feature.heading}
              </chakra.h3>
              <Text fontSize="md" mt={4}>
                {feature.content}
              </Text>
              <ChakraLink href="#" mt={4} fontSize="sm" color="blue.400">
                Learn more →
              </ChakraLink>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
      <Container maxW="1200px" px={{ base: 6, md: 10 }} py={14}>
        <chakra.h2 fontSize="4xl" fontWeight="bold" textAlign="center" mb={3}>
          How it works?
        </chakra.h2>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 0, md: 3 }}
          mt={12}
          justifyContent="center"
          alignItems="center"
        >
          <VStack
            spacing={4}
            alignItems="flex-start"
            mb={{ base: 5, md: 0 }}
            maxW="md"
          >
            {overviewList.map((data) => (
              <Box key={data.id}>
                <HStack spacing={2}>
                  <Flex
                    fontWeight="bold"
                    boxShadow="md"
                    color="white"
                    bg="blue.400"
                    rounded="full"
                    justifyContent="center"
                    alignItems="center"
                    w={10}
                    h={10}
                  >
                    {data.id}
                  </Flex>
                  <Text fontSize="xl">{data.label}</Text>
                </HStack>
                <Text fontSize="md" color="gray.500" ml={12}>
                  {data.subLabel}
                </Text>
              </Box>
            ))}
          </VStack>
          <Image
            // boxSize={{ base: "auto", md: "lg" }}
            width={{ base: "auto", md: "50%" }}
            objectFit="contain"
            src={pic}
            rounded="xl"
          />
        </Stack>
      </Container>

      <Container maxW="1200px" px={{ base: 6, md: 10 }} py={14}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          spacing={5}
          alignItems={"center"}
          justifyContent="space-between"
          rounded="lg"
          boxShadow="2xl"
          bg={useColorModeValue("gray.50", "gray.700")}
          p={{ base: 8, md: 16 }}
        >
          <Box>
            <chakra.h1 fontSize="4xl" lineHeight={1.2} fontWeight="bold">
              Ready to get started?
            </chakra.h1>
            <chakra.h2
              fontSize="2xl"
              lineHeight={1.2}
              fontWeight="bold"
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              bgClip="text"
            >
              Create an account or learn more.
            </chakra.h2>
          </Box>
          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={{ base: 0, sm: 3 }}
            w={{ base: "100%", sm: "auto" }}
          >
            <Button
              // as={Link}
              colorScheme="primary"
              // href="#"
              variant="solid"
              // size="lg"
              // rounded="md"
              mb={{ base: 2, sm: 0 }}
              // lineHeight={1}
            >
              Create Eucrona Account
            </Button>
            <Button
              as={Link}
              to={"/Infrastructure"}
              // size="lg"
              // rounded="md"
              mb={{ base: 2, sm: 0 }}
              variant={"solid"}
              // bg={useColorModeValue("gray.200", "gray.600")}
              // _hover={{ bg: useColorModeValue("gray.300", "gray.500") }}
              // lineHeight={1}
            >
              Learn more
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Fragment>
  );
};

export default Solutions;
