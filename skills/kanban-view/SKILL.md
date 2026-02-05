# /kanban-view

View a formatted summary of the kanban board.

## Instructions

1. Verify `KANBAN.md` exists in the current working directory. If not, tell the user to run `/kanban-init` first.
2. Read `KANBAN.md` and parse all columns and cards.
3. Display a summary in this format:

```
📋 **Project Name — Kanban**

To Do: 3 | In Progress: 2 | Done: 5

**To Do**
- Card title one
- Card title two
- Card title three

**In Progress**
- Active task one
- Active task two

**Done**
- Completed task one
- ...
```

4. If the board is empty (no cards in any column), say so and suggest `/kanban-add`.
