import React from "react"
import { render } from "@testing-library/react"
import BookList from "./BookList"

describe("BookList content", () => {
  test("has project title", () => {
    const { getByText } = render(<BookList />)
    const headingElement = getByText(/blist/i)
    expect(headingElement).toBeInTheDocument()
  })

  test("has page buttons", () => {
    const { getByText } = render(<BookList />)
    const prevButton = getByText(/prev/i)
    expect(prevButton).toBeInTheDocument()
    const nextButton = getByText(/next/i)
    expect(nextButton).toBeInTheDocument()
  })
})
