# Kanban Board Skill

A markdown-based kanban board for any project. The board lives in a single `KANBAN.md` file with three columns: **To Do**, **In Progress**, and **Done**.

## Available Commands

| Command | Description |
|---------|-------------|
| `/kanban-init` | Create a new KANBAN.md board in the current project |
| `/kanban-add` | Add a new card to a column |
| `/kanban-move` | Move a card between columns |
| `/kanban-view` | View a summary of the board |
| `/kanban-archive` | Archive completed cards |
| `/kanban-review` | Analyze board health and get suggestions |
| `/kanban-app` | Launch an interactive web app to manage the board |

## Board Format

The `KANBAN.md` file uses a simple markdown structure:

- `#` — Board title
- `##` — Column headers (exactly: `To Do`, `In Progress`, `Done`)
- `###` — Card titles
- Text after a `###` heading — Card description (plain text or markdown)
- `---` — Separator between cards
- Empty columns have just the `##` heading with no cards

## Example

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
