# Test Strategy

## Scope

This is a static content site. Testing focuses on visual correctness and data integrity, not application logic.

## What to verify

### Manual (every change)

1. **`npm run dev`** in `frontend/` — site renders without errors
2. **`npm run build`** — TypeScript compiles, Vite produces `dist/`
3. **Visual scan**: all 6 theme sections render, starred articles have visual emphasis, navigation links jump correctly
4. **Mobile**: view at 375px width — layout doesn't break, text remains readable

### Automated (future)

- **TypeScript compilation** (`tsc --noEmit`) — catches data model mismatches
- **Snapshot tests** for components — if data structure is stable
- **Link checker** — verify all external URLs return 200

### Not planned

- Unit tests for React components: the components are pure layout with no business logic; the TypeScript compiler already verifies prop types
- E2E tests: single page, no user interaction beyond scrolling and clicking links

## Current status

- `npm run build` passes
- `npm run dev` renders correctly
- All 6 themes, 19 articles verified visually
