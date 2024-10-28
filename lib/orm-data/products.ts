import { unstable_cache } from "next/cache"
import { client } from "../hono"

export const getProductsFromOrm = unstable_cache(
  async () => {
    const res = await client.api.products.$get()
    if (!res.ok) {
      throw new Error("Failed to fetch products.")
    }

    const result = await res.json()
    return result.data
  },
  ["products"],
  {
    revalidate: 60,
  },
)
