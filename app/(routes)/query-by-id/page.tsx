"use client"

import { Loader2 } from "lucide-react"

import PageHeading from "@/components/page-heading"
import CardWrapper from "@/components/card-wrapper"
import Link from "next/link"
import { useProducts } from "@/lib/hooks/useProducts"

export default function QueryByIdPage() {
  //* USEQUERY CUSTOM HOOK
  const { data, isPending, isError, error, isFetching } = useProducts()

  if (isPending) return <div>Loading...</div>

  if (isError) return <div>Error: {error.message}</div>

  return (
    <section>
      {isFetching && (
        <Loader2 className="absolute right-8 top-2 mt-6 size-6 animate-spin stroke-sky-600" />
      )}
      <PageHeading>
        Query by <code className="bg-amber-400/20 px-1">id</code>
      </PageHeading>
      <ul className="grid grid-cols-2 gap-4">
        {data.map((product) => (
          <li key={product.id}>
            <Link href={`/query-by-id/${product.id}`}>
              <CardWrapper title={product.name}>
                <p>{product.name}</p>
              </CardWrapper>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
