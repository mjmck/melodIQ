import Link from "next/link";

interface Props {
    name: string,
    address: string
}

export default function ProfileNavItem({ name, address }: Props) {
    return (
        <Link href={address} className="font-semibold">
            {name}
        </Link>
    );
}