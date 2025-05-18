describe("Login Page", () => {
  const backendUrl =
    Cypress.env("VITE_BACK_END_URL") || "http://localhost:8000";

  beforeEach(() => {
    cy.visit("/login");
  });

  it("renders login form correctly", () => {
    cy.contains("Sign In");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("shows validation error on invalid email format", () => {
    cy.get('input[name="email"]').type("invalidemail");
    cy.get('input[name="password"]').type("Valid123!");
    cy.get('button[type="submit"]').should("be.disabled");
    cy.contains("Invalid email format.").should("exist");
  });

  it("shows validation error on weak password", () => {
    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("weakpass");
    cy.get('button[type="submit"]').should("be.disabled");
    cy.contains("Password must be at least 8 characters long").should("exist");
  });

  it("logs in successfully with correct credentials", () => {
    cy.intercept("POST", `${backendUrl}/auth/login`, {
      statusCode: 200,
      body: { access_token: "fake_token" },
    }).as("loginRequest");

    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("ValidPass1!");
    cy.get('button[type="submit"]').should("not.be.disabled").click();

    cy.wait("@loginRequest");
    cy.url().should("include", "/dashboard");
  });

  it("shows error on failed login", () => {
    cy.intercept("POST", `${backendUrl}/auth/login`, {
      statusCode: 401,
      body: { message: "Invalid credentials" },
    }).as("loginFail");

    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("WrongPass!");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginFail");
    cy.contains("Invalid credentials").should("exist");
  });

  it("navigates to register page on Create account click", () => {
    cy.contains("Create account").click();
    cy.url().should("include", "/register");
  });
});
