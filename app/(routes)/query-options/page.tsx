"use client"

import { useQuery } from "@tanstack/react-query"
import { RefreshCcw } from "lucide-react"

import PageHeading from "@/components/page-heading"
import CardWrapper from "@/components/card-wrapper"
import { getProducts } from "@/lib/data-access/products"

export default function QueryOptionsPage() {
  //* USEQUERY
  const {
    data,
    isPending,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    isFetched,
    isRefetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 1000, //? cache the data for 5 seconds, default is 0
    // refetchInterval: 1 * 1000, //? (Polling) refetch the data every 1 second, default is 0
    enabled: false, //? disable the query, default is true
  })

  if (isPending)
    return (
      <div className="space-y-4">
        <p className="w-fit rounded bg-orange-100 p-2 text-orange-700">
          Data fetching disabled.
        </p>
        <button
          onClick={() => refetch()}
          className="flex w-fit items-center gap-2 rounded bg-sky-600 px-3 py-1 text-sky-50 active:bg-sky-800"
        >
          Fetch posts
          <RefreshCcw className="size-4" />
        </button>
        <pre className="rounded bg-gray-200 p-4 font-mono text-sm">
          {JSON.stringify(
            { isPending, isFetching, isRefetching, isLoading, isFetched },
            null,
            2,
          )}
        </pre>
      </div>
    )

  if (isError) return <div>Error: {error.message}</div>

  return (
    <section className="space-y-4">
      <PageHeading>Query options</PageHeading>
      <button
        onClick={() => refetch()}
        className="mx-auto flex w-fit items-center gap-2 rounded bg-sky-600 px-3 py-1 text-sky-50 active:bg-sky-800"
      >
        <RefreshCcw />
        Re-fetch posts
      </button>
      <pre className="rounded bg-gray-200 p-4 font-mono text-sm">
        {JSON.stringify(
          { isPending, isFetching, isRefetching, isLoading, isFetched },
          null,
          2,
        )}
      </pre>
      <ul className="grid grid-cols-2 gap-4">
        {data.map((product) => (
          <li key={product.id}>
            <CardWrapper title={product.name}>
              <p>{product.name}</p>
            </CardWrapper>
          </li>
        ))}
      </ul>
    </section>
  )
}
