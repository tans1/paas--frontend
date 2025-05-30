describe("Dashboard Page", () => {
  const backendUrl = "http://localhost:3000";

  beforeEach(() => {
    const userStorageState = {
      state: {
        isAuthenticated: true,
        user: {
          id: 2,
          name: "yared",
          email: "yaredbtgs@gmail.com",
          githubUsername: "YaredBT",
          githubAccessToken: "gho_mocked",
        },
      },
    };

    cy.intercept("GET", "/projects/my-projects", {
      fixture: "projects.json",
    }).as("getProjects");

    cy.visit("/dashboard", {
      onBeforeLoad(win) {
        win.localStorage.setItem("authToken", "mocked-jwt-token");
        win.localStorage.setItem(
          "user-storage",
          JSON.stringify(userStorageState)
        );
      },
    });

    cy.wait("@getProjects");
    cy.get('[data-testid="dashboard-page"]', { timeout: 10000 }).should(
      "exist"
    );
  });

  it("renders summary cards correctly", () => {
    cy.get('[data-testid="summary-card-projects"]').should("exist");
    cy.get('[data-testid="projects-count"]')
      .invoke("text")
      .should("match", /^\d+$/);

    cy.get('[data-testid="summary-card-active-projects"]').should("exist");
    cy.get('[data-testid="active-projects-count"]')
      .invoke("text")
      .should("match", /^\d+$/);

    cy.get('[data-testid="summary-card-max-cpu"]').should("exist");
    cy.get('[data-testid="max-cpu-value"]').should("contain", "%");
  });

  it("renders Active Projects section and table", () => {
    cy.get('[data-testid="active-projects-section"]').should("exist");
    cy.get('[data-testid="active-projects-heading"]').should(
      "contain",
      "Active Projects"
    );
    cy.get('[data-testid="projects-table"]').should("exist");
    cy.get('[data-testid^="project-row-"]').should("have.length.lte", 5);
  });

  it("navigates to All Projects when the button is clicked", () => {
    cy.get('[data-testid="all-projects-button"]').click();
    cy.url().should("include", "/dashboard/projects");
  });

  it('displays "Connect GitHub" button and triggers GitHub OAuth redirect on click', () => {
    const userStorageState = {
      state: {
        isAuthenticated: true,
        user: {
          id: 2,
          name: "yared",
          email: "yaredbtgs@gmail.com",
          // GitHub not connected
        },
      },
    };

    cy.intercept("GET", "/repositories/connect/github", {
      statusCode: 200,
      body: {
        url: "https://github.com/login/oauth/authorize?mock",
      },
    }).as("connectGithub");

    cy.visit("/dashboard", {
      onBeforeLoad(win) {
        win.localStorage.setItem("authToken", "mocked-jwt-token");
        win.localStorage.setItem(
          "user-storage",
          JSON.stringify(userStorageState)
        );
      },
    });

    cy.get('[data-testid="connect-github-button"]')
      .should("be.visible")
      .and("contain", "Connect GitHub")
      .click();

    cy.wait("@connectGithub").its("response.statusCode").should("eq", 200);
  });

  it('does not display "Connect GitHub" button when GitHub is already connected', () => {
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

    cy.visit("/dashboard", {
      onBeforeLoad(win) {
        win.localStorage.setItem("authToken", "mocked-jwt-token");
        win.localStorage.setItem(
          "user-storage",
          JSON.stringify(userStorageState)
        );
      },
    });

    cy.get("body").then(($body) => {
      const githubButton = $body.find('[data-testid="connect-github-button"]');
      expect(githubButton.length).to.equal(0);
    });
  });

  it("renders mocked project names in the table", () => {
    cy.get('[data-testid="projects-table"]').within(() => {
      cy.contains("addis_software_frontend").should("exist");
      cy.contains("Meal_Searching_Web").should("exist");
    });
  });

  it("should navigate to /dashboard/project/details/branch/id when a project name is clicked", () => {
    cy.wait(1000); // wait for cards to render

    // Click the project name text directly
    cy.contains("Meal_Searching_Web").click();

    // Assert the correct navigation
    cy.url().should("include", "/dashboard/project/details/main/707662528");
  });
});
