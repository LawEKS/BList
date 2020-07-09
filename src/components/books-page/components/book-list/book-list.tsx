import React from "react"
import Spinner from "react-bootstrap/Spinner"
import { Book } from "../../../../api"
import BookRow from "../book-row"
import BookDetails from "../book-details"

function BookList({
  bookData,
  loading,
}: {
  bookData: Book[]
  loading: boolean
}) {
  if (loading) {
    return (
      <BookRow>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </BookRow>
    )
  }

  if (!bookData.length) {
    return (
      <BookRow>
        <h2>No books to show</h2>
      </BookRow>
    )
  }

  function renderBook(book: Book) {
    return <BookDetails key={book.id} book={book} />
  }
  return (
    <BookRow>
      <ul className="list-unstyled">{bookData.map(renderBook)}</ul>
    </BookRow>
  )
}

export default BookList
