import React from "react"
import { render } from "@testing-library/react"
import Welcome from "./Welcome"

describe("Welcome content", () => {
  test("has project title", () => {
    const { getByText } = render(<Welcome />)
    const headingElement = getByText(/blist/i)
    expect(headingElement).toBeInTheDocument()
  })

  test("has explore button", () => {
    const { getByText } = render(<Welcome />)
    const exploreButton = getByText(/explore/i)
    expect(exploreButton).toBeInTheDocument()
  })
})
