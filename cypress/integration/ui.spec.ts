describe("UI", () => {
  it("shows welcome screen", () => {
    cy.visit("/")
    cy.findByText("A destination for book discovery").should("be.visible")
    cy.findByText(/explore/i).should("be.visible")
  })

  it("navigates to explore route then requests for page 1 of books", () => {
    // set up AJAX call interception
    cy.server()
    cy.route("POST", "**/api/books", "fixture:books_page_1").as("books-request")

    cy.visit("/")
    cy.findByText(/explore/i).click()

    cy.url().should("include", "explore")
    cy.url().should("include", "page=1")

    cy.wait("@books-request").should((xhr) => {
      expect(xhr.status).to.equal(200)
      expect(xhr.response.body).to.contain.keys(["books", "count"])
    })
  })

  it("disables correct buttons between first and last pages", () => {
    cy.fixture("books_page_1").as("page-1")
    cy.fixture("books_page_2").as("page-2")
    cy.fixture("books_page_3").as("page-3")

    cy.server()
    cy.route("POST", "**/api/books", "@page-1").as("books-request-1")
    cy.visit("/explore?page=1")
    cy.wait("@books-request-1")
    cy.findByText(/prev/i).should("be.have.class", "disabled")

    // set up response stub and trigger navigation to page 2
    cy.route("POST", "**/api/books", "@page-2").as("books-request-2")
    cy.findByText(/next/i).click()
    cy.wait("@books-request-2")

    // set up response stub and trigger navigation to page 3
    cy.route("POST", "**/api/books", "@page-3").as("books-request-3")
    cy.findByText(/next/i).click()
    cy.wait("@books-request-3")

    // now on last page
    cy.findByText(/next/i).should("be.have.class", "disabled")
  })

  it("can search books and navigate pages", () => {
    cy.server()
    cy.route("POST", "**/api/books", "fixture:books_page_1").as("books-request")
    cy.visit("/explore?page=1")
    cy.wait("@books-request")

    cy.fixture("search").then(({ city }) => {
      cy.findByPlaceholderText(/search/i).type(city)

      cy.route("POST", "**/api/books", "fixture:books_search_page_1").as(
        "books-search-request-1",
      )
      cy.findByAltText("search").click()
      cy.wait("@books-search-request-1")
      cy.url().should("include", "page=1")
      cy.url().should("include", `search=${encodeURI(city)}`)

      cy.route("POST", "**/api/books", "fixture:books_search_page_2").as(
        "books-search-request-2",
      )
      cy.findByText(/next/i).click()

      cy.wait("@books-search-request-2")
      cy.url().should("include", "page=2")
      cy.url().should("include", `search=${encodeURI(city)}`)
    })
  })
})
