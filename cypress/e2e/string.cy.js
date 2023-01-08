import {
  submitButton,
  circleValue,
  mainCircle,
  input,
  circlesBorder,
} from "./constants/constants";

describe("testing string component", () => {
  before(() => {
    cy.visit("/recursion");
  });

  it("if input is empty to do disabled add button", () => {
    cy.get(submitButton).as("submitBtn").contains("Развернуть");

    cy.get(input).as("input");

    cy.get("@input").clear();
    cy.get("@submitBtn").should("be.disabled");
  });

  it("string reversed correctly", () => {
    cy.clock();
    cy.visit("/recursion");

    cy.get(input).type("1234");
    cy.get(submitButton).should("be.enabled").click();

    //find first and last value in the circles
    cy.get(circleValue).first().as("firstValue");
    cy.get(circleValue).last().as("lastValue");

    //find first and last circles for controll styles
    cy.get(mainCircle).first().as("firstCircle");
    cy.get(mainCircle).last().as("lastCircle");

    cy.get("@firstValue").contains("1");
    cy.get("@lastValue").contains("4");
    cy.get("@firstCircle").should("have.css", "border", circlesBorder.changing);
    cy.get("@lastCircle").should("have.css", "border", circlesBorder.changing);

    cy.tick(1000);
    cy.get("@firstValue").contains("4");
    cy.get("@lastValue").contains("1");
    cy.get(mainCircle)
      .eq(1)
      .should("have.css", "border", circlesBorder.default);
    cy.get(mainCircle)
      .eq(2)
      .should("have.css", "border", circlesBorder.default);

    cy.tick(1000);
    cy.get("@firstCircle").should("have.css", "border", circlesBorder.modified);
    cy.get("@lastCircle").should("have.css", "border", circlesBorder.modified);
    cy.get(mainCircle)
      .eq(1)
      .should("have.css", "border", circlesBorder.changing);
    cy.get(mainCircle)
      .eq(2)
      .should("have.css", "border", circlesBorder.changing);
    cy.get(circleValue).eq(1).contains("3");
    cy.get(circleValue).eq(2).contains("2");
    cy.tick(1000);
    cy.get(mainCircle)
      .eq(1)
      .should("have.css", "border", circlesBorder.modified);
    cy.get(mainCircle)
      .eq(2)
      .should("have.css", "border", circlesBorder.modified);
  });
});
