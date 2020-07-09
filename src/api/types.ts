export interface BooksParams {
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
