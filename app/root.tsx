import React, { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import { useCatch } from "@remix-run/react";

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
import favicon from "public/favicon.ico";
import LogoPlain from "public/logos/Logo-Plain.svg";
import LogoSideways from "public/logos/Logo-Sideways.svg";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Eucrona",
  description:
    "Production-ready Applications and Solutions built and developed to last",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    // { rel: "preconnect", href: "https://fonts.googleapis.com" },
    // { rel: "preconnect", href: "https://fonts.gstatic.com" },

    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
    {
      rel: "stylesheet",
      href: global,
    },
    {
      rel: "preload",
      href: LogoPlain,
      as: "image",
    },
    {
      rel: "preload",
      href: LogoSideways,
      as: "image",
    },
    {
      rel: "preload",
      type: "image/png",
      href: favicon,
    },
    {
      rel: "icon",
      type: "image/png",
      href: favicon,
    },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
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
          {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
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
