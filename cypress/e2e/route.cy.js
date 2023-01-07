describe("routing in app is correctly working", () => {
  before(() => {
    cy.viewport(1400, 900);
    cy.visit("http://localhost:3000");
  });

  it("should open start page by default", () => {
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });

  it("should open all pages after click on ancors", () => {
    cy.visit("http://localhost:3000");
    cy.get("a").each((page) => {
      cy.request(page.prop("href"));
    });
  });
});
