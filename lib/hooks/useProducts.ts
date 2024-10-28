import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../data-access/products"

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
