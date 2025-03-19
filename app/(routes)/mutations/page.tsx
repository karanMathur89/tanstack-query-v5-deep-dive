"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import PageHeading from "@/components/page-heading"

import CardWrapper from "@/components/card-wrapper"
import { SelectProduct } from "@/db/schema"
import { postProduct } from "@/lib/data-access/products"
import { useProducts } from "@/lib/hooks/useProducts"

export default function MutationsPage() {
  //--------
  //* USESTATE
  const [name, setName] = useState("")
  const [price, setPrice] = useState<number>(199)
  const [quantity, setQuantity] = useState<number>(50)

  //* USEQUERYCLIENT
  const queryClient = useQueryClient()

  const { isPending: isProductsPending } = useProducts()
  const data = useProducts().data || []

  //* USEMUTATION
  const { mutate, isPending } = useMutation({
    mutationFn: postProduct,
    onSuccess: (newData) => {
      //? invalidate "employees" query and re-fetch it again
      // queryClient.invalidateQueries({ queryKey: ["products"] })

      //? update the data in the cache,
      //note no GET request!!
      queryClient.setQueryData(["products"], (oldData: SelectProduct[]) => {
        return [...oldData, newData]
      })
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
      <p className="my-4 w-fit rounded bg-orange-100 p-2 text-sm text-orange-700">
        Is mutate pending {isPending ? "true" : "false"}
      </p>
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
      {isProductsPending && <div>Loading...</div>}

      <ul className="mt-4 grid grid-cols-2 gap-4">
        {isPending && (
          <li className="animate-pulse">
            <CardWrapper title={"Adding product"}>
              <p>...</p>
              <p>...</p>
            </CardWrapper>
          </li>
        )}
        {data.toReversed().map((product) => (
          <li key={product.id}>
            <CardWrapper title={product.name}>
              <p>${product.price}</p>
              <p>{product.quantity} units for sale</p>
            </CardWrapper>
          </li>
        ))}
      </ul>
    </section>
  )
}
