import prisma from "@/lib/prisma";
import { fetchTopArtists, fetchTopAlbums, fetchTopTracks } from "@/lib/lastfm";

export async function getCurrentUserTopTracks(appSessionKey: string) {
    const appSession = await prisma.session.findUnique({
        where: { key: appSessionKey },
        include: { user: true },
    });

    if (!appSession?.user) throw new Error("Invalid session");

    const user = appSession.user;

    if (!appSession.key) throw new Error("No Last.fm session key available");

    // Use stored Last.fm session key for private top artists
    const topTracks = await fetchTopTracks(user, 10, true); // true = use private sk
    return topTracks;
}

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
        throw new Error("Invalid topic given in getCurrentUserTop()")
    }


}

export async function getCurrentUserTopArtists(appSessionKey: string) {
    const appSession = await prisma.session.findUnique({
        where: { key: appSessionKey },
        include: { user: true },
    });

    if (!appSession?.user) throw new Error("Invalid session");

    const user = appSession.user;

    if (!appSession.key) throw new Error("No Last.fm session key available");

    // Use stored Last.fm session key for private top artists
    const topArtists = await fetchTopArtists(user, 10, true); // true = use private sk
    console.log(topArtists)
    return topArtists;
}