# Company-X Engineering Conventions

> This file is the source of truth for all coding standards, Git practices,
> and formatting rules across every project in the Company-X ecosystem.
> All agents must read and follow this file before producing any output.

---

## 1. Languages

| Language | Usage |
|---|---|
| TypeScript | All React Native (Expo) frontend code |
| JavaScript | Config files, scripts, tooling only |
| Python | Backend services, data pipelines, scripts |

- Never use plain JavaScript for application logic — TypeScript only
- All TypeScript must be strictly typed — avoid `any`
- Python must be typed using type hints (PEP 484)

---

## 2. Formatting & Linting

### TypeScript / JavaScript
- **Formatter:** Prettier (default config)
- **Linter:** ESLint (standard config)
- All code must pass Prettier and ESLint before committing
- Never disable ESLint rules inline without a comment explaining why

### Python
- **Formatter:** Black (default config)
- **Linter:** Flake8
- All code must pass Black and Flake8 before committing

### Setup (run once per project)
```bash
# TypeScript / JavaScript
npm install --save-dev prettier eslint

# Python
pip install black flake8
```

---

## 3. Git Branching Strategy

### Branch structure
```
main                          ← always stable, deployable at any time
└── feature/[TASK-ID]-[short-description]
└── fix/[TASK-ID]-[short-description]
└── refactor/[TASK-ID]-[short-description]
└── config/[TASK-ID]-[short-description]
└── infra/[TASK-ID]-[short-description]
└── spike/[TASK-ID]-[short-description]
```

### Rules
- **Never commit directly to main** — all changes go through a PR
- Branch names must include the TASK ID from the brief
- One branch per task — do not stack unrelated changes
- Delete branches after merging

### Setting up branch protection on GitHub (do this once)
1. Go to your repo on GitHub
2. Settings → Branches → Add branch protection rule
3. Branch name pattern: `main`
4. Check: Require a pull request before merging
5. Check: Require approvals (set to 1 — you are the approver)
6. Check: Do not allow bypassing the above settings
7. Save changes

This ensures no agent can push directly to main under any circumstance.

### Creating a branch (agents follow this pattern)
```bash
git checkout main
git pull origin main
git checkout -b feature/FEAT-2026-03-14-001-google-login
```

### Committing
```bash
git add .
git commit -m "FEAT-2026-03-14-001: Add Google OAuth login screen"
git push origin feature/FEAT-2026-03-14-001-google-login
```

### Commit message format
```
[TASK-ID]: Short description of what changed (max 72 chars)

Optional longer description if needed.
```

---

## 4. File & Folder Naming

| Type | Convention | Example |
|---|---|---|
| React components | PascalCase | `LoginScreen.tsx` |
| Hooks | camelCase with `use` prefix | `useAuthSession.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | SCREAMING_SNAKE_CASE | `API_BASE_URL` |
| Python files | snake_case | `auth_service.py` |
| Folders | kebab-case | `user-profile/` |

---

## 5. Code Quality Rules

- Functions must do one thing — if it needs a comment to explain what it does, it should be split
- No function longer than 50 lines without a strong justification
- No commented-out code committed to the repo — delete it
- No hardcoded secrets, API keys, or credentials — use environment variables
- All environment variables must be documented in `.env.example`
- Every public function must have a docstring or JSDoc comment

---

## 6. Testing

- All new features must include tests
- Bug fixes must include a regression test
- Minimum coverage target: 80%
- Tests live alongside the code they test in a `__tests__` folder or `.test.ts` file

---

## 7. Pull Requests

- PR title must reference the TASK ID: `FEAT-2026-03-14-001: Google OAuth login`
- PR description must include:
  - What was done
  - How to test it
  - Link to the brief in `briefs/`
  - Screenshots for any UI changes
- PRs must be reviewed before merging — you (the operator) are the reviewer
- Agents must never merge their own PRs
