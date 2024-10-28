import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getProductsPagination } from "../data-access/products"

export function usePagination(page: number) {
  return useQuery({
    queryKey: ["pagination", page],
    queryFn: () => getProductsPagination(page),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  })
}
