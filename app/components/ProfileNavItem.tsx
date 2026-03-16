import { getCurrentUser } from "@/lib/user";
import Link from "next/link";

interface Props {
    name: string,
    address: string
}

export default async function ProfileNavItem({ name, address }: Props) {
    const user = await getCurrentUser();

    return (
        <Link href={address} className="font-semibold">
            {name}
        </Link>
    );
}