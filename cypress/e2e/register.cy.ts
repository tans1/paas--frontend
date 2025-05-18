describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should display all input fields and register button", () => {
    cy.contains("Join Us Today");
    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('button[type="submit"]').contains("Register Now");
    cy.get('input[type="checkbox"][id="terms"]').should("exist");
  });

  it("should show validation errors for invalid input", () => {
    cy.get('input[name="name"]').type("A");
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('input[name="password"]').type("123");

    // Blur fields to trigger validation
    cy.get('input[name="password"]').blur();

    cy.contains(
      "Name must be at least 2 characters long and contain only letters."
    ).should("be.visible");
    cy.contains("Invalid email format.").should("be.visible");
    cy.contains(
      "Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 symbol."
    ).should("be.visible");
  });

  it("should enable register button only if form is valid and terms are checked", () => {
    cy.get('input[name="name"]').type("Alice");
    cy.get('input[name="email"]').type("alice@example.com");
    cy.get('input[name="password"]').type("Strong@123");

    cy.get('button[type="submit"]').should("be.disabled");

    cy.get("#terms").check();
    cy.get('button[type="submit"]').should("not.be.disabled");
  });

  it("should submit form and redirect to login page on success", () => {
    // Intercept the API call and mock success response
    cy.intercept("POST", `${Cypress.env("VITE_BACK_END_URL")}/auth/signup`, {
      statusCode: 201,
      body: { message: "Signup successful" },
    }).as("signup");

    cy.get('input[name="name"]').type("TestUser");
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("Password@123");
    cy.get("#terms").check();
    cy.get('button[type="submit"]').click();

    cy.wait("@signup");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Registration successful!");
    });

    cy.url().should("include", "/login");
  });

  it("should show error alert on API failure", () => {
    cy.intercept("POST", `${Cypress.env("VITE_BACK_END_URL")}/auth/signup`, {
      statusCode: 500,
      body: { error: "Signup failed" },
    }).as("signupFail");

    cy.get('input[name="name"]').type("FailUser");
    cy.get('input[name="email"]').type("fail@example.com");
    cy.get('input[name="password"]').type("Fail@1234");
    cy.get("#terms").check();
    cy.get('button[type="submit"]').click();

    cy.wait("@signupFail");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Signup failed. Please try again.");
    });
  });
});
