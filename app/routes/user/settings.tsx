import React from "react";
import { SlideFade } from "@chakra-ui/react";
import * as auth from "app/utils/auth.server";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    return await auth.protectedRoute(request);
  } catch (error: any) {
    throw error;
  }
};

export default function Settings() {
  return (
    <SlideFade in={true} reverse delay={0.1}>
      settings
    </SlideFade>
  );
}
