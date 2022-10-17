import React from "react";
import { useLoaderData } from "@remix-run/react";
import { db } from "app/utils/db.server";

export let loader = async () => {
  const test = await db.test.findMany({ take: 100 });

  return test;
};

export default function Test() {
  const temp = useLoaderData();

  return (
    <div>
      {temp.map((temp1: any) => (
        <div key={temp1.name}>
          <h1>{temp1.name}</h1>
        </div>
      ))}
    </div>
  );
}
