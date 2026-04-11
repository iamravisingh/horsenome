describe("Transport controls", () => {
  beforeEach(() => {
    cy.setDesktopViewport();
    cy.visitApp();
  });

  describe("playback toggle", () => {
    it("starts and stops the metronome", () => {
      cy.expectPlaybackState("stopped");

      cy.togglePlayback();
      cy.expectPlaybackState("running");

      cy.togglePlayback();
      cy.expectPlaybackState("stopped");
    });
  });
});
