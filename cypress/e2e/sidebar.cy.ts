describe("Sidebar Navigation", () => {
  beforeEach(() => {
    window.localStorage.setItem("authToken", "mocked-jwt-token");
    cy.visit("/dashboard");
  });

  it("navigates to Dashboard page", () => {
    cy.get('[data-testid="sidebar-link-dashboard"]').click();
    cy.url().should("include", "/dashboard");
  });

  it("navigates to All Projects page", () => {
    cy.get('[data-testid="sidebar-link-all-projects"]').click();
    cy.url().should("include", "/dashboard/projects");
    cy.contains("All Projects").should("exist"); // Adjust to a heading on the ProjectsList page
  });

  it("navigates to Add Project page", () => {
    cy.get('[data-testid="sidebar-link-add-project"]').click();
    cy.url().should("include", "/dashboard/project/add");
    cy.contains("Add Project").should("exist"); // Adjust to a heading on the AddProject page
  });

  it("navigates to Settings page", () => {
    cy.get('[data-testid="sidebar-link-settings"]').click();
    cy.url().should("include", "/settings/profile");
    cy.contains("General Settings").should("exist"); // Adjust if your settings page uses a different heading
  });

  it("navigates to Billings page", () => {
    cy.get('[data-testid="sidebar-link-billings"]').click();
    cy.url().should("include", "/billing"); // This confirms that it didn’t navigate away
  });
});
