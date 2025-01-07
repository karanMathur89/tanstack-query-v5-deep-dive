import { boolean, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const products = pgTable("products", {
  id: serial().primaryKey(),
  name: varchar({ length: 20 }).notNull(),
  price: integer().notNull(),
  quantity: integer().notNull(),
  isAvailable: boolean("is_available").default(true).notNull(),
})

//Schemas
export const selectProductsSchema = createSelectSchema(products)
export const insertProductsSchema = createInsertSchema(products)

//Types
export type SelectProduct = z.infer<typeof selectProductsSchema>
export type InsertProduct = z.infer<typeof insertProductsSchema>
