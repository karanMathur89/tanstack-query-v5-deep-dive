import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../data-access/products"

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    staleTime: 60 * 1000,
  })
}
