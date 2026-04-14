# Contributing

## Workflow

- Create a feature branch from `main`
- Open a pull request back into `main`
- Make sure CI passes before merge

Current CI behavior:

- pull requests run validation checks
- merges into `main` trigger the workflow again on the merged result
- after successful validation on `main`, the release automation job runs

## Commit Messages

This repository uses Release Please for changelog and release management.

Use Conventional Commit style messages whenever possible:

- `feat: add rhythm drawer selection`
- `fix: correct custom meter input handling`
- `chore: update cypress workflow`
- `docs: add developer guide`
- `refactor: split beat control by viewport`
- `test: add transport cypress coverage`

Why this matters:

- Release Please uses commit history to decide version bumps
- `feat:` typically maps to a minor release
- `fix:` typically maps to a patch release
- breaking changes should be called out explicitly in Conventional Commit format

## Pull Requests

PRs should be small enough to review clearly and should include:

- a short summary of the change
- any UI screenshots if the UI changed
- notes about test coverage if behavior changed

Before opening or merging a PR, run:

```bash
pnpm lint
pnpm build
pnpm test:e2e
```

## Releases

Releases are managed with Release Please.

Current release behavior:

- feature work merges into `main`
- CI runs on `main`
- Release Please updates or opens a release PR if there are releasable changes
- merging the Release Please PR creates the git tag and GitHub release

This means normal feature PRs do not directly create a release tag.

## Notes

- Keep meter selection and rhythm selection as separate concerns unless the change explicitly requires coupling them.
- Prefer stable `data-testid` selectors when changing UI that Cypress covers.
- If a change affects layout or interaction flow, update Cypress specs or custom commands in the same PR.
