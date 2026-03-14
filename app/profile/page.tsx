import { getCurrentUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import TopList from "../components/TopList";

const callbackUrl = process.env.callback
const key = process.env.api_key
const authFMUrl = `http://www.last.fm/api/auth/?api_key=${key}&cb=${callbackUrl}login`;

export default async function Profile() {
    const user = await getCurrentUser();
    return (
        <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black space-x-30">
            <div className="flex items-top min-p-10 max-p-30">
                <label>
                    <TopList user={user} topic="tracks" />
                </label>
            </div>
            <div className="flex items-top min-p-10 max-p-30">
                <label>
                    <TopList user={user} topic="albums" />
                </label>
            </div>
            <div className="flex items-top min-p-10 max-p-30">
                <label>
                    <TopList user={user} topic="artists" />
                </label>
            </div>
        </div>
    );
}
