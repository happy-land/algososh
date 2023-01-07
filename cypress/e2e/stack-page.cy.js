describe("testing stack component", () => {
  before(() => {
    cy.visit("http://localhost:3000/stack");
  });

  it("if input is empty to do disabled add button", () => {
    cy.get("button[data-testid='button']").as("submitBtn").contains("Добавить");

    cy.get("input").as("input");

    cy.get("@input").clear();
    cy.get("@submitBtn").should("be.disabled");
  });

  it("elements added correctly", () => {
    cy.clock();
    cy.visit("http://localhost:3000/stack");
    cy.get("button[data-testid='button']").contains("Добавить").as("submitBtn");
    cy.get("input").as("input");

    cy.get("@input").type("12");
    cy.get("@submitBtn").click();

    cy.clock();
    cy.get('div[class*="circle_circle"]').should(
      "have.css",
      "border",
      "4px solid rgb(210, 82, 225)"
    );
    cy.get('p[data-testid="test-circle_value"]').contains("12");

    cy.tick(1000);
    cy.get('div[class*="circle_circle"]').should(
      "have.css",
      "border",
      "4px solid rgb(0, 50, 255)"
    );
  });

  it("elements deleted correctly", () => {
    cy.clock();
    cy.visit("http://localhost:3000/stack");
    cy.get("button[data-testid='button']").contains("Удалить").as("deleteBtn");
    cy.get("button[data-testid='button']").contains("Добавить").as("submitBtn");
    cy.get("input").as("input");

    cy.get("@input").type("12");
    cy.get("@submitBtn").click();
    cy.get('p[data-testid="test-circle_value"]').contains("12");
    cy.get('div[class*="circle_circle"]').should("be.exist");

    cy.tick(1000);
    cy.get('div[class*="circle_circle"]').should(
      "have.css",
      "border",
      "4px solid rgb(0, 50, 255)"
    );

    cy.get("@deleteBtn").click();
    cy.get('div[class*="circle_circle"]').should(
      "have.css",
      "border",
      "4px solid rgb(210, 82, 225)"
    );
    cy.tick(1000);
    cy.get('div[class*="circle_circle"]').should("not.be.exist");
  });

  it("stack cleared correctly", () => {
    cy.clock();
    cy.visit("http://localhost:3000/stack");
    cy.get("button[data-testid='button']").contains("Очистить").as("clearBtn");
    cy.get("button[data-testid='button']").contains("Добавить").as("submitBtn");
    cy.get("input").as("input");

    cy.get("@input").type("12");
    cy.get("@submitBtn").click();
    cy.get('p[data-testid="test-circle_value"]').contains("12");
    cy.get('div[class*="circle_circle"]').should("be.exist");

    cy.tick(1000);
    cy.get("@input").type("23");
    cy.get("@submitBtn").click();
    cy.get('p[data-testid="test-circle_value"]').contains("23");
    cy.get('div[class*="circle_circle"]').should("be.exist");

    cy.tick(1000);
    cy.get("@clearBtn").click();
    cy.get('div[class*="circle_circle"]').should("not.be.exist");
  });
});
