import { getCurrentUser } from "@/lib/user";
import ProfileNavItem from "./ProfileNavItem"

export default async function ProfileNav() {
    const user = await getCurrentUser();
    const id = user?.name;


    return (
        <nav className="bg-zinc-600 dark:bg-zinc-600 h-4 w-full p-4 flex justify-center items-center gap-20">
            <ProfileNavItem name="Reviews" address={`/user/${id}/reviews`} />
            <ProfileNavItem name="Your Listens" address={`/user/${id}/listens`} />
        </nav>
    );
}