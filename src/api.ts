import axios from "axios"

const bookAPI = axios.create({
  baseURL: "http://nyx.vima.ekt.gr:3000/api/",
})

interface BooksParams {
  pageNumber: number
  itemsPerPage?: number
  searchTerm?: string | null
}

export interface Book {
  id: number
  book_author: string[]
  book_title: string
  book_publication_year: string
  book_publication_country: string
  book_publication_city: string
  book_pages: number
}

export interface PostBooksResponse {
  books: Book[]
  count: number
}

export async function postBooks({
  pageNumber: page = 1,
  itemsPerPage = 20,
  searchTerm = null,
}: BooksParams): Promise<PostBooksResponse> {
  const response = await bookAPI.post<PostBooksResponse>("/books", {
    page,
    itemsPerPage,
    filters: searchTerm ? [{ type: "all", values: [searchTerm] }] : [],
  })

  return response.data
}
