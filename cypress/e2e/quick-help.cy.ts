describe("Quick help", () => {
  beforeEach(() => {
    cy.setDesktopViewport();
    cy.visitApp();
  });

  describe("about dialog", () => {
    it("opens the about dialog content", () => {
      cy.openQuickHelp();
      cy.getByTestId("quick-help-dialog").should("be.visible");
      cy.getByTestId("quick-help-dialog").should("contain.text", "About & Help");
      cy.getByTestId("quick-help-dialog").should("contain.text", "Our Story");
      cy.getByTestId("quick-help-dialog").should("contain.text", "Quick Start");
      cy.getByTestId("quick-help-dialog").should("contain.text", "Made with Heart");
      cy.getByTestId("quick-help-dialog").should("contain.text", "Issues");
      cy.getByTestId("quick-help-dialog").should("contain.text", "Feedback");
    });

    it("closes the dialog when pressing the close button", () => {
      cy.openQuickHelp();
      cy.getByTestId("quick-help-dialog").should("be.visible");

      cy.getByTestId("quick-help-close").click();
      cy.getByTestId("quick-help-dialog").should("not.exist");
    });
  });
});
