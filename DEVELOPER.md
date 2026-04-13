# Developer Guide

## Local Setup

Prerequisites:

- Node.js 20
- pnpm 10

Install dependencies:

```bash
pnpm install
```

Start the app locally:

```bash
pnpm dev
```

For local E2E runs, the test server uses a fixed host and port:

```bash
pnpm dev:test
```

This starts Vite on `http://127.0.0.1:4173`.
## Common Commands

Quality and build:

```bash
pnpm lint
pnpm build
```

Cypress:

```bash
pnpm cy:open
pnpm cy:run
pnpm cy:headless
pnpm test:e2e
```

Command intent:

- `pnpm cy:open`: open Cypress locally in interactive mode
- `pnpm cy:run`: run Cypress headless
- `pnpm cy:headless`: explicit alias for headless Cypress
- `pnpm test:e2e`: start the local test server, wait for readiness, then run Cypress

## App Structure

Core runtime files:

- `src/App.tsx`: top-level app shell
- `src/components/Header/`: app title and quick help
- `src/components/Metronome/`: metronome UI and stateful controls
- `src/components/Metronome/MetronomeProvider/`: transport, BPM, meter, rhythm, and playback scheduling
- `src/components/TickTock/`: visualizer

Important current behavior:

- Meter selection and rhythm selection are separate concerns.
- Meter presets define the cycle.
- Rhythm mode defines subdivision feel and pulse density.
- Desktop and mobile meter controls intentionally diverge in UI.
- Rhythm control uses a desktop popover and a mobile bottom sheet.

## E2E Test Structure

Cypress lives under `cypress/`.

Current spec layout:

- `cypress/e2e/app-shell.cy.ts`
- `cypress/e2e/quick-help.cy.ts`
- `cypress/e2e/transport.cy.ts`
- `cypress/e2e/meter-selection.cy.ts`
- `cypress/e2e/rhythm-selection.cy.ts`

Shared Cypress commands live in:

- `cypress/support/commands.ts`

Current custom commands cover:

- app bootstrap and viewport setup
- transport toggle assertions
- taal selection
- custom meter entry
- rhythm selection
- quick help open

Selector policy:

- Use `data-testid` for stable Cypress selectors.
- Do not build tests around Linaria class names, generated MUI DOM structure, or brittle text-only selectors unless there is no better hook.

## CI

GitHub Actions workflow:

- `.github/ci.yml`

Current jobs:

- `quality`: install, lint, build, upload `dist`
- `e2e`: depends on `quality`, downloads `dist`, runs Cypress
- `deploy`: placeholder job for `main`, depends on both `quality` and `e2e`

Current triggers:

- all branch pushes
- all pull requests
- manual dispatch

This means the pipeline runs:

- on feature branch pushes
- on PRs targeting merge
- again on the merged result when `main` receives the post-merge push

## Development Notes

- Preserve `/sounds/tick.mp3` and `/sounds/tock.mp3` paths used by Howler.
- Keep playback timing logic inside `MetronomeProvider`.
- Treat responsive behavior as required, not optional polish.
- After non-trivial UI or state changes, run:

```bash
pnpm lint
pnpm build
pnpm test:e2e
```

## When Adding Tests

Prefer adding a new spec file when a behavior is a distinct user action area.

Examples:

- new transport behavior: extend `transport.cy.ts`
- new quick help behavior: extend `quick-help.cy.ts`
- new rhythm menu behavior: extend `rhythm-selection.cy.ts`
- new custom meter behavior: extend `meter-selection.cy.ts`

If a test needs repeated interaction, add or extend a focused custom command in `cypress/support/commands.ts` rather than duplicating selectors across specs.
