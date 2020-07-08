import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"
import Image from "react-bootstrap/Image"
import Media from "react-bootstrap/Media"
import Jumbotron from "react-bootstrap/Jumbotron"
import { useLocation, useHistory } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"

import searchIcon from "./assets/search.svg"
import searchLoadingIcon from "./assets/search-loading.svg"
import bookIcon from "./assets/book.svg"

import { postBooks, Book } from "./api"

function Header({
  onSearchInputChange,
  handleSubmit,
  loading,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onSearchInputChange: (inputValue: string) => void
  loading: boolean
}) {
  return (
    <Row as="header">
      <Col>
        <Jumbotron className="d-flex justify-content-start align-items-center">
          <h1 className="mr-4 mb-0">BList</h1>
          <Form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          >
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  onSearchInputChange(event.target.value)
                }
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit" className="py-0">
                  {loading ? (
                    <Image src={searchLoadingIcon} alt="search-loading" />
                  ) : (
                    <Image src={searchIcon} alt="search" />
                  )}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Jumbotron>
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

function BookDetails({
  book: {
    id,
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

function Books({ bookData, loading }: { bookData: Book[]; loading: boolean }) {
  if (loading) {
    return (
      <BooksRow>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </BooksRow>
    )
  }

  if (!bookData.length) {
    return (
      <BooksRow>
        <h2>No books to show</h2>
      </BooksRow>
    )
  }

  function renderBook(book: Book) {
    return <BookDetails key={book.id} book={book} />
  }

  return (
    <BooksRow>
      <ul className="list-unstyled">{bookData.map(renderBook)}</ul>
    </BooksRow>
  )
}

function generateButtonLinkPaths({
  pageNumber,
  searchTerm = null,
}: {
  pageNumber: number
  searchTerm: string | null
}): { prevPath: string; nextPath: string } {
  const [prevPath, nextPath] = [true, false].map((isPrev) => {
    const pageParam = `page=${isPrev ? pageNumber - 1 : pageNumber + 1}`
    const searchParam = searchTerm ? `&search=${searchTerm}` : ""
    return `/explore?${pageParam}${searchParam}`
  })

  return { prevPath, nextPath }
}

function PageButtons({
  prevEnabled = false,
  nextEnabled = false,
  pageNumber,
  searchTerm,
}: {
  prevEnabled: boolean
  nextEnabled: boolean
  pageNumber: number
  searchTerm: string | null
}) {
  const { prevPath, nextPath } = generateButtonLinkPaths({
    pageNumber,
    searchTerm,
  })
  return (
    <Row>
      <Col>
        <ButtonGroup className="w-100">
          <LinkContainer to={prevPath}>
            <Button disabled={!prevEnabled}>Prev</Button>
          </LinkContainer>
          <LinkContainer to={nextPath}>
            <Button disabled={!nextEnabled}>Next</Button>
          </LinkContainer>
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

function calculateLastPage(count: number, itemsPerPage: number) {
  return Math.ceil(count / itemsPerPage)
}

function BookList() {
  const [bookData, setBookData] = useState<Book[]>([])
  const [itemsPerPage] = useState(20)
  const [loading, setLoading] = useState(true)
  const query = useQuery()

  const pageNumber = parsePageNumber(query.get("page"))
  const searchTerm = query.get("search")

  const [lastPage, setLastPage] = useState(pageNumber)
  const [inputSearchValue, setInputSearchValue] = useState("")
  const location = useLocation()
  const history = useHistory()

  function onSearchInputChange(inputValue: string) {
    setInputSearchValue(inputValue)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    history.push(
      `${location.pathname}?page=${pageNumber}&search=${encodeURI(
        inputSearchValue,
      )}`,
    )
  }

  useEffect(() => {
    setLoading(true)
    ;(async function requestBooksToRender() {
      const data = await postBooks({
        pageNumber,
        itemsPerPage,
        searchTerm,
      })
      setBookData(data.books)
      setLastPage(calculateLastPage(data.count, itemsPerPage))
      setLoading(false)
    })()
  }, [pageNumber, searchTerm, itemsPerPage])

  return (
    <Container className="d-flex flex-column min-vh-100">
      <Header
        loading={loading}
        onSearchInputChange={onSearchInputChange}
        handleSubmit={handleSubmit}
      />
      <Books loading={loading} bookData={bookData} />
      <PageButtons
        pageNumber={pageNumber}
        searchTerm={searchTerm}
        nextEnabled={!!bookData.length && pageNumber < lastPage}
        prevEnabled={!!bookData.length && pageNumber > 1}
      />
    </Container>
  )
}

export default BookList
