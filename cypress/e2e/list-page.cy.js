describe("testing list component", () => {
  before(() => {
    cy.visit("http://localhost:3000/list");
  });

  it("if input is empty to do disabled add and delete buttons", () => {
    cy.get("button[data-testid='button']")
      .contains("button", "Добавить в head")
      .as("addInHeadButton");
    cy.get("button[data-testid='button']")
      .contains("button", "Добавить в tail")
      .as("addInTailButton");
    cy.get("button[data-testid='button']")
      .contains("button", "Добавить по индексу")
      .as("addByIndexButton");
    cy.get("button[data-testid='button']")
      .contains("button", "Удалить по индексу")
      .as("deleteByIndexButton");

    cy.get("input").as("input");
    cy.get("@input").clear();

    cy.get("@addInHeadButton").should("be.disabled");
    cy.get("@addInTailButton").should("be.disabled");
    cy.get("@addByIndexButton").should("be.disabled");
    cy.get("@deleteByIndexButton").should("be.disabled");
  });

  it("initial list added correctly", () => {
    cy.visit("http://localhost:3000/list");
    cy.get('p[data-testid="test-circle_value"]').should("be.exist");
  });

  it("added and deleted in head correctly", () => {
    cy.visit("http://localhost:3000/list");
    cy.get('input[placeholder="Введите значение"]').as("valueInput");
    cy.get("button[data-testid='button']")
      .contains("button", "Добавить в head")
      .as("addInHeadButton");
    cy.get('p[data-testid="test-circle_value"]').as("circleValue");

    cy.get("@valueInput").type("12");
    cy.get("@addInHeadButton").click();
    cy.get("@circleValue").first().contains("12");

    cy.get("button[data-testid='button']")
      .contains("button", "Удалить из head")
      .as("deleteFromHeadButton");

    cy.get("@deleteFromHeadButton").click();
    cy.get("@circleValue").first().should("not.have.value", "12");
  });

  it("added and deleted in tail correctly", () => {
    cy.visit("http://localhost:3000/list");
    cy.get('input[placeholder="Введите значение"]').as("valueInput");
    cy.get("button[data-testid='button']")
      .contains("button", "Добавить в tail")
      .as("addInTailButton");
    cy.get('p[data-testid="test-circle_value"]').as("circleValue");

    cy.get("@valueInput").type("12");
    cy.get("@addInTailButton").click();
    cy.get('div[ data-testid="test-circle_wrapper"][class*="circle_small"]')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("12");
    cy.get("@circleValue").last().contains("12");

    cy.get("button[data-testid='button']")
      .contains("button", "Удалить из tail")
      .as("deleteFromTailButton");

    cy.get("@deleteFromTailButton").click();
    cy.get("@circleValue").last().should("not.have.value", "12");
  });

  it("added by index correctly", () => {
    const byIndex = "2";
    const valueByIndex = "12";

    cy.clock();

    cy.visit("http://localhost:3000/list");
    cy.get('input[placeholder="Введите значение"]').as("valueInput");
    cy.get('input[placeholder="Введите индекс"]').as("indexInput");
    cy.get("button[data-testid='button']")
      .contains("button", "Добавить по индексу")
      .as("addByIndexButton");
    cy.get('p[data-testid="test-circle_value"]').as("circleValue");
    cy.get('p[data-testid="test-circle_indexValue"]').as("indexValue");

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

    cy.visit("http://localhost:3000/list");
    cy.get('input[placeholder="Введите индекс"]').as("indexInput");
    cy.get("button[data-testid='button']")
      .contains("button", "Удалить по индексу")
      .as("deleteByIndexButton");
    cy.get('p[data-testid="test-circle_value"]').as("circleValue");
    cy.get('p[data-testid="test-circle_indexValue"]').as("indexValue");

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
