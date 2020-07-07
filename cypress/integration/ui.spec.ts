describe("first tests", () => {
  it("loads the app", () => {
    cy.visit("/")
    cy.get("#root").should("be.visible")
  })
})
