import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const key = process.env.API_KEY!;
    const secret = process.env.API_SECRET!;

    const sig = crypto
        .createHash("md5")
        .update(`api_key${key}methodauth.getSessiontoken${token}${secret}`)
        .digest("hex");

    // Exchange token for Last.fm session
    const res = await fetch("https://ws.audioscrobbler.com/2.0/", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            method: "auth.getSession",
            api_key: key,
            token,
            api_sig: sig,
            format: "json",
        }),
    });

    const data = await res.json();

    const username = data.session.name;
    const lastfmSessionKey = data.session.key; // optional to store

    // create or find user
    const user = await prisma.user.upsert({
        where: { name: username },
        update: { sessionKey: lastfmSessionKey }, // update existing Last.fm key
        create: {
            name: username,
            sessionKey: lastfmSessionKey,
        },
    });

    // create a new app session (local)
    const session = await prisma.session.create({
        data: {
            key: lastfmSessionKey, // your app session key
            createdAt: new Date(),
            userId: user.id,
        },
    });

    // set cookie and redirect
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("session", session.key, {
        httpOnly: true,
        secure: true,
        path: "/",
    });



    return response;
}