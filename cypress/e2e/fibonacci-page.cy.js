import { submitButton, circleValue } from "./constants/constants";

describe("testing string component", () => {
  before(() => {
    cy.visit("/fibonacci");
  });

  it("if input is empty to do disabled add button", () => {
    cy.get(submitButton).as("submitBtn").contains("Рассчитать");

    cy.get("input").as("input");

    cy.get("@input").clear();
    cy.get("@submitBtn").should("be.disabled");
  });

  it("sequence of numbers generated correctly", () => {
    cy.clock();
    cy.visit("/fibonacci");
    const fibonacciArray = [0, 1, 1, 2];

    cy.get("input").type(String(fibonacciArray.length - 1));
    cy.get(submitButton).should("be.enabled").click();

    cy.tick(6000);
    cy.get(circleValue)
      .should("have.length", fibonacciArray.length)
      .each((el, index) => {
        cy.wrap(el).contains(fibonacciArray[index]);
      });
  });
});
