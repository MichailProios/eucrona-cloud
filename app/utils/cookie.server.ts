import { createCookie, createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

const sessionCookie = createCookie("__data", {
  secrets: ["temp"],
  httpOnly: true,
  sameSite: true,
  secure: process.env.NODE_ENV === "production",
});

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: sessionCookie,
  });
