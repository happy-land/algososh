describe("testing string component", () => {
  before(() => {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("if input is empty to do disabled add button", () => {
    cy.get("button[data-testid='button']")
      .as("submitBtn")
      .contains("Рассчитать");

    cy.get("input").as("input");

    cy.get("@input").clear();
    cy.get("@submitBtn").should("be.disabled");
  });

  it("sequence of numbers generated correctly", () => {
    cy.clock();
    cy.visit("http://localhost:3000/fibonacci");
    const fibonacciArray = [0, 1, 1, 2];

    cy.get("input").type(String(fibonacciArray.length - 1));
    cy.get("button[data-testid='button']").should("be.enabled").click();

    cy.tick(6000);
    cy.get('p[data-testid="test-circle_value"]')
      .should("have.length", fibonacciArray.length)
      .each((el, index) => {
        cy.wrap(el).contains(fibonacciArray[index]);
      });
  });
});
