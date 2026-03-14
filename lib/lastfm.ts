// lib/lastfm.ts
import { User } from "@/app/generated/prisma/client";
import { getCurrentSession } from "./auth";

const API_KEY = process.env.API_KEY!;

/**
 * @param user
 * @param limit 
 * @param usePrivate
 */

export async function fetchTopTracks(user: User, limit = 10, usePrivate = false) {
    const params = new URLSearchParams({
        method: "user.getTopTracks",
        api_key: API_KEY,
        limit: limit.toString(),
        format: "json",
    });

    // For public data, just use username
    params.set("user", user.name);

    // If private data, include session key (Last.fm sk)
    if (usePrivate) {
        if (!user.sessionKey) {
            throw new Error("No Last.fm session key available for private data");
        }
        params.delete("user"); // sk takes precedence
        params.set("sk", user.sessionKey);
    }

    const res = await fetch("https://ws.audioscrobbler.com/2.0/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
    });

    if (!res.ok) {
        throw new Error("Failed to fetch top tracks from Last.fm");
    }

    const data = await res.json();
    return data;
}

export async function fetchTopAlbums(user: User, limit = 10, usePrivate = false) {
    const params = new URLSearchParams({
        method: "user.getTopAlbums",
        api_key: API_KEY,
        limit: limit.toString(),
        format: "json",
    });

    // For public data, just use username
    params.set("user", user.name);

    // If private data, include session key (Last.fm sk)
    if (usePrivate) {
        if (!user.sessionKey) {
            throw new Error("No Last.fm session key available for private data");
        }
        params.delete("user"); // sk takes precedence
        params.set("sk", user.sessionKey);
    }

    const res = await fetch("https://ws.audioscrobbler.com/2.0/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
    });

    if (!res.ok) {
        throw new Error("Failed to fetch top albums from Last.fm");
    }

    const data = await res.json();
    return data;
}

export async function fetchTopArtists(user: User, limit = 10, usePrivate = false) {
    const params = new URLSearchParams({
        method: "user.getTopArtists",
        api_key: API_KEY,
        limit: limit.toString(),
        format: "json",
    });

    // For public data, just use username
    params.set("user", user.name);

    // If private data, include session key (Last.fm sk)
    if (usePrivate) {
        if (!user.sessionKey) {
            throw new Error("No Last.fm session key available for private data");
        }
        params.delete("user"); // sk takes precedence
        params.set("sk", user.sessionKey);
    }

    const res = await fetch("https://ws.audioscrobbler.com/2.0/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
    });

    if (!res.ok) {
        throw new Error("Failed to fetch top artists from Last.fm");
    }

    const data = await res.json();
    return data;
}