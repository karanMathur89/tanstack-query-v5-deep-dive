export type Post = {
  id: number
  title: string
  body: string
}

export type Company = {
  id: number
  name: string
  industry: string
}

export type Movie = {
  id: number
  title: string
  genre: string
}

export type Employee = {
  id: number
  name: string
  gender: "M" | "F"
  job: string
}
