---
name: kanban-archive
description: Archive completed cards from the Done column. Use when the user says "archive done tasks", "clean up the board", or "clear completed items".
---

# /kanban-archive

Archive completed cards from the Done column.

## Instructions

1. Verify `KANBAN.md` exists in the current working directory. If not, tell the user to run `/kanban-init` first.
2. Read `KANBAN.md` and find all cards in the "Done" column.
3. If there are no cards in Done, inform the user and stop.
4. Show the user which cards will be archived and ask for confirmation.
5. On confirmation:
   - Remove all cards from the "Done" column (leave the `## Done` heading).
   - Append an `## Archived` section at the bottom of the file (or add to it if it already exists).
   - Add a date stamp line: `**Archived on YYYY-MM-DD**`
   - Add the archived cards below the date stamp.
6. Write the updated content back to `KANBAN.md`.
7. Confirm how many cards were archived.

## Archive Format

```markdown
## Archived

**Archived on 2025-01-15**

### Completed task
Description of the task.

---
```
