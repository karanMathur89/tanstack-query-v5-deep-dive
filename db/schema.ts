import { boolean, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core"

export const products = pgTable("products", {
  id: serial().primaryKey(),
  name: varchar({ length: 20 }).notNull(),
  price: integer().notNull(),
  quantity: integer().notNull(),
  isAvailable: boolean("is_available").default(true).notNull(),
})

export type TProduct = typeof products.$inferSelect
export type InsertProduct = typeof products.$inferInsert
