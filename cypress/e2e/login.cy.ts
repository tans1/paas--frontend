describe("Login Page", () => {
  const backendUrl =
    Cypress.env("VITE_BACK_END_URL") || "http://localhost:8000";

  beforeEach(() => {
    cy.visit("/login");
  });

  it("renders the login form", () => {
    cy.get("[data-testid='login-form']").should("exist");
    cy.get("[data-testid='input-email']").should("exist");
    cy.get("[data-testid='input-password']").should("exist");
    cy.get("[data-testid='submit-button']").should("exist");
  });

  it("shows validation errors for invalid input", () => {
    cy.get("[data-testid='input-email']").type("invalid-email");
    cy.get("[data-testid='input-password']").type("123");

    cy.get("[data-testid='submit-button']").click();

    cy.get("[data-testid='input-email-error']")
      .should("contain", "Invalid email format");

    cy.get("[data-testid='input-password-error']")
      .should("contain", "Password must be at least 8 characters");
  });

  it("submits form with valid credentials and redirects", () => {
    // Stub the login API response
    cy.intercept("POST", "/api/auth/login", {
      statusCode: 200,
      body: {
        access_token: "mocked_token",
      },
    }).as("loginRequest");

    cy.get("[data-testid='input-email']").type("test@example.com");
    cy.get("[data-testid='input-password']").type("Password123!");

    cy.get("[data-testid='submit-button']").click();

    cy.wait("@loginRequest").its("request.body").should("deep.equal", {
      email: "test@example.com",
      password: "Password123!",
    });

    cy.url().should("include", "/dashboard");
  });

  it("shows an error message on failed login", () => {
    cy.intercept("POST", `${backendUrl}/auth/login`, {
      statusCode: 401,
      body: {
        message: "Invalid credentials",
      },
    }).as("loginFailed");

    cy.get("[data-testid='input-email']").type("wrong@example.com");
    cy.get("[data-testid='input-password']").type("WrongPassword!");

    cy.get("[data-testid='submit-button']").click();

    cy.wait("@loginFailed");

    cy.get("[data-testid='login-error']").should(
      "contain",
      "Invalid credentials"
    );
  });

  it("can toggle password visibility", () => {
    cy.get("[data-testid='input-password']").type("Secret123!");
    cy.get("[data-testid='toggle-password-visibility']").click();
    cy.get("[data-testid='input-password']").should("have.attr", "type", "text");
  });

  it("navigates to register page on click", () => {
    cy.get("[data-testid='link-register']").click();
    cy.url().should("include", "/register");
  });
});

