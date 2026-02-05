# /kanban-add

Add a new card to the kanban board.

## Instructions

1. Verify `KANBAN.md` exists in the current working directory. If not, tell the user to run `/kanban-init` first.
2. Read `KANBAN.md`.
3. Ask the user for:
   - **Card title** (required)
   - **Description** (optional, defaults to empty)
   - **Column** (default: "To Do" — must be one of: To Do, In Progress, Done)
4. Add the card to the end of the chosen column, using this format:
   ```
   ### Card title
   Description text here.

   ---
   ```
   Insert the card block just before the next `## ` column heading (or end of file if it's the last column). Make sure there is a blank line before the next `##` heading.
5. Write the updated content back to `KANBAN.md`.
6. Confirm what was added and to which column.
