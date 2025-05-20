describe("Settings Page - Change Password", () => {
  beforeEach(() => {
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

  it("disables submit button when new password and confirmation do not match", () => {
    cy.get('[data-testid="current-password"]').type("OldPass123!");
    cy.get('[data-testid="new-password"]').type("NewPass123!");
    cy.get('[data-testid="confirm-password"]').type("Mismatch123!");
    cy.get('[data-testid="submit-button"]').should("be.disabled");
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

  it("shows password requirement instructions", () => {
    cy.get('[data-testid="password-requirements"]').within(() => {
      cy.contains("Minimum 8 characters long");
      cy.contains("At least one lowercase character");
      cy.contains("At least one uppercase character");
      cy.contains("At least one number");
      cy.contains("At least one symbol");
    });
  });
});
