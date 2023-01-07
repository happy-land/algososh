describe("testing string component", () => {
  before(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  it("if input is empty to do disabled add button", () => {
    cy.get("button[data-testid='button']")
      .as("submitBtn")
      .contains("Развернуть");

    cy.get("input").as("input");

    cy.get("@input").clear();
    cy.get("@submitBtn").should("be.disabled");
  });

  it("string reversed correctly", () => {
    cy.clock();
    cy.visit("http://localhost:3000/recursion");

    cy.get("input").type("1234");
    cy.get("button[data-testid='button']").should("be.enabled").click();

    //find first and last value in the circles
    cy.get('p[data-testid="test-circle_value"]').first().as("firstValue");
    cy.get('p[data-testid="test-circle_value"]').last().as("lastValue");

    //find first and last circles for controll styles
    cy.get('div[class*="circle_circle"]').first().as("firstCircle");
    cy.get('div[class*="circle_circle"]').last().as("lastCircle");

    cy.get("@firstValue").contains("1");
    cy.get("@lastValue").contains("4");
    cy.get("@firstCircle").should(
      "have.css",
      "border",
      "4px solid rgb(210, 82, 225)"
    );
    cy.get("@lastCircle").should(
      "have.css",
      "border",
      "4px solid rgb(210, 82, 225)"
    );

    cy.tick(1000);
    cy.get("@firstValue").contains("4");
    cy.get("@lastValue").contains("1");
    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get('div[class*="circle_circle"]')
      .eq(2)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");

    cy.tick(1000);
    cy.get("@firstCircle").should(
      "have.css",
      "border",
      "4px solid rgb(127, 224, 81)"
    );
    cy.get("@lastCircle").should(
      "have.css",
      "border",
      "4px solid rgb(127, 224, 81)"
    );
    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get('div[class*="circle_circle"]')
      .eq(2)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get('p[data-testid="test-circle_value"]').eq(1).contains("3");
    cy.get('p[data-testid="test-circle_value"]').eq(2).contains("2");
    cy.tick(1000);
    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should("have.css", "border", "4px solid rgb(127, 224, 81)");
    cy.get('div[class*="circle_circle"]')
      .eq(2)
      .should("have.css", "border", "4px solid rgb(127, 224, 81)");
  });
});
