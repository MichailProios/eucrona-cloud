import React, { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";
import { json, redirect } from "@remix-run/node";
import { useDataRefresh } from "remix-utils";

import { useCatch, useLoaderData, useMatches } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/node";

import { ServerStyleContext, ClientStyleContext } from "app/styles/context";

import Layout from "app/components/Layout";
import Catch from "app/components/Catch";
import Error from "app/components/Error";

import theme from "app/styles/theme";

import global from "app/styles/global.css";
import * as auth from "app/utils/auth.server";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Eucrona Cloud",
  description:
    "Production-ready Applications and Solutions built and developed to last",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: global,
    },

    {
      rel: "icon",
      type: "image/png",
      href: "/_static/favicon.ico",
    },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const isAuthRes = await auth.isAuthenticated(request);
    const user = await auth.getUser(request);

    console.log(user);

    return {
      isAuthenticated: isAuthRes,
      user: user?.attributes,
    };
  } catch (error: any) {
    throw error;
  }
};

export const action = async ({ request }: any) => {
  try {
    return await auth.signOut(request);
  } catch (error) {
    throw error;
  }
};

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    useEffect(() => {
      emotionCache.sheet.container = document.head;
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>

        <body style={{ height: "100%", overflow: "overlay" }}>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <Layout>
        <Error error={error} />
      </Layout>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document>
      <Layout>
        <Catch caught={caught} />
      </Layout>
    </Document>
  );
}
