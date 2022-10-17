import React, { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import {
  extendTheme,
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
} from "@chakra-ui/react";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/cloudflare";

import { ServerStyleContext, ClientStyleContext } from "~/styles/context";

import Navbar from "app/components/Navbar";
import NotFound from "app/components/NotFound";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "PulseTrail",
  viewport: "width=device-width,initial-scale=1",
});

export let links: LinksFunction = () => {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon/favicon.ico",
    },
    {
      rel: "manifest",

      href: "/favicon/site.webmanifest",
    },
  ];
};

const colors = {
  primary: {
    "50": "#f0f9fe",
    "100": "#c3e5fb",
    "200": "#8dcdf7",
    "300": "#45aef2",
    "400": "#349cde",
    "500": "#2c83bb",
    "600": "#256f9e",
    "700": "#1e597f",
    "800": "#194b6b",
    "900": "#12364d",
  },
};

const config = {
  useSystemColorMode: true,
};

const components = {
  Button: {
    variants: {
      primary: {
        bgGradient: "linear(to-br, #39a9f1, #00438b)",
        color: "white",

        _hover: {
          bgGradient: "linear(to-br, #2c9ce4, #00367e)",
        },
        _active: {
          bgGradient: "linear(to-br, #2090d8, #002971)",
        },

        _disabled: {
          bgGradient: "linear(to-br, #39a9f1, #00438b)",
        },
      },
    },
  },
};

const theme = extendTheme({ config, colors, components });

interface DocumentProps {
  children: React.ReactNode;
}

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
        <body style={{ overflow: "overlay" }}>
          {children}
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        </body>
      </html>
    );
  }
);

export default function App() {
  let cookies = "";

  return (
    <Document>
      <ChakraProvider
        theme={theme}
        colorModeManager={
          cookies.length > 0
            ? cookieStorageManagerSSR(cookies)
            : localStorageManager
        }
      >
        <Navbar cookies={cookies}>
          <Outlet />
        </Navbar>
      </ChakraProvider>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  let cookies = "";

  return (
    <Document>
      <ChakraProvider
        theme={theme}
        colorModeManager={
          cookies.length > 0
            ? cookieStorageManagerSSR(cookies)
            : localStorageManager
        }
      >
        <Navbar cookies={cookies}>
          <NotFound />
        </Navbar>
      </ChakraProvider>
    </Document>
  );
}

export function CatchBoundary() {
  let cookies = "";

  return (
    <Document>
      <ChakraProvider
        theme={theme}
        colorModeManager={
          cookies.length > 0
            ? cookieStorageManagerSSR(cookies)
            : localStorageManager
        }
      >
        <Navbar cookies={cookies}>
          <NotFound />
        </Navbar>
      </ChakraProvider>
    </Document>
  );
}
