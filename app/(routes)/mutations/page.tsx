"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

import PageHeading from "@/components/page-heading"

import { postProduct } from "@/lib/data-access/products"

export default function MutationsPage() {
  //--------
  //* USESTATE
  const [name, setName] = useState("")
  const [price, setPrice] = useState<number>(199)
  const [quantity, setQuantity] = useState<number>(50)

  //* USEQUERYCLIENT
  const queryClient = useQueryClient()

  //* USEMUTATION
  const { mutate, isPending } = useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      //? invalidate "employees" query and re-fetch it again
      queryClient.invalidateQueries({ queryKey: ["products"] })
      //? update the data in the cache,
      //? no GET request!!
      // queryClient.setQueryData(["products"], (oldData: SelectProduct[]) => {
      //   return [...oldData, newData]
      // })
    },
  })

  //* HANDLER FUNCTIONS
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate({ name, price, quantity })
    console.log({ name, price, quantity })
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
            required
            className="rounded border border-gray-700 p-2"
          />
        </p>
        <p className="grid">
          <label htmlFor="price">Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            type="number"
            id="price"
            name="price"
            required
            className="rounded border border-gray-700 p-2"
          />
        </p>
        <p className="grid">
          <label htmlFor="quantity">Quantity</label>
          <input
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
            type="number"
            id="quantity"
            name="quantity"
            required
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
