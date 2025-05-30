describe("Login Page", () => {
  const backendUrl = "http://localhost:3000";

  beforeEach(() => {
    cy.visit("/login");
  });

  it("renders the login form", () => {
    cy.get('[data-testid="login-heading"]').should("contain", "Welcome Back");
    cy.get('[data-testid="email-input"]').should("exist");
    cy.get('[data-testid="password-input"]').should("exist");
    cy.get('[data-testid="submit-button"]').should("exist");
  });

  it("shows error for invalid email format", () => {
    cy.get('[data-testid="email-input"]').type("invalid-email");
    cy.get('[data-testid="email-input"]')
      .parent()
      .parent()
      .find("p")
      .should("contain", "Invalid email format.");
  });

  it("shows error for invalid password format", () => {
    cy.get('[data-testid="password-input"]').type("weak");
    cy.get('[data-testid="password-input"]')
      .parent()
      .parent()
      .find("p")
      .should(
        "contain",
        "Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 symbol."
      );
  });

  it("toggles password visibility", () => {
    cy.get('[data-testid="password-input"]').should(
      "have.attr",
      "type",
      "password"
    );
    cy.get('[data-testid="password-input"]')
      .parent()
      .parent()
      .find("button")
      .click();
    cy.get('[data-testid="password-input"]').should(
      "have.attr",
      "type",
      "text"
    );
  });

  it("disables submit button with invalid email", () => {
    cy.get('[data-testid="email-input"]').type("invalid-email");
    cy.get('[data-testid="password-input"]').type("Strong@123");
    cy.get('[data-testid="checkbox-remember"]').check();
    cy.get('[data-testid="submit-button"]').should("be.disabled");
  });

  it("disables submit button with invalid password", () => {
    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="password-input"]').type("weak");
    cy.get('[data-testid="checkbox-remember"]').check();
    cy.get('[data-testid="submit-button"]').should("be.disabled");
  });

  it("enables submit button when form is valid", () => {
    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="password-input"]').type("Strong@123");
    cy.get('[data-testid="checkbox-remember"]').check();
    cy.get('[data-testid="submit-button"]').should("not.be.disabled");
  });

  it("redirects to /register on clicking sign up link", () => {
    cy.get('[data-testid="link-register"]').click();
    cy.url().should("include", "/register");
  });

  it("redirects to Google OAuth when Google button clicked", () => {
    cy.get('[data-testid="oauth-google"]')
      .should("have.attr", "href")
      .and("include", "/oauth/google");
  });

  it("redirects to GitHub OAuth when GitHub button clicked", () => {
    cy.get('[data-testid="oauth-github"]')
      .should("have.attr", "href")
      .and("include", "/oauth/github");
  });

  it("shows loading state during login attempt", () => {
    cy.intercept("POST", `${backendUrl}/auth/login`, {
      delay: 1000,
      statusCode: 200,
      body: { access_token: "fake-token" },
    }).as("loginRequest");

    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="password-input"]').type("Strong@123");
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="submit-button"]').should("contain", "Signing in...");
    cy.get('[data-testid="submit-button"]').should("be.disabled");
  });

  it("handles network error gracefully", () => {
    cy.intercept("POST", `${backendUrl}/auth/login`, {
      forceNetworkError: true,
    }).as("loginRequest");

    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="password-input"]').type("Strong@123");
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="login-error"]').should(
      "contain",
      "Login failed, please try again."
    );
  });

  it("redirects to dashboard after successful login", () => {
    cy.intercept("POST", `${backendUrl}/auth/login`, {
      statusCode: 200,
      body: {
        access_token: "fake-access-token",
      },
    }).as("loginRequest");

    cy.get('[data-testid="email-input"]').type("yaredbtgs@gmail.com");
    cy.get('[data-testid="password-input"]').type("@Yared123");
    cy.get('[data-testid="submit-button"]').click();

    cy.wait("@loginRequest").then((interception) => {
      expect(interception.request.body).to.include({
        email: "yaredbtgs@gmail.com",
        password: "@Yared123",
      });
    });

    cy.url().should("include", "/dashboard");
  });
});
