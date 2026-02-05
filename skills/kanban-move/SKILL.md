---
name: kanban-move
description: Move a card between columns on the kanban board. Use when the user says "move this task", "mark as done", or "move to in progress".
---

# /kanban-move

Move a card between columns on the kanban board.

## Instructions

1. Verify `KANBAN.md` exists in the current working directory. If not, tell the user to run `/kanban-init` first.
2. Read `KANBAN.md` and parse all cards from each column.
3. Present the board to the user so they can see what's available.
4. Ask which card to move. Accept an exact title or a partial match. If ambiguous, ask for clarification.
5. Ask for the target column (To Do, In Progress, or Done).
6. Remove the card (its `### ` heading, description text, and trailing `---`) from the source column.
7. Insert the card at the end of the target column (before the next `## ` heading or end of file).
8. Write the updated content back to `KANBAN.md`.
9. Confirm the move: "Moved **{card title}** from **{source}** to **{target}**."
