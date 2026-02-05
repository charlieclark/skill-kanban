# Kanban Skill

A markdown-based kanban board skill for AI coding agents. Manage project tasks through a simple `KANBAN.md` file with three columns: To Do, In Progress, and Done. Includes an interactive web app for visual board editing with drag-and-drop.

Skills follow the [Agent Skills](https://agentskills.io/) format.

## Available Skills

### kanban-init

Initialize a new kanban board in any project. Creates a `KANBAN.md` file from a template with the three fixed columns and example cards.

**Use when:**
- "Create a kanban board"
- "Set up task tracking"
- "Initialize a board for this project"

### kanban-add

Add a new card to any column on the board.

**Use when:**
- "Add a task to the board"
- "Create a new card"
- "Add this to my to-do list"

### kanban-move

Move a card between columns. Supports partial title matching.

**Use when:**
- "Move this task to in progress"
- "Mark this as done"
- "Move card to to-do"

### kanban-view

View a formatted summary of the board with card counts and titles grouped by column.

**Use when:**
- "Show me the board"
- "What's on the kanban?"
- "List my tasks"

### kanban-archive

Archive completed cards from the Done column. Moves them to an Archived section with a date stamp.

**Use when:**
- "Archive done tasks"
- "Clean up the board"
- "Clear completed items"

### kanban-review

Analyze board health and surface potential issues like WIP overload, stale boards, or large Done piles.

**Use when:**
- "Review my board"
- "How's the board looking?"
- "Any issues with my kanban?"

**Checks performed:**
- WIP overload (too many cards in In Progress)
- Stale board (empty In Progress with items in To Do)
- Done pile-up (suggests archiving)
- Empty board (suggests adding cards)

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
