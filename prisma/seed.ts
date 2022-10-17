import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getTest().map((value) => {
      return db.test.create({ data: value });
    })
  );
}
// seed();

function getTest() {
  return [
    { name: "test1" },
    { name: "test2" },
    { name: "test3" },
    { name: "test4" },
    { name: "test5" },
  ];
}
