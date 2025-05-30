describe("Settings Page - Change Password", () => {
  beforeEach(() => {
    // Mock authentication token
    window.localStorage.setItem("authToken", "mocked-jwt-token");
    cy.visit("/settings/profile");
  });

  it("renders all required password fields", () => {
    cy.get('[data-testid="settings-container"]').should("exist");
    cy.get('[data-testid="change-password-title"]').should(
      "contain",
      "Change your password"
    );
    cy.get('[data-testid="current-password"]').should("exist");
    cy.get('[data-testid="new-password"]').should("exist");
    cy.get('[data-testid="confirm-password"]').should("exist");
    cy.get('[data-testid="submit-button"]').should("exist");
  });

  it("shows error for invalid new password format", () => {
    cy.get('[data-testid="current-password"]').type("weak");
    cy.get('[data-testid="current-password"]')
      .parent()
      .parent()
      .find("p")
      .should(
        "contain",
        "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 symbol, and 1 number."
      );
  });

  it("shows error for invalid new password format", () => {
    cy.get('[data-testid="new-password"]').type("weak");
    cy.get('[data-testid="new-password"]')
      .parent()
      .parent()
      .find("p")
      .should(
        "contain",
        "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 symbol, and 1 number."
      );
  });

  it("toggles password visibility for new password", () => {
    cy.get('[data-testid="new-password"]').type("@Yared123");
    cy.get('[data-testid="new-password"]').should(
      "have.attr",
      "type",
      "password"
    );
    cy.get('[data-testid="new-password"]')
      .parent()
      .parent()
      .find("button")
      .click();
    cy.get('[data-testid="new-password"]').should("have.attr", "type", "text");
    cy.get('[data-testid="new-password"]')
      .parent()
      .parent()
      .find("button")
      .click();
    cy.get('[data-testid="new-password"]').should(
      "have.attr",
      "type",
      "password"
    );
  });

  it("toggles password visibility for confirm password", () => {
    cy.get('[data-testid="confirm-password"]').type("@Yared123");
    cy.get('[data-testid="confirm-password"]').should(
      "have.attr",
      "type",
      "password"
    );
    cy.get('[data-testid="confirm-password"]')
      .parent()
      .parent()
      .find("button")
      .click();
    cy.get('[data-testid="confirm-password"]').should(
      "have.attr",
      "type",
      "text"
    );
    cy.get('[data-testid="confirm-password"]')
      .parent()
      .parent()
      .find("button")
      .click();
    cy.get('[data-testid="confirm-password"]').should(
      "have.attr",
      "type",
      "password"
    );
  });

  it("disables submit button when new password and confirmation do not match", () => {
    cy.get('[data-testid="current-password"]').type("OldPass123!");
    cy.get('[data-testid="new-password"]').type("NewPass123!");
    cy.get('[data-testid="confirm-password"]').type("Mismatch123!");

    cy.get('[data-testid="submit-button"]').should("be.disabled");
    cy.contains("Passwords do not match").should("exist");
  });

  it("disables submit button for weak new passwords", () => {
    cy.get('[data-testid="current-password"]').type("OldPass123!");
    cy.get('[data-testid="new-password"]').type("weak");
    cy.get('[data-testid="confirm-password"]').type("weak");

    cy.get('[data-testid="submit-button"]').should("be.disabled");
    cy.contains("Password must be at least 8 characters").should("exist");
  });

  it("enables submit button for valid inputs and matching passwords", () => {
    cy.get('[data-testid="current-password"]').type("OldPass123!");
    cy.get('[data-testid="new-password"]').type("NewPass123!");
    cy.get('[data-testid="confirm-password"]').type("NewPass123!");

    cy.get('[data-testid="submit-button"]').should("not.be.disabled");
  });

  it("shows password requirement instructions", () => {
    cy.get('[data-testid="password-requirements"]').within(() => {
      cy.contains("Minimum 8 characters long");
      cy.contains("At least one lowercase character");
      cy.contains("At least one uppercase character");
      cy.contains("At least one number");
      cy.contains("At least one symbol");
    });
  });

  it("logs success message if passwords match", () => {
    cy.window().then((win) => cy.stub(win.console, "log").as("consoleLog"));
    cy.get('[data-testid="current-password"]').type("OldPass123!");
    cy.get('[data-testid="new-password"]').type("NewPass123!");
    cy.get('[data-testid="confirm-password"]').type("NewPass123!");
    cy.get('[data-testid="submit-button"]').click();
    cy.get("@consoleLog").should(
      "have.been.calledWith",
      "Password changed successfully"
    );
  });
});
