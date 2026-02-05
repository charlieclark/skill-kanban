# Kanban Skill

A markdown-based kanban board skill for AI coding agents. Manage project tasks through a simple `KANBAN.md` file with three columns: To Do, In Progress, and Done. Includes an interactive web app for visual board editing with drag-and-drop.

Skills follow the [Agent Skills](https://agentskills.io/) format.

## Available Skills

### kanban-cli

Manage a markdown-based kanban board. A single skill that handles all board operations: creating boards, adding and moving cards, viewing summaries, archiving done items, and reviewing board health.

**Use when:**
- "Create a kanban board"
- "Add a task to the board"
- "Move this task to in progress"
- "Show me the board"
- "Archive done tasks"
- "Review my board"

**Actions:**
- **Init** — Create a new `KANBAN.md` from a template
- **Add** — Add a card to any column (default: To Do)
- **Move** — Move a card between columns (supports partial title matching)
- **View** — Show a formatted summary with card counts per column
- **Archive** — Move Done cards to an Archived section with a date stamp
- **Review** — Analyze board health (WIP overload, stale board, done pile-up)

### kanban-app

Launch an interactive Vite + React web app for visual board management.

**Use when:**
- "Open the kanban app"
- "Launch the board UI"
- "I want to drag and drop tasks"

**Features:**
- Drag-and-drop cards between columns and within columns to reorder
- Inline editing of card titles and descriptions
- Add and delete cards
- All changes persist directly to `KANBAN.md`
- Runs at `http://localhost:5555`

## Installation

```bash
npx skills add charlieroth/kanban-skill
```

## Usage

Skills are automatically available once installed. The agent will use them when relevant tasks are detected.

**Examples:**
```
Create a kanban board for my project
```
```
Add "Build auth flow" to the to-do column
```
```
Move "Build auth flow" to in progress
```
```
Show me the board
```
```
Open the kanban app
```

## Board Format

The `KANBAN.md` file uses a simple markdown structure:

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

## Skill Structure

Each skill contains:
- `SKILL.md` — Instructions for the agent

Supporting infrastructure:
- `web/` — Interactive React board app
- `server/` — Vite plugin for reading/writing KANBAN.md
- `templates/` — Board template

## License

MIT
