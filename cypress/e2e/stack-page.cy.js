import {
  submitButton,
  circleValue,
  mainCircle,
  input,
  circlesBorder,
} from "./constants/constants";

describe("testing stack component", () => {
  before(() => {
    cy.visit("/stack");
  });

  it("if input is empty to do disabled add button", () => {
    cy.get(submitButton).as("submitBtn").contains("Добавить");

    cy.get(input).as("input");

    cy.get("@input").clear();
    cy.get("@submitBtn").should("be.disabled");
  });

  it("elements added correctly", () => {
    cy.clock();
    cy.visit("/stack");
    cy.get(submitButton).contains("Добавить").as("submitBtn");
    cy.get(input).as("input");

    cy.get("@input").type("12");
    cy.get("@submitBtn").click();

    cy.clock();
    cy.get(mainCircle).should("have.css", "border", circlesBorder.changing);
    cy.get(circleValue).contains("12");

    cy.tick(1000);
    cy.get(mainCircle).should("have.css", "border", circlesBorder.default);
  });

  it("elements deleted correctly", () => {
    cy.clock();
    cy.visit("/stack");
    cy.get(submitButton).contains("Удалить").as("deleteBtn");
    cy.get(submitButton).contains("Добавить").as("submitBtn");
    cy.get(input).as("input");

    cy.get("@input").type("12");
    cy.get("@submitBtn").click();
    cy.get(circleValue).contains("12");
    cy.get(mainCircle).should("be.exist");

    cy.tick(1000);
    cy.get(mainCircle).should("have.css", "border", circlesBorder.default);

    cy.get("@deleteBtn").click();
    cy.get(mainCircle).should("have.css", "border", circlesBorder.changing);
    cy.tick(1000);
    cy.get(mainCircle).should("not.be.exist");
  });

  it("stack cleared correctly", () => {
    cy.clock();
    cy.visit("/stack");
    cy.get(submitButton).contains("Очистить").as("clearBtn");
    cy.get(submitButton).contains("Добавить").as("submitBtn");
    cy.get(input).as("input");

    cy.get("@input").type("12");
    cy.get("@submitBtn").click();
    cy.get(circleValue).contains("12");
    cy.get(mainCircle).should("be.exist");

    cy.tick(1000);
    cy.get("@input").type("23");
    cy.get("@submitBtn").click();
    cy.get(circleValue).contains("23");
    cy.get(mainCircle).should("be.exist");

    cy.tick(1000);
    cy.get("@clearBtn").click();
    cy.get(mainCircle).should("not.be.exist");
  });
});
