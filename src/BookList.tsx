import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
import { useLocation } from "react-router-dom"

function Header() {
  return (
    <Row as="header">
      <Col>
        <h1>BList</h1>
      </Col>
    </Row>
  )
}
function BooksRow({ children }: { children: React.ReactNode }) {
  return (
    <Row as="main" className="flex-grow-1">
      <Col>{children}</Col>
    </Row>
  )
}
function Books({ bookData }: { bookData: any[] }) {
  if (!bookData.length) {
    return (
      <BooksRow>
        <h2>No books to show</h2>
      </BooksRow>
    )
  }
  return (
    <Row as="main" className="flex-grow-1">
      <Col>
        <h2>Books</h2>
      </Col>
    </Row>
  )
}
function PageButtons({
  prevEnabled = false,
  nextEnabled = false,
}: {
  prevEnabled: boolean
  nextEnabled: boolean
}) {
  return (
    <Row>
      <Col>
        <ButtonGroup>
          <Button disabled={!prevEnabled}>Prev</Button>
          <Button disabled={!nextEnabled}>Next</Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}

// hook to parse query string
function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function parsePageNumber(queryValue: string | null) {
  const result = Number.parseInt(queryValue || "", 10)
  if (isNaN(result)) {
    return 1
  }
  return result
}

function BookList() {
  const [bookData, setBookData] = useState([])
  const query = useQuery()

  const pageNumber = parsePageNumber(query.get("page"))
  const searchTerm = query.get("search")

  return (
    <Container className="d-flex flex-column min-vh-100">
      <Header />
      <Books bookData={bookData} />
      <PageButtons
        nextEnabled={!!bookData.length}
        prevEnabled={!!bookData.length && pageNumber > 1}
      />
    </Container>
  )
}

export default BookList
