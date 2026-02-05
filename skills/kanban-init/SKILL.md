---
name: kanban-init
description: Initialize a new KANBAN.md board in the current project. Use when the user says "create a kanban board", "set up task tracking", or "initialize a board".
---

# /kanban-init

Initialize a new kanban board for the current project.

## Instructions

1. Check if a `KANBAN.md` file already exists in the current working directory.
   - If it exists, show the user and ask if they want to overwrite it. Stop if they say no.
2. Ask the user for a project/board name (e.g. "My Project").
3. Read the template from `{{SKILL_DIR}}/templates/KANBAN.md`.
4. Replace `{{PROJECT_NAME}}` with the user's chosen name.
5. Write the result to `KANBAN.md` in the current working directory.
6. Confirm creation and briefly explain the board format:
   - Three columns: To Do, In Progress, Done
   - Cards are `### Title` followed by a description and `---`
   - They can manage it with `/kanban-add`, `/kanban-move`, `/kanban-view`, or `/kanban-app`

## Template Location

`{{SKILL_DIR}}/templates/KANBAN.md`
