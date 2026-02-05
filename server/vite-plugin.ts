import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

interface KanbanApiOptions {
  kanbanFile: string;
}

interface Card {
  id: string;
  title: string;
  description: string;
}

interface Column {
  name: string;
  cards: Card[];
}

interface Board {
  title: string;
  columns: Column[];
}

function parseMarkdown(md: string): Board {
  const lines = md.split("\n");
  let title = "Kanban";
  const columns: Column[] = [];
  let currentColumn: Column | null = null;
  let currentCard: Card | null = null;
  let descriptionLines: string[] = [];
  let cardIndex = 0;

  function flushCard() {
    if (currentCard && currentColumn) {
      currentCard.description = descriptionLines.join("\n").trim();
      currentColumn.cards.push(currentCard);
      currentCard = null;
      descriptionLines = [];
    }
  }

  for (const line of lines) {
    if (line.startsWith("# ") && !line.startsWith("## ") && !line.startsWith("### ")) {
      title = line.slice(2).trim();
    } else if (line.startsWith("## ") && !line.startsWith("### ")) {
      flushCard();
      const colName = line.slice(3).trim();
      if (["To Do", "In Progress", "Done"].includes(colName)) {
        currentColumn = { name: colName, cards: [] };
        columns.push(currentColumn);
      } else {
        currentColumn = null;
      }
    } else if (line.startsWith("### ")) {
      flushCard();
      currentCard = {
        id: `card-${cardIndex++}`,
        title: line.slice(4).trim(),
        description: "",
      };
      descriptionLines = [];
    } else if (line.trim() === "---") {
      flushCard();
    } else if (currentCard) {
      descriptionLines.push(line);
    }
  }

  flushCard();

  // Ensure all three columns exist
  for (const name of ["To Do", "In Progress", "Done"]) {
    if (!columns.find((c) => c.name === name)) {
      columns.push({ name, cards: [] });
    }
  }

  // Sort to canonical order
  const order = ["To Do", "In Progress", "Done"];
  columns.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

  return { title, columns };
}

function serializeBoard(board: Board): string {
  let md = `# ${board.title}\n`;

  for (const column of board.columns) {
    md += `\n## ${column.name}\n`;

    for (const card of column.cards) {
      md += `\n### ${card.title}\n`;
      if (card.description.trim()) {
        md += `${card.description.trim()}\n`;
      }
      md += `\n---\n`;
    }
  }

  return md;
}

export function kanbanApi(options: KanbanApiOptions): Plugin {
  const filePath = path.resolve(options.kanbanFile);

  return {
    name: "kanban-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/api/board" && req.method === "GET") {
          try {
            const content = fs.readFileSync(filePath, "utf-8");
            const board = parseMarkdown(content);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(board));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        } else if (req.url === "/api/board" && req.method === "PUT") {
          let body = "";
          req.on("data", (chunk: Buffer) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            try {
              const board: Board = JSON.parse(body);
              const md = serializeBoard(board);
              fs.writeFileSync(filePath, md, "utf-8");
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}
