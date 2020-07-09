import React from "react"
import { render } from "@testing-library/react"
import BookList from "."
import { MemoryRouter } from "react-router-dom"

describe("BookList content", () => {
  test("has project title", () => {
    const { getByText } = render(<BookList />, { wrapper: MemoryRouter })
    expect(getByText(/blist/i)).toBeInTheDocument()
  })

  test("has page buttons", () => {
    const { getByText } = render(<BookList />, { wrapper: MemoryRouter })
    expect(getByText(/prev/i)).toBeInTheDocument()
    expect(getByText(/next/i)).toBeInTheDocument()
  })
})
