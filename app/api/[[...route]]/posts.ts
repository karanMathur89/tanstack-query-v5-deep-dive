import { Hono } from "hono"
import { getCookie } from "hono/cookie"

const posts = [
  {
    id: 1,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
  },
  {
    id: 2,
    title: "Lonesome Dove",
    author: "Larry McMurtry",
  },
  {
    id: 3,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
  },
  {
    id: 4,
    title: "The Blade Itself",
    author: "Joe Abercrombie",
  },
]

//# APP
const app = new Hono()

  //* GET
  .get("/", async (c) => {
    const randomIndex = Math.floor(Math.random() * posts.length)
    return c.json({ data: [posts[randomIndex]] })
  })

  //* POST
  .post("/", async (c) => {
    //get request body
    const body = await c.req.json()
    const header = c.req.header()
    const cookie = getCookie(c, "fruit")

    // return as response
    return c.json({ body, cookie, header }, 201)
  })

export default app
