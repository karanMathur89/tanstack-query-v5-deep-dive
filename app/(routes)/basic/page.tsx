"use client"

import PageHeading from "@/components/page-heading"
import CardWrapper from "@/components/card-wrapper"
import { useProducts } from "@/lib/hooks/useProducts"

export default function Basic() {
  const { data, isLoading, isError, error } = useProducts()

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error: {error.message}</div>

  return (
    <section>
      <PageHeading>useQuery basic usage</PageHeading>
      <ul className="grid grid-cols-2 gap-4">
        {data?.map((product) => (
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
