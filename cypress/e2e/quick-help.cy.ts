describe("Quick help", () => {
  beforeEach(() => {
    cy.setDesktopViewport();
    cy.visitApp();
  });

  describe("help tooltip", () => {
    it("opens the quick help content", () => {
      cy.openQuickHelp();
      cy.getByTestId("quick-help-tooltip").should("contain.text", "Quick help");
      cy.getByTestId("quick-help-tooltip").should("contain.text", "Tempo slider");
      cy.getByTestId("quick-help-tooltip").should("contain.text", "Beat selector");
    });

    it("closes the tooltip when clicking away", () => {
      cy.openQuickHelp();
      cy.getByTestId("quick-help-tooltip").should("be.visible");

      cy.getByTestId("app-brand").click();
      cy.getByTestId("quick-help-tooltip").should("not.exist");
    });
  });
});
