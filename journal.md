# Company-X Project Journal

---

## FEAT-2026-03-17-001 — Web Calculator (2026-03-17)
Built a browser-based calculator as the first web feature for Company-X. The calculator supports all standard arithmetic operations (+, −, ×, ÷), AC, sign toggle, percentage, decimal input, and full keyboard support. Division by zero renders an Error state. The layout is responsive down to mobile browser widths.
- Key decision: Web app placed in `web/` directory to separate it from future mobile app in the same repo
- Key decision: Calculator state managed in Zustand store for consistency with approved stack and extensibility
- Files changed: `web/` directory (Next.js app — package.json, tsconfig, Tailwind config, src/app/, src/store/, src/components/Calculator/)
- Handled by: Engineering — Frontend, QA
- Not yet deployed — Vercel setup required (separate brief)
