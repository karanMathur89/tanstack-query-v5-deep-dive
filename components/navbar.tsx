"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Link = {
  href: string
  text: string
}

const links: Link[] = [
  { href: "/", text: "Home" },
  { href: "/basic", text: "Basic" },
  { href: "/query-options", text: "Query Options" },
  { href: "/query-by-id", text: "Query by id" },
  { href: "/pagination", text: "Pagination" },
  // { href: "/infinite-scroll", text: "Infinite Scroll" },
  { href: "/mutations", text: "Mutations" },
  { href: "/optimistic", text: "Optimistic Updates" },
  { href: "/server", text: "Server" },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav>
      <ul className="flex max-w-xl flex-wrap items-center gap-4 rounded-md bg-gray-50 p-4 shadow">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                [
                  "pb border-b-2 font-medium text-gray-500 transition hover:brightness-75",
                ],
                {
                  "border-black text-black": pathname === link.href,
                },
              )}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
