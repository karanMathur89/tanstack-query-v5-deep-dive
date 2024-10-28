"use client"

import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

import CardWrapper from "@/components/card-wrapper"
import PageHeading from "@/components/page-heading"

import type { Movie } from "@/lib/types"
import { useEffect } from "react"

type MoviesPage = Movie & {
  first: number
  last: number
  prev: number
  next: number
  pages: number
  items: number
  data: Movie[]
}

//# FETCHER

const fetchMovies = async ({
  pageParam,
}: {
  pageParam: number
}): Promise<MoviesPage> => {
  //--------------
  await new Promise((resolve) => setTimeout(resolve, 500))
  const res = await fetch(`http://www.localhost:4000/movies?_page=${pageParam}`)
  if (!res.ok) {
    throw new Error("Failed to fetch movies")
  }
  const data = await res.json()
  return data
}

export default function InfiniteScrollPage() {
  //* USEQUERY
  const {
    data,
    isPending,
    isError,
    error,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["infiniteMovies"],
    queryFn: fetchMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? lastPage.next : undefined
    },
    refetchOnWindowFocus: false,
  })

  //* INTERSECTION OBSERVER
  const { ref, inView } = useInView()

  //* USEEFFECT
  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  if (isPending) return <div>Loading...</div>

  if (isError) return <div>Error: {error.message}</div>

  return (
    <section className="space-y-4">
      {isFetching && (
        <Loader2 className="absolute right-8 top-2 mt-6 size-6 animate-spin stroke-sky-600" />
      )}
      <PageHeading>Infinite Scroll</PageHeading>
      <p>{inView ? "In View" : "Out of View"}</p>
      <ul className="grid grid-cols-2 gap-4">
        {data.pages.map((page) => {
          return page.data.map((movie) => (
            <li key={movie.id}>
              <CardWrapper
                title={movie.id + ": " + movie.title}
                body={movie.genre}
              />
            </li>
          ))
        })}
      </ul>
      {/* <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
        className="rounded border border-yellow-500 bg-yellow-300 px-3 py-1"
      >
        Load more
      </button> */}
      {isFetchingNextPage && (
        <div className="mx-auto flex w-fit items-center gap-2 rounded bg-emerald-300 p-2">
          <Loader2 className="animate-spin" /> Loading...
        </div>
      )}
      <div ref={ref} className="rounded bg-sky-600 text-white">
        <span className="sr-only">Intersection Observer element</span>
      </div>
    </section>
  )
}
