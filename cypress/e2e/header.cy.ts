describe("Home Page Header Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("When user is NOT logged in", () => {
    beforeEach(() => {
      window.localStorage.removeItem("authToken");
      window.localStorage.removeItem("user-storage");
      cy.visit("/");
    });

    it("shows navigation links: Home, Pricing, Features, Contact, Login, and Sign up", () => {
      cy.get("[data-testid='header-home-link']").should("exist");
      cy.get("[data-testid='header-pricing-link']").should("exist");
      cy.get("[data-testid='header-features-link']").should("exist");
      cy.get("[data-testid='header-contact-link']").should("exist");
      cy.get("[data-testid='header-login-link']").should("exist");
      cy.get("[data-testid='header-signup-link']").should("exist");
    });

    it("does NOT show Dashboard and Logout buttons", () => {
      cy.get("[data-testid='header-dashboard-link']").should("not.exist");
      cy.get("[data-testid='header-logout-link']").should("not.exist");
    });

    it("navigates to login and register pages", () => {
      cy.get("[data-testid='header-login-link']").click();
      cy.url().should("include", "/login");

      cy.visit("/");
      cy.get("[data-testid='header-signup-link']").click();
      cy.url().should("include", "/register");
    });
  });

  context("When user IS logged in", () => {
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
    });

    it("shows Dashboard and Logout, but hides Login and Sign up", () => {
      cy.get("[data-testid='header-dashboard-link']").should("exist");
      cy.get("[data-testid='header-logout-link']").should("exist");

      cy.get("[data-testid='header-login-link']").should("not.exist");
      cy.get("[data-testid='header-signup-link']").should("not.exist");
    });

    it("navigates to dashboard when clicking Dashboard", () => {
      cy.get("[data-testid='header-dashboard-link']").click();
      cy.url().should("include", "/dashboard");
    });

    it("logs out the user when clicking Logout", () => {
      cy.get("[data-testid='header-logout-link']").click();
      cy.url().should("eq", `${Cypress.config().baseUrl}/`);
      cy.get("[data-testid='header-login-link']").should("exist");
      cy.get("[data-testid='header-dashboard-link']").should("not.exist");
    });
  });

  context("Mobile navigation menu", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
    });

    it("opens dropdown menu and shows correct links when NOT logged in", () => {
      window.localStorage.removeItem("authToken");
      cy.visit("/");
      cy.get('[data-testid="mobile-menu-toggle"]').click();

      cy.get("[data-testid='mobile-header-home-link']").should("exist");
      cy.get("[data-testid='mobile-header-pricing-link']").should("exist");
      cy.get("[data-testid='mobile-header-features-link']").should("exist");
      cy.get("[data-testid='mobile-header-contact-link']").should("exist");
      cy.get("[data-testid='mobile-header-login-link']").should("exist");
      cy.get("[data-testid='mobile-header-signup-link']").should("exist");
    });

    it("shows Dashboard and Logout in dropdown when logged in", () => {
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

      cy.get('[data-testid="mobile-menu-toggle"]').click();
      cy.get("[data-testid='mobile-header-dashboard-link']").should("exist");
      cy.get("[data-testid='mobile-header-logout-link']").should("exist");
    });
  });
});
