"use client"

import CardWrapper from "@/components/card-wrapper"
import PageHeading from "@/components/page-heading"
import { useProduct } from "@/lib/hooks/useProduct"
import { notFound } from "next/navigation"
import { use } from "react"

export default function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  //* USEQUERY CUSTOM HOOK
  const { data, isPending, isError, error } = useProduct(id)

  const product = data?.data

  if (isPending) return <div>Loading...</div>

  if (isError) return <div>Error: {error.message}</div>

  if (!product) {
    notFound()
  }

  return (
    <section>
      <PageHeading>{product.name}</PageHeading>
      <CardWrapper title={product.name}>
        <p>
          {product.name}, priced at ${product.price}, and {product.price} units
          in stock.
        </p>
      </CardWrapper>
    </section>
  )
}
