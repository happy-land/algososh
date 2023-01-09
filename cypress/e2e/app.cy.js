describe("app is available", () => {
  it("app should be available on localhost:3000", () => {
    cy.viewport(1400, 700);
    cy.visit("/");
  });
});
