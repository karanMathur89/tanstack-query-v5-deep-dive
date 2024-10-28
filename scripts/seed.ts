import { products, type TProduct } from "@/db/schema"
import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"

const db = drizzle(process.env.DATABASE_URL!)

const main = async () => {
  try {
    console.log("Seeding database...")

    const productData = [
      {
        name: "Pixel 7",
        price: 999,
        quantity: 100,
        isAvailable: true,
      },
      {
        name: "Galaxy S22",
        price: 109,
        quantity: 160,
        isAvailable: false,
      },
      {
        name: "Razr Maxx",
        price: 599,
        quantity: 300,
        isAvailable: true,
      },
    ]

    await db.insert(products).values(productData)
    console.log("New product created!")
  } catch (error) {
    console.error(error)
    throw new Error("Error while seeding database")
  }
}

main()
