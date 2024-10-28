"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

import PageHeading from "@/components/page-heading"

import { postProduct } from "@/lib/data-access/products"
import type { TProduct } from "@/db/schema"

export default function MutationsPage() {
  //--------
  //* USESTATE
  const [name, setName] = useState("")
  const [price, setPrice] = useState(199)
  const [quantity, setQuantity] = useState(50)

  //* USEQUERYCLIENT
  const queryClient = useQueryClient()

  //* USEMUTATION
  const { mutate, isPending } = useMutation({
    mutationFn: postProduct,
    onSuccess: (newData) => {
      //? invalidate "employees" query and re-fetch it again
      // queryClient.invalidateQueries({ queryKey: ["products"] })
      //? update the data in the cache,
      //? no GET request!!
      queryClient.setQueryData(["products"], (oldData: TProduct[]) => {
        return [...oldData, newData]
      })
    },
  })

  //* HANDLER FUNCTIONS
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate()
    setName("")
    setPrice(199)
  }

  return (
    <section>
      <PageHeading>Mutations</PageHeading>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-80 space-y-4 rounded border border-gray-200 bg-gray-100 px-4 py-8"
      >
        <p className="grid gap-1">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            name="name"
            // required
            className="rounded border border-gray-700 p-2"
          />
        </p>
        <p className="grid">
          <label htmlFor="gender">Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            type="text"
            id="gender"
            name="gender"
            // required
            className="rounded border border-gray-700 p-2"
          />
        </p>
        <button
          disabled={isPending}
          className="w-full rounded bg-emerald-600 px-3 py-1 text-white disabled:bg-gray-600"
        >
          {isPending ? "Submitting" : "Submit"}
        </button>
      </form>
    </section>
  )
}
