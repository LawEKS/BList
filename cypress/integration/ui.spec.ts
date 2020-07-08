describe("visible content", () => {
  it("shows welcome screen", () => {
    cy.visit("/")
    cy.findByText("A destination for book discovery").should("be.visible")
    cy.findByText(/explore/i).should("be.visible")
  })

  it("navigates to explore route and requests for page 1 of books", () => {
    // set up AJAX call interception
    cy.server()
    cy.route("POST", "**/api/books", "fixture:books_page_1").as("books-request")

    cy.visit("/")
    cy.findByText(/explore/i).click()

    cy.url().should("include", "explore")
    cy.url().should("include", "page=1")

    // ... and AJAX call waiting
    cy.wait("@books-request").should((xhr) => {
      expect(xhr.status).to.equal(200)
      expect(xhr.response.body).to.contain.keys(["books", "count"])
    })

    cy.findByText(/prev/i).should("be.disabled")
    cy.findByText(/next/i).should("not.be.disabled")
  })
})
