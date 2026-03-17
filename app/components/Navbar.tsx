import { getCurrentUser } from "@/lib/user";
import LoginButton from "./LoginButton";
import ProfilePicture from "./ProfilePicture";
import SearchBar from "./SearchBar";
import defaultPFP from '@/public/defaultPFP.png';
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export default async function Navbar() {
    const user = await getCurrentUser();

    const imageSrc = user?.pfp ?? defaultPFP.src;

    return (
        <nav className="bg-gray-100 dark:bg-gray-900 p-4 flex justify-end items-center gap-20">
            <SearchBar />
            {user ? (
                <>
                    <Link href="/profile">
                        <ProfilePicture src={imageSrc} size={40} alt={user.name} />
                    </Link>
                    <LogoutButton />
                </>

            ) : (
                <LoginButton />
            )}
        </nav>
    );
}