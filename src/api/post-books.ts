import { BooksParams, PostBooksResponse } from "./types"
import { bookAPI } from "./book-api"

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
