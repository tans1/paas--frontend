describe("Register Page", () => {
  const backendUrl = "http://127.0.0.1:3000";

  beforeEach(() => {
    cy.visit("/register");
  });

  it("renders the register form", () => {
    cy.get("[data-testid='register-header']").should(
      "contain",
      "Create Account"
    );
    cy.get("[data-testid='name-input']").should("exist");
    cy.get("[data-testid='email-input']").should("exist");
    cy.get("[data-testid='password-input']").should("exist");
    cy.get("[data-testid='terms-checkbox']").should("exist");
    cy.get("[data-testid='submit-button']").should("be.disabled");
  });

  it("shows errorfor invalid email format", () => {
    cy.get("[data-testid='name-input']").type("Yared");
    cy.get("[data-testid='email-input']").type("invalid-email");
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
    cy.get('[data-testid="password-input"]').type("@Yared123");
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
    cy.get('[data-testid="password-input"]')
      .parent()
      .parent()
      .find("button")
      .click();
    cy.get('[data-testid="password-input"]').should(
      "have.attr",
      "type",
      "password"
    );
  });

  it("disables submit button with invalid email", () => {
    cy.get('[data-testid="email-input"]').type("invalid-email");
    cy.get('[data-testid="password-input"]').type("@Yared123");
    cy.get('[data-testid="terms-checkbox"]').check();
    cy.get('[data-testid="submit-button"]').should("be.disabled");
  });

  it("disables submit button with invalid password", () => {
    cy.get('[data-testid="email-input"]').type("yared@gmail.com");
    cy.get('[data-testid="password-input"]').type("weak");
    cy.get('[data-testid="terms-checkbox"]').check();
    cy.get('[data-testid="submit-button"]').should("be.disabled");
  });

  it("disables submit button if check box is not checked", () => {
    cy.get('[data-testid="email-input"]').type("yared@gmail.com");
    cy.get('[data-testid="password-input"]').type("@Yared123");
    cy.get('[data-testid="terms-checkbox"]').should("not.be.checked");
    cy.get('[data-testid="submit-button"]').should("be.disabled");
  });

  it("successfully registers a new user", () => {
    cy.intercept("POST", `**/auth/signup`, {
      statusCode: 201,
      body: {
        id: 2,
        name: "yared",
        email: "yaredbtgs@gmail.com",
        password: "hashed-password",
        role: null,
        githubUsername: "YaredBT",
        githubAccessToken: "some_token",
        createdAt: "2025-05-19T06:41:36.912Z",
      },
    }).as("registerRequest");

    cy.get("[data-testid='name-input']").type("Yared");
    cy.get("[data-testid='email-input']").type("yaredbtgs@gmail.com");
    cy.get("[data-testid='password-input']").type("@Yared123");
    cy.get("[data-testid='terms-checkbox']").check();
    cy.get("[data-testid='submit-button']").click();

    cy.wait("@registerRequest").then((interception) => {
      expect(interception.request.body).to.include({
        name: "Yared",
        email: "yaredbtgs@gmail.com",
        password: "@Yared123",
      });
    });

    cy.url().should("include", "/login", { timeout: 10000 });
    cy.get('[data-testid="login-heading"]').should("exist");
  });
});
