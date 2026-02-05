# CLAUDE.md

This file provides guidance to AI coding agents (Claude Code, Cursor, Copilot, etc.) when working with code in this repository.

## Repository Overview

A markdown-based kanban board skill for Claude Code. The board lives in a single `KANBAN.md` file with three fixed columns (To Do / In Progress / Done). Includes an interactive Vite + React web app for visual board editing with drag-and-drop.

## Creating a New Skill

### Directory Structure

```
skills/
  {skill-name}/           # kebab-case directory name
    SKILL.md              # Required: skill definition
```

### Naming Conventions

- **Skill directory**: `kebab-case` (e.g., `kanban-add`, `kanban-move`)
- **SKILL.md**: Always uppercase, always this exact filename

### SKILL.md Format

```markdown
# /skill-name

{Brief description of what the skill does.}

## Instructions

{Numbered list explaining the skill's workflow — what to check, what to ask the user, what to read/write, and what to confirm.}
```

### Best Practices for Context Efficiency

Skills are loaded on-demand — only the skill name and description are loaded at startup. The full `SKILL.md` loads into context only when the agent decides the skill is relevant. To minimize context usage:

- **Keep SKILL.md under 500 lines** — put detailed reference material in separate files
- **Write specific descriptions** — helps the agent know exactly when to activate the skill
- **Use progressive disclosure** — reference supporting files that get read only when needed
- **Prefer scripts over inline code** — script execution doesn't consume context (only output does)

## Available Skills

| Skill | Description |
|-------|-------------|
| `/kanban-cli` | Manage the board — init, add, move, view, archive, and review |
| `/kanban-app` | Launch the interactive web app |

## Board Format (KANBAN.md)

The `KANBAN.md` file uses a simple markdown structure:

- `#` — Board title
- `##` — Column headers (exactly: `To Do`, `In Progress`, `Done`)
- `###` — Card titles
- Text after a `###` heading — Card description (plain text or markdown)
- `---` — Separator between cards
- Empty columns have just the `##` heading with no cards

```markdown
# My Project — Kanban

## To Do

### Build login page
Create the login form with email and password fields.

---

## In Progress

### Design database schema
Working on the ERD for the user tables.

---

## Done

### Set up project repo
Initialized the repo with README and .gitignore.

---
```

## Web App Architecture

The interactive board app lives in `web/` and is served by Vite on port 5555.

- **`server/vite-plugin.ts`** — Vite plugin providing `GET /api/board` and `PUT /api/board` middleware. Parses KANBAN.md to JSON and serializes JSON back to markdown.
- **`web/components/Board.tsx`** — Main board layout, drag-and-drop state, persistence logic.
- **`web/components/Column.tsx`** — Single column with drop zone and positional insertion indicators.
- **`web/components/Card.tsx`** — Draggable card with inline editing and delete.
- **`web/components/AddCard.tsx`** — Inline form to add a new card.
- **`web/lib/api.ts`** — Fetch helpers for the board API.
- **`web/lib/types.ts`** — Shared TypeScript types (Board, Column, Card).

Styling uses Tailwind CSS via CDN (no build-time config needed).

The app is launched via the `KANBAN_FILE` environment variable:
```bash
KANBAN_FILE="$(pwd)/KANBAN.md" npm run dev
```

## End-User Installation

**Claude Code:**
```bash
# Add the skill directory to your project or global skills
cp -r kanban-skill ~/.claude/skills/
```

**claude.ai:**
Add skill SKILL.md files to project knowledge or paste contents into the conversation.
