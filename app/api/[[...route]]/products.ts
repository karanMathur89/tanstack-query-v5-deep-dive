import db from "@/db/drizzle"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

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

    //* DATABASE
    const data = await getProductByIdFromDB(id)

    return c.json({ data: data })
  })
  .post("/", async (c) => {
    // add auth check
    const data = await c.req.json()
    const { name, price, quantity, isAvailable } = data

    const insertedProduct = (
      await db
        .insert(products)
        .values({
          name,
          price: +price,
          quantity: +quantity,
          isAvailable,
        })
        .returning()
    )[0]
    return c.json(insertedProduct, 201)
  })

export default app
