describe("App shell", () => {
  describe("branding and default state", () => {
    it("renders the brand, default BPM, and default taal", () => {
      cy.setDesktopViewport();
      cy.visitApp();

      cy.getByTestId("app-brand").should("contain.text", "Horsenome");
      cy.expectBpm(120);
      cy.expectSelectedTaal("Teental");
    });

    it("renders the essential mobile controls", () => {
      cy.setMobileViewport();
      cy.visitApp();

      cy.getByTestId("app-brand").should("contain.text", "Horsenome");
      cy.getByTestId("mobile-meter-select").should("be.visible");
      cy.getByTestId("transport-toggle").should("be.visible");
      cy.getByTestId("rhythm-trigger").should("be.visible");
    });
  });
});
