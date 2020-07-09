import React from "react"
import Media from "react-bootstrap/Media"
import bookIcon from "../../assets/book.svg"
import { Book } from "../../../../api"

function BookDetails({
  book: {
    book_author,
    book_title,
    book_publication_year,
    book_publication_country,
    book_publication_city,
    book_pages,
  },
}: {
  book: Book
}) {
  return (
    <Media as="li" className="mb-3">
      <img width={32} height={32} className="mr-3" src={bookIcon} alt="book" />
      <Media.Body>
        <h5>{book_title}</h5>
        <h6>{book_author}</h6>
        <ul className="list-unstyled">
          <li>Published {book_publication_year}</li>
          <li>
            {book_publication_city}, {book_publication_country}
          </li>
          <li>{book_pages} pages</li>
        </ul>
      </Media.Body>
    </Media>
  )
}

export default BookDetails
