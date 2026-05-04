describe("Utility controls", () => {
  it("opens the desktop volume and timer controls", () => {
    cy.setDesktopViewport();
    cy.visitApp();

    cy.getByTestId("volume-trigger").click();
    cy.getByTestId("volume-popover").should("be.visible");
    cy.getByTestId("volume-slider").should("exist");
    cy.get("body").type("{esc}");

    cy.getByTestId("timer-trigger").click();
    cy.getByTestId("timer-slider").should("be.visible");
    cy.getByTestId("timer-selected-value").should("contain.text", "Off");
    cy.getByTestId("timer-slider").click("right");
    cy.press(Cypress.Keyboard.Keys.ESC);
    cy.getByTestId("timer-menu").should("not.exist");
    cy.togglePlayback();
    cy.getByTestId("practice-timer-status").should("contain.text", "left");
    cy.togglePlayback();
    cy.getByTestId("practice-timer-status").should("not.exist");
  });

  it("opens the mobile utility drawers", () => {
    cy.setMobileViewport();
    cy.visitApp();

    cy.getByTestId("volume-trigger").click();
    cy.getByTestId("volume-drawer").should("be.visible");
    cy.press(Cypress.Keyboard.Keys.ESC);
    cy.getByTestId("volume-drawer").should("not.be.visible");

    cy.getByTestId("timer-trigger").click();
    cy.getByTestId("timer-drawer").should("be.visible");
  });
});
