import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { User } from "@/app/generated/prisma/client";

export async function GET(request: Request) {
    console.log("Here!");
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const key = process.env.API_KEY!;

    const params = new URLSearchParams({
        method: "user.getTopTracks",
        api_key: key,
        user: user.name,
        limit: "10",
        format: "json",
    });

    const res = await fetch("https://ws.audioscrobbler.com/2.0/", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
    });

    const data = await res.json();

    return NextResponse.json(data);
}