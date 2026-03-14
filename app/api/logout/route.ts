import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const response = NextResponse.redirect(new URL("/", request.url));

    // Delete the session cookie
    response.cookies.delete("session");

    return response;
}