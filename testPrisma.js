require('dotenv').config();
const { PrismaClient } = require('./generated/prisma');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    const orders = await prisma.order.findMany();
    console.log("Orders: ", orders);
}

main()
  .catch(e => console.error("Erro do prisma: ", e))
  .finally(() => prisma.$disconnect());