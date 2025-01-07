import { Hono } from "hono"
import { handle } from "hono/vercel"
import { HTTPException } from "hono/http-exception"
// import { logger } from "hono/logger"
//import routes
import products from "./products"

export const runtime = "edge"

const app = new Hono().basePath("/api")
// app.use(logger())

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    // Get the custom response
    return err.getResponse()
  }
  return c.json({ error: "Internal error" }, 500)
})

const routes = app.route("/products", products)

export const GET = handle(app)
export const POST = handle(app)
export type AppType = typeof routes
