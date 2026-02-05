---
name: kanban-review
description: Analyze kanban board health and provide suggestions. Use when the user says "review my board", "how's the board looking", or "any issues with my kanban".
---

# /kanban-review

Analyze board health and provide suggestions.

## Instructions

1. Verify `KANBAN.md` exists in the current working directory. If not, tell the user to run `/kanban-init` first.
2. Read `KANBAN.md` and parse all columns and cards.
3. Count cards in each column.
4. Analyze and report on:
   - **WIP overload**: If "In Progress" has more than 3 cards, warn that too many items are in flight. Suggest finishing or moving some back to To Do.
   - **Stale board**: If "In Progress" is empty but "To Do" has items, suggest picking up work.
   - **Done pile-up**: If "Done" has more than 5 cards, suggest running `/kanban-archive` to clean up.
   - **Empty board**: If all columns are empty, suggest adding cards with `/kanban-add`.
5. Provide an overall health summary (e.g., "Board looks healthy!" or "A few things to address:").
