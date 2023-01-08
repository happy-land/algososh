import {
  submitButton,
  circleValue,
  mainCircle,
  input,
  head,
  tail,
  circlesBorder,
} from "./constants/constants";

describe("testing queue component", () => {
  before(() => {
    cy.visit("/queue");
  });

  it("if input is empty to do disabled add button", () => {
    cy.get(submitButton).as("submitBtn").contains("Добавить");

    cy.get(input).as("input");

    cy.get("@input").clear();
    cy.get("@submitBtn").should("be.disabled");
  });

  it("elements added correctly", () => {
    cy.clock();
    cy.visit("/queue");
    cy.get(submitButton).contains("Добавить").as("submitBtn");
    cy.get(input).as("input");

    cy.get("@input").type("12");
    cy.get("@submitBtn").click();

    cy.get(mainCircle).should("have.css", "border", circlesBorder.changing);
    cy.get(circleValue).contains("12");
    cy.get(head).contains("head");
    cy.get(tail).contains("tail");

    cy.tick(1000);
    cy.get(mainCircle).should("have.css", "border", circlesBorder.default);
  });

  it("element deleted correctly", () => {
    cy.clock();
    cy.visit("/queue");
    cy.get(submitButton).contains("Добавить").as("submitBtn");
    cy.get(submitButton).contains("Удалить").as("deleteBtn");
    cy.get(input).as("input");

    cy.get("@input").type("12");
    cy.get("@submitBtn").click();

    cy.get(mainCircle).should("have.css", "border", circlesBorder.changing);
    cy.get(circleValue).contains("12");
    cy.get(head).contains("head").should("be.exist");
    cy.get(tail).contains("tail").should("be.exist");

    cy.tick(1000);
    cy.get(mainCircle).should("have.css", "border", circlesBorder.default);
    cy.get("@deleteBtn").click();
    cy.get(mainCircle).should("have.css", "border", circlesBorder.changing);

    cy.tick(1000);
    cy.get(head).should("not.contain", "head");
    cy.get(tail).should("not.contain", "tail");
    cy.get(circleValue).should("not.contain", "12");
  });

  it("queue cleared correctly", () => {
    cy.visit("/queue");
    cy.get(submitButton).contains("Очистить").as("clearBtn");
    cy.get(submitButton).contains("Добавить").as("submitBtn");
    cy.get(input).as("input");

    cy.get("@input").type("12");
    cy.get("@submitBtn").click();

    cy.get("@input").type("23");
    cy.get("@submitBtn").click();

    cy.get(circleValue).should((array) => {
      const length = [...array].filter((i) => i.innerHTML !== "").length;
      expect(length).to.eq(2);
    });

    cy.get("@clearBtn").click();

    cy.get(circleValue).should((array) => {
      const lengthOfArr = [...array].filter((i) => i.innerHTML !== "").length;
      expect(lengthOfArr).to.eq(0);
    });
  });
});
