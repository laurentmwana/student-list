import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";
import { faker } from "@faker-js/faker";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  for (let index = 0; index < 20; index++) {
    const user = await prisma.user.create({
      data: {
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        email: faker.internet.email(),
        emailVerified: faker.datatype.boolean(),
        image: faker.image.avatar(),
      },
    });
    console.log(`Utilisateur créé: ${user.name} (${user.email})`);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
