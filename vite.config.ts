import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { kanbanApi } from "./server/vite-plugin.js";

export default defineConfig({
  plugins: [
    react(),
    kanbanApi({
      kanbanFile: process.env.KANBAN_FILE || "KANBAN.md",
    }),
  ],
  root: "web",
  server: {
    port: 5555,
  },
});
