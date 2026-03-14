import Link from "next/link";

export default function LogoutButton() {
    return (
        <Link href="/api/logout">
            <button className="px-4 py-2 rounded bg-red-600 text-white">
                Logout
            </button>
        </Link>
    );
}