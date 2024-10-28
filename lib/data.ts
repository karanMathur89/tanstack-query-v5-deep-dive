import { useQuery } from "@tanstack/react-query"
import type { Company } from "./types"

//# FETCH COMPANIES

const fetchCompanies = async () => {
  // Simulate a delay of 0.5 seconds
  await new Promise((resolve) => setTimeout(resolve, 500))
  const res = await fetch("http://localhost:4000/companies")
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }
  const data: Company[] = await res.json()
  return data
}

export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    staleTime: 60 * 1000, //? cache the data for 60 seconds, default is 0
  })
}

//# FETCH COMPANY

const fetchCompany = async (id: string) => {
  // Simulate a delay of 0.5 seconds
  await new Promise((resolve) => setTimeout(resolve, 500))
  const res = await fetch(`http://localhost:4000/companies/${id}`)
  if (!res.ok) {
    throw new Error("Failed to fetch company")
  }
  const data: Company = await res.json()
  return data
}

export function useCompany(id: string) {
  return useQuery({
    queryKey: ["company", id],
    queryFn: () => fetchCompany(id),
    staleTime: 60 * 1000, //? cache the data for 60 seconds, default is 0
  })
}
