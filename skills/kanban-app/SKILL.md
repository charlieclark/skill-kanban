# /kanban-app

Launch an interactive web app to visually manage the kanban board.

## Instructions

1. Verify `KANBAN.md` exists in the current working directory. If not, tell the user to run `/kanban-init` first.
2. Check if dependencies are installed by looking for `node_modules` in the skill directory (`{{SKILL_DIR}}`). If not present, run `npm install` in `{{SKILL_DIR}}`.
3. Start the Vite dev server by running this command:
   ```bash
   KANBAN_FILE="$(pwd)/KANBAN.md" npm run dev --prefix {{SKILL_DIR}}
   ```
   Run this in the background so the user can continue using the CLI.
4. Tell the user:
   - The board app is running at **http://localhost:5555**
   - They can drag and drop cards between columns
   - They can add new cards, edit existing ones, and delete cards
   - All changes are saved directly to `KANBAN.md`
   - To stop the server, they can press `Ctrl+C` in the terminal or kill the background process
