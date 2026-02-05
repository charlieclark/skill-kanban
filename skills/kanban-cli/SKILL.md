---
name: kanban-cli
description: Manage a markdown-based kanban board (KANBAN.md). Use when the user says "create a kanban board", "add a task", "move a card", "show the board", "archive done tasks", "review board health", or any task management request.
---

# /kanban-cli

Manage a markdown-based kanban board stored in `KANBAN.md`. Supports creating boards, adding/moving/viewing cards, archiving done items, and reviewing board health.

## Board Format

- `#` = board title
- `##` = column headers (exactly: `To Do`, `In Progress`, `Done`)
- `###` = card titles
- Text after `###` heading = card description
- `---` = separator between cards
- Empty columns have just the `##` heading

## Commands

Determine which action the user wants based on their message. If unclear, ask.

---

### Init

Create a new board. Use when the user wants to start a kanban board.

1. Check if `KANBAN.md` already exists. If so, ask before overwriting.
2. Ask the user for a project/board name.
3. Read the template from `{{SKILL_DIR}}/templates/KANBAN.md`.
4. Replace `{{PROJECT_NAME}}` with the user's chosen name.
5. Write the result to `KANBAN.md` in the current working directory.
6. Confirm creation and explain the format briefly.

---

### Add

Add a new card. Use when the user wants to add a task or card.

1. Verify `KANBAN.md` exists. If not, suggest running init first.
2. Read `KANBAN.md`.
3. Ask the user for:
   - **Card title** (required)
   - **Description** (optional)
   - **Column** (default: "To Do" — one of: To Do, In Progress, Done)
4. Add the card to the end of the chosen column:
   ```
   ### Card title
   Description text here.

   ---
   ```
   Insert just before the next `## ` heading or end of file.
5. Write the updated content back to `KANBAN.md`.
6. Confirm what was added and where.

---

### Move

Move a card between columns. Use when the user wants to move, promote, or mark a task.

1. Verify `KANBAN.md` exists.
2. Read and parse all cards from each column.
3. Show the board so the user can see what's available.
4. Ask which card to move. Accept exact title or partial match. Clarify if ambiguous.
5. Ask for the target column.
6. Remove the card from its source column.
7. Insert the card at the end of the target column.
8. Write the updated content back to `KANBAN.md`.
9. Confirm: "Moved **{card title}** from **{source}** to **{target}**."

---

### View

Show a board summary. Use when the user wants to see the board or list tasks.

1. Verify `KANBAN.md` exists.
2. Read and parse all columns and cards.
3. Display a summary:
   ```
   📋 **Project Name — Kanban**

   To Do: 3 | In Progress: 2 | Done: 5

   **To Do**
   - Card title one
   - Card title two

   **In Progress**
   - Active task

   **Done**
   - Completed task
   ```
4. If the board is empty, say so and suggest adding cards.

---

### Archive

Archive completed cards. Use when the user wants to clean up done items.

1. Verify `KANBAN.md` exists.
2. Find all cards in the "Done" column.
3. If none, inform the user and stop.
4. Show which cards will be archived and ask for confirmation.
5. Remove all "Done" cards (keep the `## Done` heading).
6. Append an `## Archived` section at the bottom (or add to existing):
   ```markdown
   ## Archived

   **Archived on YYYY-MM-DD**

   ### Completed task
   Description.

   ---
   ```
7. Write the updated content back to `KANBAN.md`.
8. Confirm how many cards were archived.

---

### Review

Analyze board health. Use when the user asks about board status or wants suggestions.

1. Verify `KANBAN.md` exists.
2. Read and parse all columns and cards.
3. Count cards per column.
4. Check for:
   - **WIP overload**: "In Progress" has more than 3 cards — suggest finishing or moving some back.
   - **Stale board**: "In Progress" is empty but "To Do" has items — suggest picking up work.
   - **Done pile-up**: "Done" has more than 5 cards — suggest archiving.
   - **Empty board**: All columns empty — suggest adding cards.
5. Provide an overall health summary.

## Template Location

`{{SKILL_DIR}}/templates/KANBAN.md`
