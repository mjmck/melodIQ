import { cookies } from "next/headers";
import prisma from "./prisma";

export async function getCurrentSession() {
    const cookiesStore = await cookies();
    const sessionCookie = cookiesStore.get("session");

    if (!sessionCookie) return null;

    const session = await prisma.session.findUnique({
        where: { key: sessionCookie.value },
        include: { user: true }
    });

    return session;
}

