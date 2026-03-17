import Link from "next/link";
import { Button } from "./Button";

export default function LogoutButton() {
    return (
        <Button asChild className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
            <Link href="/api/logout">Logout</Link>
        </Button>
    );
}