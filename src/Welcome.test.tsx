import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Welcome from "./Welcome"

describe("Welcome content", () => {
  test("has project title", () => {
    const { getByText } = render(<Welcome />, { wrapper: MemoryRouter })
    const headingElement = getByText(/blist/i)
    expect(headingElement).toBeInTheDocument()
  })

  test("has explore link", () => {
    const { getByText } = render(<Welcome />, { wrapper: MemoryRouter })
    const exploreLink = getByText(/explore/i)
    expect(exploreLink).toBeInTheDocument()
  })
})
