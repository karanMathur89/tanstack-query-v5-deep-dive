import { getProductsFromOrm } from "@/lib/orm-data/products"

export default async function ServerPage() {
  const data = await getProductsFromOrm()
  return (
    <main className="space-y-4">
      <h1 className="text-center text-3xl font-semibold tracking-tight">
        Server fetching
      </h1>
      <pre className="rounded bg-slate-200 p-4 text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  )
}
