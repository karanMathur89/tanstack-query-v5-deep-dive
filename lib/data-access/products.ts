import { InsertProduct } from "@/db/schema"
import { client } from "../hono"

export async function getProducts() {
  const res = await client.api.products.$get()
  if (!res.ok) {
    throw new Error("Failed to fetch products.")
  }

  const result = await res.json()
  return result.data
}

export async function getProductById(id: string) {
  const res = await client.api.products[":id"].$get({
    param: { id },
  })
  if (!res.ok) {
    throw new Error("Failed to fetch the product.")
  }

  const result = await res.json()
  return result
}

export async function getProductsPagination(page: number) {
  const res = await client.api.products["pagination"].$get({
    query: { page: page },
  })
  if (!res.ok) {
    throw new Error("Failed to fetch the products.")
  }

  const result = await res.json()
  return result
}

export async function postProduct(newProduct: InsertProduct) {
  const res = await client.api.products.$post({ json: newProduct })
  if (!res.ok) {
    throw new Error("Failed to add the product.")
  }

  const result = await res.json()
  return result
}
