import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

const userData: Prisma.UserCreateInput[] = [
    {
        name: "Alice",
        sessions: {
            create: [
                {
                    key: "abcdeKEY",
                },
            ],
        },
    },
    {
        name: "Jerry",
        sessions: {
            create: [
                {
                    key: "JERRY",
                },
            ],
        },
    },
];

export async function main() {
    for (const u of userData) {
        await prisma.user.create({ data: u });
    }
}

main();