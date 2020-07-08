describe("visible content", () => {
  before(() => cy.visit("/"))
  it("loads the app", () => {
    cy.get("#root").should("be.visible")
  })

  it("begin exploring books from welcome screen", () => {
    cy.get("#root")
      .within(() => cy.findByText(/explore/i))
      .click()

    cy.url().should("include", "explore")
  })
})
