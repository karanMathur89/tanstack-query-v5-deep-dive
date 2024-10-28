"use client"

import CardWrapper from "@/components/card-wrapper"
import PageHeading from "@/components/page-heading"
import { getProductsPagination } from "@/lib/data-access/products"
import { cn } from "@/lib/utils"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { notFound, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function PaginationPage() {
  //* SEARCHPARAMS
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1

  //* USESTATE
  // const [page, setPage] = useState(1)

  //* USEQUERY
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pagination", page],
    queryFn: () => getProductsPagination(page),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  })

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error: {error.message}</div>

  if (!products || !products.data) {
    notFound()
  }

  const count = products.count
  const RESULTS_PER_PAGE = 3
  const lastPage = Math.ceil(count / RESULTS_PER_PAGE)

  return (
    <section className="space-y-4">
      <PageHeading>Pagination</PageHeading>
      <div className="flex items-center justify-center gap-2">
        {/*//? Navigation with buttons */}
        {/* <button
          disabled={page === 1}
          onClick={() => router.push(`/pagination?page=${page - 1}`)}
          className="rounded-full bg-rose-500 px-3 py-1 text-white active:brightness-90 active:contrast-125 disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="flex size-8 items-center justify-center rounded-full bg-gray-800 text-yellow-300">
          {page}
        </span>
        <button
          disabled={page === 10}
          onClick={() => router.push(`/pagination?page=${page + 1}`)}
          className="rounded-full bg-emerald-500 px-3 py-1 text-white active:brightness-90 active:contrast-125 disabled:bg-gray-400"
        >
          Next
        </button> */}
        {/* //? Navigation with Link elements */}
        <Link
          href={`/pagination?page=${page - 1}`}
          className={cn([
            "rounded-full bg-rose-500 px-3 py-1 text-white active:brightness-90 active:contrast-125 disabled:bg-gray-400",
            { "pointer-events-none bg-gray-500": page === 1 },
          ])}
        >
          Previous
        </Link>
        <span className="flex size-8 items-center justify-center rounded-full bg-gray-800 text-yellow-300">
          {page}
        </span>
        <Link
          href={`/pagination?page=${page + 1}`}
          className={cn([
            "rounded-full bg-emerald-500 px-3 py-1 text-white active:brightness-90 active:contrast-125 disabled:bg-gray-400",
            { "pointer-events-none bg-gray-500": page === lastPage },
          ])}
        >
          Next
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-4">
        {products.data.map((product) => (
          <li key={product.id}>
            <CardWrapper title={product.name}>
              <dl>
                <dt className="text-xs font-medium uppercase text-gray-600">
                  Price
                </dt>
                <dd>${product.price}</dd>
                <dt className="mt-2 text-xs font-medium uppercase text-gray-600">
                  Units
                </dt>
                <dd>{product.quantity}</dd>
                <dt className="mt-2 text-xs font-medium uppercase text-gray-600">
                  Availibility
                </dt>
                <dd>{product.isAvailable ? "In stock" : "Not available"}</dd>
              </dl>
            </CardWrapper>
          </li>
        ))}
      </ul>
    </section>
  )
}
