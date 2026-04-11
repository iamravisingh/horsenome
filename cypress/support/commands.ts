/* eslint-disable @typescript-eslint/no-namespace */

type PlaybackState = "running" | "stopped";

const taalValueMap: Record<string, string> = {
  teental: "teental",
  ektal: "ektal",
  jhaptal: "jhaptal",
  rupak: "rupak",
  dadra: "dadra",
  keharwa: "keharwa",
};

const rhythmValueMap: Record<string, string> = {
  off: "off",
  duple: "duple",
  triplet: "triplet",
  quad: "quad",
  swing: "swing",
};

const normalizeKey = (value: string) => value.trim().toLowerCase();

const closeRhythmSurface = () => {
  cy.get("body").type("{esc}");
};

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      visitApp(): Chainable<void>;
      setDesktopViewport(): Chainable<void>;
      setMobileViewport(): Chainable<void>;
      setBpm(value: number): Chainable<void>;
      expectBpm(value: number): Chainable<void>;
      togglePlayback(): Chainable<void>;
      expectPlaybackState(state: PlaybackState): Chainable<void>;
      selectTaal(name: string): Chainable<void>;
      expectSelectedTaal(name: string): Chainable<void>;
      openCustomMeter(): Chainable<void>;
      setCustomMeter(beats: number, unit: number): Chainable<void>;
      expectCustomMeterValues(beats: number, unit: number): Chainable<void>;
      openRhythmSelector(): Chainable<void>;
      closeRhythmSelector(): Chainable<void>;
      selectRhythm(name: string): Chainable<void>;
      expectSelectedRhythm(name: string): Chainable<void>;
      openQuickHelp(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("getByTestId", (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add("visitApp", () => {
  cy.visit("/");
  cy.getByTestId("metronome-root").should("be.visible");
});

Cypress.Commands.add("setDesktopViewport", () => {
  cy.viewport(1512, 830);
});

Cypress.Commands.add("setMobileViewport", () => {
  cy.viewport(404, 777);
});

Cypress.Commands.add("setBpm", (value: number) => {
  cy.getByTestId("bpm-slider").then(($slider) => {
    const { width, height } = $slider[0].getBoundingClientRect();
    const min = 40;
    const max = 220;
    const ratio = (value - min) / (max - min);

    cy.wrap($slider).click(width * ratio, height / 2, { force: true });
    });
});

Cypress.Commands.add("expectBpm", (value: number) => {
  cy.getByTestId("bpm-readout").should("have.text", String(value));
});

Cypress.Commands.add("togglePlayback", () => {
  cy.getByTestId("transport-toggle").click();
});

Cypress.Commands.add("expectPlaybackState", (state: PlaybackState) => {
  const label = state === "running" ? "stop metronome" : "start metronome";
  cy.getByTestId("transport-toggle").should("have.attr", "aria-label", label);
});

Cypress.Commands.add("selectTaal", (name: string) => {
  const normalized = taalValueMap[normalizeKey(name)];

  cy.get("body").then(($body) => {
    if ($body.find('[data-testid="mobile-meter-select-display"]:visible').length > 0) {
      cy.getByTestId("mobile-meter-select-display").click();
      cy.contains('[role="option"]', name).click();
      return;
    }

    cy.getByTestId(`meter-chip-${normalized}`).click();
  });
});

Cypress.Commands.add("expectSelectedTaal", (name: string) => {
  const normalized = taalValueMap[normalizeKey(name)];

  cy.get("body").then(($body) => {
    if ($body.find('[data-testid="mobile-meter-select-display"]:visible').length > 0) {
      cy.getByTestId("mobile-meter-select-display").should("contain.text", name);
      return;
    }

    cy.getByTestId(`meter-chip-${normalized}`).should("have.attr", "data-selected", "true");
  });
});

Cypress.Commands.add("openCustomMeter", () => {
  cy.get("body").then(($body) => {
    if ($body.find('[data-testid="mobile-meter-select-display"]:visible').length > 0) {
      cy.getByTestId("mobile-meter-select-display").click();
      cy.getByTestId("mobile-meter-option-custom").click();
      return;
    }

    cy.getByTestId("custom-meter-toggle").click();
  });
});

Cypress.Commands.add("setCustomMeter", (beats: number, unit: number) => {
  cy.openCustomMeter();
  cy.getByTestId("custom-meter-beats").clear().type(String(beats)).blur();
  cy.getByTestId("custom-meter-unit").clear().type(String(unit)).blur();
});

Cypress.Commands.add("expectCustomMeterValues", (beats: number, unit: number) => {
  cy.getByTestId("custom-meter-beats").should("have.value", String(beats));
  cy.getByTestId("custom-meter-unit").should("have.value", String(unit));
});

Cypress.Commands.add("openRhythmSelector", () => {
  cy.getByTestId("rhythm-trigger").click();
});

Cypress.Commands.add("closeRhythmSelector", () => {
  closeRhythmSurface();
});

Cypress.Commands.add("selectRhythm", (name: string) => {
  const normalized = rhythmValueMap[normalizeKey(name)];
  cy.openRhythmSelector();
  cy.getByTestId(`rhythm-option-${normalized}`).click();
});

Cypress.Commands.add("expectSelectedRhythm", (name: string) => {
  const normalized = rhythmValueMap[normalizeKey(name)];
  cy.openRhythmSelector();
  cy.getByTestId(`rhythm-option-${normalized}`).should("have.attr", "data-selected", "true");
  closeRhythmSurface();
});

Cypress.Commands.add("openQuickHelp", () => {
  cy.getByTestId("quick-help-trigger").click();
});

export {};
