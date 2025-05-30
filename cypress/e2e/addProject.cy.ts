// cypress/e2e/add_project.cy.ts

describe("AddProject Page", () => {
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

    cy.visit("/dashboard/project/add", {
      onBeforeLoad(win) {
        win.localStorage.setItem("authToken", "mocked-jwt-token");
        win.localStorage.setItem(
          "user-storage",
          JSON.stringify(userStorageState)
        );
      },
    });

    cy.intercept("GET", "/repositories/user", {
      fixture: "repositories.json",
    }).as("fetchRepos");
  });

  it("should display loading spinner initially", () => {
    cy.get("[data-testid='loading-spinner']").should("exist");
  });

  it("should load and display repositories after loading", () => {
    cy.wait(2000); // simulate delay from setTimeout
    cy.get("[data-testid='repository-table']").should("exist");
    cy.get("[data-testid='repository-list']")
      .children()
      .should("have.length.greaterThan", 0);
  });

  it("should filter repositories based on search input", () => {
    cy.wait(2000);
    cy.get("[data-testid='search-input']").type("repo1");
    cy.get("[data-testid='repository-list']")
      .children()
      .each(($repo) => {
        cy.wrap($repo).contains(/repo1/i);
      });
  });

  it("should navigate to /dashboard/deploy when a repository is clicked", () => {
    cy.wait(2000);
    cy.get("[data-testid='repository-list']").children().first().click();

    cy.url().should("include", "/dashboard/deploy");
  });

  it("should show GitHub warning if user has no GitHub connected", () => {
    window.localStorage.setItem(
      "user-storage",
      JSON.stringify({
        state: {
          user: {
            githubUsername: null,
            id: "123",
            email: "test@example.com",
          },
        },
      })
    );
    cy.visit("/dashboard/project/add");
    cy.get("[data-testid='github-warning']").should("exist");
    cy.get("[data-testid='warning-text']").should(
      "contain.text",
      "GitHub Account Required"
    );
  });
});
