describe("Meter selection", () => {
  describe("desktop meter chips", () => {
    beforeEach(() => {
      cy.setDesktopViewport();
      cy.visitApp();
    });

    it("changes the selected taal from the chip row", () => {
      cy.selectTaal("Dadra");
      cy.expectSelectedTaal("Dadra");

      cy.selectTaal("Jhaptal");
      cy.expectSelectedTaal("Jhaptal");
    });

    it("opens custom meter inputs", () => {
      cy.openCustomMeter();
      cy.getByTestId("custom-meter-beats").should("be.visible");
      cy.getByTestId("custom-meter-unit").should("be.visible");
      cy.getByTestId("custom-meter-label").should("contain.text", "Custom");
    });

    it("updates custom meter values on desktop", () => {
      cy.setCustomMeter(9, 8);
      cy.expectCustomMeterValues(9, 8);
    });
  });

  describe("mobile meter select", () => {
    beforeEach(() => {
      cy.setMobileViewport();
      cy.visitApp();
    });

    it("shows the default mobile taal and notation caption", () => {
      cy.expectSelectedTaal("Teental");
      cy.getByTestId("mobile-meter-caption").should("contain.text", "16/4");
    });

    it("changes the selected taal from the mobile dropdown", () => {
      cy.selectTaal("Rupak");
      cy.expectSelectedTaal("Rupak");
      cy.getByTestId("mobile-meter-caption").should("contain.text", "7/4");
    });

    it("opens custom meter inputs from the mobile dropdown", () => {
      cy.openCustomMeter();
      cy.getByTestId("custom-meter-beats").should("be.visible");
      cy.getByTestId("custom-meter-unit").should("be.visible");
    });

    it("updates custom meter values on mobile", () => {
      cy.setCustomMeter(5, 8);
      cy.expectCustomMeterValues(5, 8);
    });
  });
});
