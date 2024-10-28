import CardWrapper from "@/components/card-wrapper"
import { useProducts } from "@/lib/hooks/useProducts"

export default function ProductList() {
  const { data, isPending, isError, error } = useProducts()

  if (isPending) return <div>Pending...</div>

  if (isError) return <div>Error: {error.message}</div>
  return (
    <ul className="grid grid-cols-2 gap-4">
      {data.toReversed().map((product) => (
        <li key={product.id}>
          <CardWrapper title={product.name}>
            <p>{product.name}</p>
          </CardWrapper>
        </li>
      ))}
    </ul>
  )
}
