describe("Rhythm selection", () => {
  describe("desktop rhythm menu", () => {
    beforeEach(() => {
      cy.setDesktopViewport();
      cy.visitApp();
    });

    it("changes the selected rhythm from the floating menu", () => {
      cy.selectRhythm("Triplet");
      cy.getByTestId("rhythm-current-label").should("contain.text", "Triplet");
      cy.expectSelectedRhythm("Triplet");
    });

    it("supports switching back to off", () => {
      cy.selectRhythm("Duple");
      cy.expectSelectedRhythm("Duple");

      cy.selectRhythm("Off");
      cy.getByTestId("rhythm-current-label").should("contain.text", "Off");
      cy.expectSelectedRhythm("Off");
    });

    it("opens and closes the desktop rhythm menu", () => {
      cy.openRhythmSelector();
      cy.getByTestId("rhythm-menu").should("be.visible");
      cy.closeRhythmSelector();
      cy.getByTestId("rhythm-menu").should("not.exist");
    });
  });

  describe("mobile rhythm drawer", () => {
    beforeEach(() => {
      cy.setMobileViewport();
      cy.visitApp();
    });

    it("opens the drawer and changes the selected rhythm", () => {
      cy.openRhythmSelector();
      cy.getByTestId("rhythm-drawer").should("be.visible");
      cy.getByTestId("rhythm-option-duple").click();
      cy.expectSelectedRhythm("Duple");
    });

    it("supports selecting swing from the drawer", () => {
      cy.selectRhythm("Swing");
      cy.expectSelectedRhythm("Swing");
    });

    it("closes the drawer with escape", () => {
      cy.openRhythmSelector();
      cy.getByTestId("rhythm-drawer").should("be.visible");
      cy.closeRhythmSelector();
      cy.getByTestId("rhythm-drawer").should("not.exist");
    });
  });
});
