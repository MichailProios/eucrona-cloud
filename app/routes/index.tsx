import { Fragment } from "react";
import {
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Button,
  Icon,
  HStack,
  SimpleGrid,
  Flex,
  Box,
  Heading,
  Input,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

import { useActionData } from "@remix-run/react";

import {
  ValidatedForm,
  validationError,
  useIsSubmitting,
  useField,
} from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FaBook } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "@remix-run/react";
import { EmailSubscribers, dynamoose } from "~/utils/db.server";

// import type { LoaderFunction } from "@remix-run/node";
// import { db } from "app/utils/db.server";

interface StatData {
  label: string;
  score: string;
}

const statData: StatData[] = [
  {
    label: "Active Applications ",
    score: ">10",
  },
  {
    label: "Stars on GitHub",
    score: "77k",
  },
  {
    label: "Contributors",
    score: "2.4k",
  },
  {
    label: "Followers on Twitter",
    score: "17k",
  },
];

const planList = [
  "Customer obsessed. We put our customers front & center.",
  "Transparency. Most of our work is public.",
  "Freedom. We work from anywhere in the world.",
  "Autonomy. We want to create a safe, high-trust team.",
  "Excellence. We are aiming high, and we know it.",
];

const features = [
  {
    title: "Developed on the Edge",
    detail: "With best practices and latest technologies in mind",
    icon: (
      <svg
        aria-hidden="true"
        role="img"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d={`M3 3a2 2 0 012-2h9.982a2 2 0 011.414.586l4.018 4.018A2 2 0 0121 7.018V21a2 2 0 01-2 2H4.75a.75.75 
          0 010-1.5H19a.5.5 0 00.5-.5V8.5h-4a2 2 0 01-2-2v-4H5a.5.5 0 00-.5.5v6.25a.75.75 0 01-1.5 0V3zm12-.5v4a.5.5 
          0 00.5.5h4a.5.5 0 00-.146-.336l-4.018-4.018A.5.5 0 0015 2.5z`}
        ></path>
        <path
          d={`M4.53 12.24a.75.75 0 01-.039 1.06l-2.639 2.45 2.64 2.45a.75.75 0 11-1.022 1.1l-3.23-3a.75.75 0 
        010-1.1l3.23-3a.75.75 0 011.06.04zm3.979 1.06a.75.75 0 111.02-1.1l3.231 3a.75.75 0 010 1.1l-3.23 3a.75.75 
        0 11-1.021-1.1l2.639-2.45-2.64-2.45z`}
        ></path>
      </svg>
    ),
  },
  {
    title: "Balanced for Performance",
    detail: "For consistent workloads and zero downtime",
    icon: (
      <svg
        aria-hidden="true"
        role="img"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d={`M12.75 2.75a.75.75 0 00-1.5 0V4.5H9.276a1.75 1.75 0 00-.985.303L6.596 5.957A.25.25 0 016.455 
          6H2.353a.75.75 0 100 1.5H3.93L.563 15.18a.762.762 0 00.21.88c.08.064.161.125.309.221.186.121.452.278.792.433.68.311 
          1.662.62 2.876.62a6.919 6.919 0 002.876-.62c.34-.155.606-.312.792-.433.15-.097.23-.158.31-.223a.75.75 0 
          00.209-.878L5.569 7.5h.886c.351 0 .694-.106.984-.303l1.696-1.154A.25.25 0 019.275 6h1.975v14.5H6.763a.75.75 
          0 000 1.5h10.474a.75.75 0 000-1.5H12.75V6h1.974c.05 0 .1.015.14.043l1.697 1.154c.29.197.633.303.984.303h.886l-3.368 
          7.68a.75.75 0 00.23.896c.012.009 0 0 .002 0a3.154 3.154 0 00.31.206c.185.112.45.256.79.4a7.343 7.343 0 
          002.855.568 7.343 7.343 0 002.856-.569c.338-.143.604-.287.79-.399a3.5 3.5 0 00.31-.206.75.75 0 00.23-.896L20.07 
          7.5h1.578a.75.75 0 000-1.5h-4.102a.25.25 0 01-.14-.043l-1.697-1.154a1.75 1.75 0 00-.984-.303H12.75V2.75zM2.193 
          15.198a5.418 5.418 0 002.557.635 5.418 5.418 0 002.557-.635L4.75 9.368l-2.557 5.83zm14.51-.024c.082.04.174.083.275.126.53.223 
          1.305.45 2.272.45a5.846 5.846 0 002.547-.576L19.25 9.367l-2.547 5.807z`}
        ></path>
      </svg>
    ),
  },
  {
    title: "Customizeable",
    detail: "For every type of use, personal or enterprise",
    icon: (
      <svg
        aria-hidden="true"
        role="img"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d={`M10.157 1.154a11.07 11.07 0 013.686 0 .75.75 0 01-.25 1.479 9.568 9.568 0 00-3.186 0 .75.75 0 
          01-.25-1.48zM6.68 3.205a.75.75 0 01-.177 1.046A9.558 9.558 0 004.25 6.503a.75.75 0 01-1.223-.87 
          11.058 11.058 0 012.606-2.605.75.75 0 011.046.177zm10.64 0a.75.75 0 011.046-.177 11.058 11.058 0 
          012.605 2.606.75.75 0 11-1.222.869 9.558 9.558 0 00-2.252-2.252.75.75 0 01-.177-1.046zM2.018 
          9.543a.75.75 0 01.615.864 9.568 9.568 0 000 3.186.75.75 0 01-1.48.25 11.07 11.07 0 010-3.686.75.75 
          0 01.865-.614zm19.964 0a.75.75 0 01.864.614 11.066 11.066 0 010 3.686.75.75 0 01-1.479-.25 9.56 9.56 
          0 000-3.186.75.75 0 01.615-.864zM3.205 17.32a.75.75 0 011.046.177 9.558 9.558 0 002.252 2.252.75.75 
          0 11-.87 1.223 11.058 11.058 0 01-2.605-2.606.75.75 0 01.177-1.046zm17.59 0a.75.75 0 01.176 1.046 
          11.057 11.057 0 01-2.605 2.605.75.75 0 11-.869-1.222 9.558 9.558 0 002.252-2.252.75.75 0 011.046-.177zM9.543 
          21.982a.75.75 0 01.864-.615 9.56 9.56 0 003.186 0 .75.75 0 01.25 1.48 11.066 11.066 0 01-3.686 0 .75.75 0 01-.614-.865z`}
        ></path>
      </svg>
    ),
  },
];

export const validator = withZod(
  z.object({
    emailAddress: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email")
      .max(50, { message: "Email cannot be more than 50 characters" }),
  })
);

export async function action({ request }: { request: Request }) {
  const data = await validator.validate(await request.formData());

  if (data.error) {
    return validationError(data.error);
  }

  const { emailAddress } = data.data;

  try {
    const exists = await EmailSubscribers.query("EmailAddress")
      .eq(emailAddress)
      .exec();

    if (exists[0]) {
      return "exists";
    }

    await EmailSubscribers.create({ EmailAddress: emailAddress });

    return "success";
  } catch (error) {
    console.error(error);
    return "error";
  }
}

function TextField(props: any) {
  const { error, getInputProps } = useField(props.name);
  const actionData = useActionData();

  return (
    <FormControl
      id={props.name}
      isInvalid={error ? true : false}
      w={{ base: "100%", md: "70%" }}
    >
      <Input
        {...props}
        {...getInputProps()}
        disabled={actionData === "success"}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

function SubmitButton(props: any) {
  const isSubmitting = useIsSubmitting();
  const actionData = useActionData();

  return (
    <Button
      {...props}
      isLoading={isSubmitting}
      loadingText="Subscribing"
      disabled={actionData === "success" || isSubmitting}
    >
      {props.label}
    </Button>
  );
}

export default function Index() {
  const actionData = useActionData();

  return (
    <Fragment>
      <Container maxW="1200px" px={{ base: 6, md: 10 }} py={14}>
        <Stack direction={{ base: "column", md: "row" }}>
          <Stack direction="column" spacing={10} justifyContent="center">
            <chakra.h1
              fontSize="5xl"
              lineHeight={1}
              fontWeight="bold"
              textAlign="left"
            >
              Production-ready
              <chakra.span
                bgGradient="linear(to-br, #228be6, #15aabf)"
                bgClip="text"
              >
                {" "}
                Applications and Solutions{" "}
              </chakra.span>{" "}
              <br /> built and developed to last
            </chakra.h1>
            <Text
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize="lg"
              textAlign="left"
              fontWeight="400"
              maxW="700px"
            >
              Scalable, serverless, and reliable solutions for the needs your
              projects require. <br />
              Eucrona is a centralized cloud based global network of
              applications that grows over time.
            </Text>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={{ base: 5, md: 10 }}
              flexWrap="wrap"
            >
              {features.map((feature, index) => (
                <Stack
                  key={index}
                  direction={{ base: "row", md: "column" }}
                  spacing={2}
                >
                  <Flex
                    p={3}
                    maxH="52px"
                    w="max-content"
                    color="white"
                    bgGradient="linear(to-br, #228be6, #15aabf)"
                    rounded="md"
                  >
                    {feature.icon}
                  </Flex>
                  <Stack direction="column" spacing={2}>
                    <Text fontSize="md" fontWeight="500">
                      {feature.title}
                    </Text>
                    <Text
                      fontSize="sm"
                      _light={{ color: "gray.600" }}
                      _dark={{ color: "gray.400" }}
                      maxW={{ base: "100%", md: "200px" }}
                    >
                      {feature.detail}
                    </Text>
                  </Stack>
                </Stack>
              ))}
            </Stack>
            <Stack direction={{ base: "column", sm: "row" }} spacing={2}>
              <Button
                rightIcon={<ArrowForwardIcon />}
                size="lg"
                colorScheme={"primary"}
                as={Link}
                to="/Solutions"
                draggable={false}
              >
                Get started
              </Button>

              <Button
                as={Link}
                to="/Resources"
                leftIcon={<FaBook />}
                size="lg"
                rounded="md"
                variant={"solid"}
              >
                Resources
              </Button>
            </Stack>
          </Stack>
        </Stack>
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
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
        >
          <Stack spacing={4}>
            <chakra.h1 fontSize="2xl" lineHeight={1.2} fontWeight="bold">
              The Ultimate Goal
            </chakra.h1>
            <Text
              fontSize="md"
              color={useColorModeValue("gray.600", "gray.400")}
              maxW="480px"
            >
              As our user base grows, so does our ecosystem develop. The main
              goal at Eucrona is to develop and share applications within our
              centralized database.
            </Text>

            <Stack spacing={2}>
              <Text
                fontSize="md"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                We plan on doing all that cultivating our values:
              </Text>
              {planList.map((data, index) => (
                <HStack
                  key={index}
                  alignItems="center"
                  spacing={1}
                  fontSize="md"
                >
                  <Icon as={AiFillCheckCircle} w={4} h={4} color="blue.400" />
                  <Text fontSize="md">{data}</Text>
                </HStack>
              ))}
            </Stack>
          </Stack>
          <Stack>
            <SimpleGrid
              columns={2}
              spacing={5}
              pt={8}
              pl={{ base: 0, md: 10 }}
              margin="auto 0"
            >
              {statData.map((data, index) => (
                <Stack
                  key={index}
                  pl={3}
                  py={1}
                  pr={1}
                  borderLeft="2px solid"
                  borderLeftColor="blue.400"
                  justifyContent="space-between"
                >
                  <Box fontSize="2xl" fontWeight="bold" color="blue.400">
                    {data.score}
                  </Box>
                  <Text fontSize="md">{data.label}</Text>
                </Stack>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
      <Flex
        minH={"50vh"}
        align={"center"}
        justify={"center"}
        as={ValidatedForm}
        validator={validator}
        method="post"
        id="subscribeForm"
        // resetAfterSubmit
        px={{ base: 6, md: 10 }}
        py={14}
      >
        <Stack
          boxShadow={"2xl"}
          bg={useColorModeValue("gray.50", "gray.700")}
          rounded={"xl"}
          p={10}
          spacing={8}
          align={"center"}
          maxW="750px"
        >
          <Stack align={"center"} spacing={2}>
            <Heading
              textTransform={"uppercase"}
              fontSize={"3xl"}
              color={useColorModeValue("gray.800", "gray.200")}
            >
              Subscribe
            </Heading>
            <Text fontSize={"lg"} color={"gray.500"} textAlign="center">
              No spam, ever. Your address will only be used for updates and
              news. You can easily unsubscribe any time with a single click.
            </Text>
          </Stack>
          <Stack
            spacing={4}
            direction={{ base: "column", md: "row" }}
            w={"100%"}
          >
            <TextField
              label="Email Address"
              type="email"
              name="emailAddress"
              placeholder="Enter your email address"
              rounded="md"
            />

            <FormControl w={{ base: "100%", md: "30%" }}>
              <SubmitButton
                type="submit"
                colorScheme="primary"
                w="100%"
                variant={"solid"}
                label="Subscribe"
              />
            </FormControl>
          </Stack>
          {actionData && (
            <Alert
              status={
                actionData === "success"
                  ? "success"
                  : actionData === "exists"
                  ? "info"
                  : "error"
              }
              rounded="md"
              w={"full"}
            >
              <AlertIcon />
              <AlertTitle>
                {actionData === "success"
                  ? "Subscribed successfully!"
                  : actionData === "exists"
                  ? "Already subscribed, please enter a new email address."
                  : "Failed to subscribe."}
              </AlertTitle>
            </Alert>
          )}
        </Stack>
      </Flex>
    </Fragment>
  );
}
