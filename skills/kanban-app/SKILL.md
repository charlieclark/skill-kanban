---
name: kanban-app
description: Launch an interactive web app to visually manage the kanban board with drag-and-drop. Use when the user says "open the kanban app", "launch the board UI", or "drag and drop tasks".
---

# /kanban-app

Launch an interactive web app to visually manage the kanban board.

## Instructions

1. Verify `KANBAN.md` exists in the current working directory. If not, tell the user to run `/kanban-init` first.

2. **Ask the user where to install the kanban app dependencies.** Suggest two options:
   - **Skill directory** (default) — install inside `{{SKILL_DIR}}`. Keeps the user's project clean, but requires using `--prefix` to run.
   - **Project directory** — install into the current working directory. Adds `vite`, `react`, etc. to the project's own `devDependencies`.

3. Based on their choice:
   - **Skill directory:** Check for `node_modules` in `{{SKILL_DIR}}`. If not present, run `npm install` in `{{SKILL_DIR}}`.
   - **Project directory:** Copy `package.json`, `tsconfig.json`, and `vite.config.ts` from `{{SKILL_DIR}}` into the current working directory (warn before overwriting any existing files). Then run `npm install`.

4. **Ask if they'd like to add a `kanban` script to their `package.json`.** If yes:
   - Read the project's `package.json`.
   - Add a script entry:
     ```json
     "kanban": "KANBAN_FILE=\"$(pwd)/KANBAN.md\" vite --config {{path_to_vite_config}}"
     ```
     - If they installed to the skill directory, use: `vite --config {{SKILL_DIR}}/vite.config.ts --root {{SKILL_DIR}}/web`
     - If they installed to the project directory, use: `vite`
   - Write the updated `package.json`.
   - Tell them they can now run `npm run kanban` anytime to launch the board.

5. Start the Vite dev server:
   - **Skill directory install:**
     ```bash
     KANBAN_FILE="$(pwd)/KANBAN.md" npm run dev --prefix {{SKILL_DIR}}
     ```
   - **Project directory install:**
     ```bash
     KANBAN_FILE="$(pwd)/KANBAN.md" npm run dev
     ```
   Run this in the background so the user can continue using the CLI.

6. Tell the user:
   - The board app is running at **http://localhost:5555**
   - They can drag and drop cards between columns and reorder within columns
   - They can add new cards, edit existing ones, and delete cards
   - All changes are saved directly to `KANBAN.md`
   - To stop the server, they can press `Ctrl+C` in the terminal or kill the background process
   - If they added the script: they can start the app next time with `npm run kanban`
