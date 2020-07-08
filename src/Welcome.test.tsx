import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Welcome from "./Welcome"

describe("Welcome content", () => {
  test("has project title", () => {
    const { getByText } = render(<Welcome />, { wrapper: MemoryRouter })
    expect(getByText(/blist/i)).toBeInTheDocument()
  })

  test("has explore link", () => {
    const { getByText } = render(<Welcome />, { wrapper: MemoryRouter })
    expect(getByText(/explore/i)).toBeInTheDocument()
  })
})
