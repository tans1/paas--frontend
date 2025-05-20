describe("User Registration Flow", () => {
  const testUser = {
    name: "TestUser",
    email: `testuser${Date.now()}@example.com`,
    password: "Test@1234",
  };

  beforeEach(() => {
    cy.visit("http://localhost:5173/register");
  });

  it("should display validation errors for empty form", () => {
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="input-name"]')
      .parent()
      .should("contain", "Name must be at least");
    cy.get('[data-testid="input-email"]')
      .parent()
      .should("contain", "Invalid email");
    cy.get('[data-testid="input-password"]')
      .parent()
      .should("contain", "Password must be");
  });

  it("should disable submit button if terms are not checked", () => {
    cy.get('[data-testid="input-name"]').type(testUser.name);
    cy.get('[data-testid="input-email"]').type(testUser.email);
    cy.get('[data-testid="input-password"]').type(testUser.password);

    cy.get('[data-testid="submit-button"]').should("be.disabled");
  });

  it("should enable submit button and successfully register user", () => {
    cy.get('[data-testid="input-name"]').type(testUser.name);
    cy.get('[data-testid="input-email"]').type(testUser.email);
    cy.get('[data-testid="input-password"]').type(testUser.password);

    cy.get('[data-testid="checkbox-terms"]').check();
    cy.get('[data-testid="submit-button"]').should("be.enabled").click();

    // You may mock the response or assert navigation
    cy.on("window:alert", (str) => {
      expect(str).to.contain("Registration successful");
    });

    cy.url().should("include", "/login");
  });

  it("should navigate to login page when clicking 'Sign in' link", () => {
    cy.get('[data-testid="link-login"]').click();
    cy.url().should("include", "/login");
  });

  it("should open Google OAuth URL", () => {
    cy.get('[data-testid="oauth-google"]')
      .should("have.attr", "href")
      .and("include", "/oauth/google");
  });

  it("should open GitHub OAuth URL", () => {
    cy.get('[data-testid="oauth-github"]')
      .should("have.attr", "href")
      .and("include", "/oauth/github");
  });
});
