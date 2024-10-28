"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

import PageHeading from "@/components/page-heading"
import { postProduct } from "@/lib/data-access/products"
import type { InsertProduct, TProduct } from "@/db/schema"
import ProductList from "./product-list"

const LIST = ["Snowy", "Frosty", "Sunny", "Rainy", "Windy"]

export default function OptimisticPage() {
  //--------
  //* USESTATE
  const [name, setName] = useState(LIST[2])
  const [price, setPrice] = useState(199)
  const [quantity] = useState(50)
  const [isAvailable] = useState(true)

  //* USEQUERYCLIENT
  const queryClient = useQueryClient()

  //* USEMUTATION
  const { mutate, isPending: isMutatePending } = useMutation({
    mutationFn: () => postProduct({ name, price, quantity, isAvailable }),
    //? before the mutation function is fired
    onMutate: async (newProduct: InsertProduct) => {
      await queryClient.cancelQueries({
        queryKey: ["products"],
      })
      const previousProducts = queryClient.getQueriesData({
        queryKey: ["products"],
      })
      queryClient.setQueryData(["products"], (oldData: TProduct[]) => {
        return [...oldData, { ...newProduct, id: 900 }]
      })

      return { previousProducts }
    },
    onError: (_error, _product, context) => {
      queryClient.setQueryData(["products"], context?.previousProducts)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })

  //* HANDLER FUNCTIONS
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate({ name, price, quantity, isAvailable })
  }

  return (
    <section className="space-y-4">
      <PageHeading>Optimistic update</PageHeading>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-80 space-y-4 rounded border border-gray-200 bg-gray-100 px-4 py-8"
      >
        <p className="grid gap-1">
          <label htmlFor="name">Name</label>
          <select
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded border border-gray-700 p-2"
          >
            <option value="" disabled>
              --Please choose an option--
            </option>
            <optgroup label="All names">
              {LIST.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </optgroup>
          </select>
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
          disabled={isMutatePending}
          className="w-full rounded bg-emerald-600 px-3 py-1 text-white disabled:bg-gray-600"
        >
          {isMutatePending ? "Submitting" : "Submit"}
        </button>
      </form>
      <ProductList />
    </section>
  )
}
