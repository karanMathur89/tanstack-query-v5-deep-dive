import db from "@/db/drizzle"
import { insertProductsSchema, products } from "@/db/schema"
import { eq } from "drizzle-orm"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"

const IS_LOGGED_IN = true

//* DATABASE FUNCTIONS
async function getProductsFromDB() {
  const data = await db.query.products.findMany({
    orderBy: products.id,
  })
  return data
}

async function getProductByIdFromDB(id: string) {
  const data = await db.query.products.findFirst({
    where: eq(products.id, Number(id)),
  })
  return data
}

//# APP
const app = new Hono()
  .get("/", async (c) => {
    //guard - auth check
    if (!IS_LOGGED_IN) {
      throw new HTTPException(401, {
        res: c.json({ error: "Unauthorized to access posts." }, 401),
      })
    }
    //

    //* DATABASE
    const data = await getProductsFromDB()

    return c.json({ data: data })
  })
  .get("/pagination", async (c) => {
    const ITEMS_PER_PAGE = 3
    const page = Number(c.req.query("page"))

    //* DATABASE
    const data = await db.query.products.findMany({
      limit: ITEMS_PER_PAGE,
      offset: ITEMS_PER_PAGE * (page - 1),
    })
    const count = await db.$count(products)
    return c.json({ data: data, count: count })
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id")

    if (!id) {
      return c.json({ error: "Missing id" }, 400)
    }

    //* DATABASE
    const data = await getProductByIdFromDB(id)

    return c.json({ data: data })
  })
  .post("/", zValidator("json", insertProductsSchema), async (c) => {
    // add auth check
    const data = c.req.valid("json")

    const [insertedProduct] = await db.insert(products).values(data).returning()
    return c.json(insertedProduct, 201)
  })

export default app
