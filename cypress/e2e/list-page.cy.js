import {
  submitButton,
  circleValue,
  smallCircle,
  input,
  valueInput,
  indexInput,
  indexValue,
  circlesBorder,
} from "./constants/constants";

describe("testing list component", () => {
  before(() => {
    cy.visit("list");
  });

  it("if input is empty to do disabled add and delete buttons", () => {
    cy.get(submitButton)
      .contains("button", "Добавить в head")
      .as("addInHeadButton");
    cy.get(submitButton)
      .contains("button", "Добавить в tail")
      .as("addInTailButton");
    cy.get(submitButton)
      .contains("button", "Добавить по индексу")
      .as("addByIndexButton");
    cy.get(submitButton)
      .contains("button", "Удалить по индексу")
      .as("deleteByIndexButton");

    cy.get(input).as("input");
    cy.get("@input").clear();

    cy.get("@addInHeadButton").should("be.disabled");
    cy.get("@addInTailButton").should("be.disabled");
    cy.get("@addByIndexButton").should("be.disabled");
    cy.get("@deleteByIndexButton").should("be.disabled");
  });

  it("initial list added correctly", () => {
    cy.visit("/list");
    cy.get(circleValue).should("be.exist");
  });

  it("added and deleted in head correctly", () => {
    cy.visit("/list");
    cy.get(valueInput).as("valueInput");
    cy.get(submitButton)
      .contains("button", "Добавить в head")
      .as("addInHeadButton");
    cy.get(circleValue).as("circleValue");

    cy.get("@valueInput").type("12");
    cy.get("@addInHeadButton").click();
    cy.get("@circleValue").first().contains("12");

    cy.get(submitButton)
      .contains("button", "Удалить из head")
      .as("deleteFromHeadButton");

    cy.get("@deleteFromHeadButton").click();
    cy.get("@circleValue").first().should("not.have.value", "12");
  });

  it("added and deleted in tail correctly", () => {
    cy.visit("/list");
    cy.get(valueInput).as("valueInput");
    cy.get(submitButton)
      .contains("button", "Добавить в tail")
      .as("addInTailButton");
    cy.get(circleValue).as("circleValue");

    cy.get("@valueInput").type("12");
    cy.get("@addInTailButton").click();
    cy.get(smallCircle)
      .should("have.css", "border", circlesBorder.changing)
      .contains("12");
    cy.get("@circleValue").last().contains("12");

    cy.get(submitButton)
      .contains("button", "Удалить из tail")
      .as("deleteFromTailButton");

    cy.get("@deleteFromTailButton").click();
    cy.get("@circleValue").last().should("not.have.value", "12");
  });

  it("added by index correctly", () => {
    const byIndex = "2";
    const valueByIndex = "12";

    cy.clock();

    cy.visit("/list");
    cy.get(valueInput).as("valueInput");
    cy.get(indexInput).as("indexInput");
    cy.get(submitButton)
      .contains("button", "Добавить по индексу")
      .as("addByIndexButton");
    cy.get(circleValue).as("circleValue");
    cy.get(indexValue).as("indexValue");

    cy.get("@valueInput").type(valueByIndex);
    cy.get("@indexInput").type(byIndex);
    cy.get("@addByIndexButton").click();

    cy.tick(5000);

    cy.get("@circleValue").each((el, i) => {
      if (i.toString() === byIndex) {
        cy.wrap(el).contains(valueByIndex);
      }
    });
  });

  it("deleted by index correctly", () => {
    const byIndex = "2";

    cy.clock();

    cy.visit("/list");
    cy.get(indexInput).as("indexInput");
    cy.get(submitButton)
      .contains("button", "Удалить по индексу")
      .as("deleteByIndexButton");
    cy.get(circleValue).as("circleValue");
    cy.get(indexValue).as("indexValue");

    cy.get("@indexInput").type(byIndex);
    cy.get("@deleteByIndexButton").click();

    cy.tick(3500);

    cy.get("@circleValue").each((el, i) => {
      if (i.toString() === byIndex) {
        cy.wrap(el).should("not.have.value");
      }
    });
  });
});
