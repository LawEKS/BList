import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import { useLocation, useHistory } from "react-router-dom"

import Header from "./header"
import BookList from "./book-list"
import PageButtons from "./page-buttons"

import { postBooks, Book } from "../../api"

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

// hook to parse query string
function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function BooksPage() {
  const [bookData, setBookData] = useState<Book[]>([])
  const [itemsPerPage] = useState(20)
  const [loading, setLoading] = useState(true)

  const query = useQuery()
  const pageNumber = parsePageNumber(query.get("page"))
  const searchTerm = query.get("search")
  const [lastPage, setLastPage] = useState(pageNumber)

  const [inputSearchValue, setInputSearchValue] = useState("")
  function onSearchInputChange(inputValue: string) {
    setInputSearchValue(inputValue)
  }

  const location = useLocation()
  const history = useHistory()
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const searchParam = inputSearchValue.trim().length
      ? `&search=${encodeURI(inputSearchValue)}`
      : ""

    history.push(`${location.pathname}?page=${pageNumber}${searchParam}`)
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
      <BookList loading={loading} bookData={bookData} />
      <PageButtons
        pageNumber={pageNumber}
        searchTerm={searchTerm}
        nextEnabled={!!bookData.length && pageNumber < lastPage}
        prevEnabled={!!bookData.length && pageNumber > 1}
      />
    </Container>
  )
}

export default BooksPage
