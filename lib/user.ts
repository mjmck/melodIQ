import prisma from "@/lib/prisma";
import { fetchTopArtists, fetchTopAlbums, fetchTopTracks } from "@/lib/lastfm";
import { getCurrentSession } from "./auth";

export async function getCurrentUserTop(appSessionKey: string, topic: string, limit: number | null) {
    const appSession = await prisma.session.findUnique({
        where: { key: appSessionKey },
        include: { user: true },
    });

    if (!appSession?.user) throw new Error("Invalid session");

    const user = appSession.user;

    if (!appSession.key) throw new Error("No Last.fm session key available");

    const howMany = limit ?? 10;

    if (topic == "tracks") {
        const top = await fetchTopTracks(user, howMany, false);
        return top;
    } else if (topic == "albums") {
        const top = await fetchTopAlbums(user, howMany, false);
        return top;
    } else if (topic == "artists") {
        const top = await fetchTopArtists(user, howMany, false);
        console.log(top);
        return top;
    } else {
        throw new Error("Invalid topic")
    }


}

export async function getCurrentUser() {
    const session = await getCurrentSession();

    return session?.user ?? null;
}

export async function getUser(name: string) {
    // Validate the name to make sure it's not undefined or empty
    if (!name) {
        console.error("Invalid name provided:", name);
        return null; // Handle invalid name gracefully
    }

    try {
        const user = await prisma.user.findUnique({
            where: { name },
        });

        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null; // Handle errors gracefully
    }
}