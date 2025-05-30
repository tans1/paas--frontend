// cypress/e2e/project-list.cy.ts
describe("Project List Page", () => {
  beforeEach(() => {
    const userStorageState = {
      state: {
        isAuthenticated: true,
        user: {
          id: 2,
          name: "yared",
          email: "yaredbtgs@gmail.com",
          githubUsername: "YaredBT",
          githubAccessToken: "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",
        },
      },
    };

    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("authToken", "mocked-jwt-token");
        win.localStorage.setItem(
          "user-storage",
          JSON.stringify(userStorageState)
        );
      },
    });

    cy.intercept("GET", "/projects/my-projects", {
      fixture: "projects.json",
    }).as("getProjects");
    cy.visit("/dashboard/projects");
    cy.wait("@getProjects");
  });

  it("should render the page title and search input", () => {
    cy.get('[data-testid="project-list-page"]').should("exist");
    cy.contains("All Projects").should("exist");
    cy.get('[data-testid="project-search-input"]').should("exist");
  });

  it("should render all project cards", () => {
    cy.get('[data-testid="project-cards-grid"]')
      .children()
      .should("have.length.greaterThan", 0);
    cy.contains("Meal_Searching_Web").should("exist");
    cy.contains("addis_software_frontend").should("exist");
  });

  it("should filter projects based on search input", () => {
    cy.get('[data-testid="project-search-input"]').type("meal");
    cy.contains("Meal_Searching_Web").should("exist");
    cy.contains("addis_software_frontend").should("not.exist");

    cy.get('[data-testid="project-search-input"]').clear().type("addis");
    cy.contains("addis_software_frontend").should("exist");
    cy.contains("Meal_Searching_Web").should("not.exist");
  });

  it("should navigate to the add project page when button is clicked", () => {
    cy.get('[data-testid="add-project-button"]').click();
    cy.url().should("include", "/dashboard/project/add");
  });

  it("should navigate to /dashboard/project/details/branch/id when a project name is clicked", () => {
    cy.wait(1000); // wait for cards to render

    // Click the project name text directly
    cy.contains("Meal_Searching_Web").click();

    // Assert the correct navigation
    cy.url().should("include", "/dashboard/project/details/main/707662528");
  });
});
