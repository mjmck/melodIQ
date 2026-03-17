"use client"; // required for interactivity

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBarProps {
    placeholder?: string;
}

export default function SearchBar({ placeholder = "Search..." }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim() === "") return;

        // Navigate to /search?query=...
        router.push(`/search?query=${encodeURIComponent(query)}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="border rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search"
            >
                <FaMagnifyingGlass />
            </button>
        </form>
    );
}