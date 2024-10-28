"use client"

import { useQuery } from "@tanstack/react-query"
import { RefreshCcw } from "lucide-react"

import PageHeading from "@/components/page-heading"
import CardWrapper from "@/components/card-wrapper"
import { client } from "@/lib/hono"

export async function getPosts() {
  // sleep for 0.5 seconds
  await new Promise((resolve) => setTimeout(resolve, 500))
  const res = await client.api.posts.$get()
  if (!res.ok) {
    throw new Error("Failed to fetch posts.")
  }

  const result = await res.json()
  return result.data
}

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
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 5 * 1000, //? cache the data for 5 seconds, default is 0
    // refetchInterval: 1 * 1000, //? (Polling) refetch the data every 1 second, default is 0
    // enabled: false, //? disable the query, default is true
  })

  if (isPending) return <div>Loading...</div>

  if (isError) return <div>Error: {error.message}</div>

  return (
    <section className="space-y-4">
      <PageHeading>Query options</PageHeading>
      <button
        onClick={() => refetch()}
        className="mx-auto flex w-fit items-center gap-2 rounded bg-sky-600 px-3 py-1 text-sky-50 active:bg-sky-800"
      >
        <RefreshCcw />
        Fetch posts
      </button>
      <pre className="rounded bg-gray-200 p-4 font-mono text-sm">
        {JSON.stringify(
          { isPending, isFetching, isRefetching, isLoading, isFetched },
          null,
          2,
        )}
      </pre>
      <ul className="grid grid-cols-2 gap-4">
        {data.map((post) => (
          <li key={post.id}>
            <CardWrapper title={post.title}>
              <p>
                {post.title} by {post.author}
              </p>
            </CardWrapper>
          </li>
        ))}
      </ul>
    </section>
  )
}
