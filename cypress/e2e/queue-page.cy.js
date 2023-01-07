describe("testing queue component", () => {
  before(() => {
    cy.visit("http://localhost:3000/queue");
  });

  it("if input is empty to do disabled add button", () => {
    cy.get("button[data-testid='button']").as("submitBtn").contains("Добавить");

    cy.get("input").as("input");

    cy.get("@input").clear();
    cy.get("@submitBtn").should("be.disabled");
  });

  it("elements added correctly", () => {
    cy.clock();
    cy.visit("http://localhost:3000/queue");
    cy.get("button[data-testid='button']").contains("Добавить").as("submitBtn");
    cy.get("input").as("input");

    cy.get("@input").type("12");
    cy.get("@submitBtn").click();

    cy.get('div[class*="circle_circle"]').should(
      "have.css",
      "border",
      "4px solid rgb(210, 82, 225)"
    );
    cy.get('p[data-testid="test-circle_value"]').contains("12");
    cy.get('div[data-testid="test-circle_head"]').contains("head");
    cy.get('div[data-testid="test-circle_tail"]').contains("tail");

    cy.tick(1000);
    cy.get('div[class*="circle_circle"]').should(
      "have.css",
      "border",
      "4px solid rgb(0, 50, 255)"
    );
  });

  it("element deleted correctly", () => {
    cy.clock();
    cy.visit("http://localhost:3000/queue");
    cy.get("button[data-testid='button']").contains("Добавить").as("submitBtn");
    cy.get("button[data-testid='button']").contains("Удалить").as("deleteBtn");
    cy.get("input").as("input");

    cy.get("@input").type("12");
    cy.get("@submitBtn").click();

    cy.get('div[class*="circle_circle"]').should(
      "have.css",
      "border",
      "4px solid rgb(210, 82, 225)"
    );
    cy.get('p[data-testid="test-circle_value"]').contains("12");
    cy.get('div[data-testid="test-circle_head"]')
      .contains("head")
      .should("be.exist");
    cy.get('div[data-testid="test-circle_tail"]')
      .contains("tail")
      .should("be.exist");

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
    cy.get('div[data-testid="test-circle_head"]').should("not.contain", "head");
    cy.get('div[data-testid="test-circle_tail"]').should("not.contain", "tail");
    cy.get('p[data-testid="test-circle_value"]').should("not.contain", "12");
  });

  it("queue cleared correctly", () => {
    cy.visit("http://localhost:3000/queue");
    cy.get("button[data-testid='button']").contains("Очистить").as("clearBtn");
    cy.get("button[data-testid='button']").contains("Добавить").as("submitBtn");
    cy.get("input").as("input");

    cy.get("@input").type("12");
    cy.get("@submitBtn").click();

    cy.get("@input").type("23");
    cy.get("@submitBtn").click();

    cy.get('p[data-testid="test-circle_value"]').should((array) => {
      const length = [...array].filter((i) => i.innerHTML !== "").length;
      expect(length).to.eq(2);
    });

    cy.get("@clearBtn").click();

    cy.get('p[data-testid="test-circle_value"]').should((array) => {
      const lengthOfArr = [...array].filter((i) => i.innerHTML !== "").length;
      expect(lengthOfArr).to.eq(0);
    });
  });
});
