import React from "react";
import type { Card as CardType } from "../lib/types.ts";
import Card from "./Card.tsx";
import AddCard from "./AddCard.tsx";

export interface DropTarget {
  columnName: string;
  index: number;
  half: "top" | "bottom";
}

interface ColumnProps {
  name: string;
  cards: CardType[];
  dropTarget: DropTarget | null;
  onUpdateCard: (columnName: string, card: CardType) => void;
  onDeleteCard: (columnName: string, cardId: string) => void;
  onAddCard: (columnName: string, title: string, description: string) => void;
  onDragStart: (cardId: string, columnName: string) => void;
  onDragOverCard: (columnName: string, index: number, half: "top" | "bottom") => void;
  onDragLeaveCard: () => void;
  onDrop: (targetColumn: string, targetIndex: number) => void;
}

const columnColors: Record<string, string> = {
  "To Do": "border-blue-500",
  "In Progress": "border-amber-500",
  Done: "border-green-500",
};

const badgeColors: Record<string, string> = {
  "To Do": "bg-blue-500/20 text-blue-400",
  "In Progress": "bg-amber-500/20 text-amber-400",
  Done: "bg-green-500/20 text-green-400",
};

export default function Column({
  name,
  cards,
  dropTarget,
  onUpdateCard,
  onDeleteCard,
  onAddCard,
  onDragStart,
  onDragOverCard,
  onDragLeaveCard,
  onDrop,
}: ColumnProps) {
  function getDropIndex(): number {
    if (!dropTarget || dropTarget.columnName !== name) return cards.length;
    return dropTarget.half === "top" ? dropTarget.index : dropTarget.index + 1;
  }

  return (
    <div
      className={`bg-column rounded-xl p-4 flex flex-col min-h-[200px] border-t-2 ${columnColors[name] || "border-slate-500"}`}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(name, getDropIndex());
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold text-sm uppercase tracking-wide">
          {name}
        </h2>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeColors[name] || "bg-slate-600 text-slate-300"}`}
        >
          {cards.length}
        </span>
      </div>
      <div
        className="flex flex-col gap-2 flex-1"
        onDragOver={(e) => {
          // When dragging over the empty area below cards, target end of list
          if (e.target === e.currentTarget) {
            onDragOverCard(name, cards.length, "top");
          }
        }}
        onDragLeave={(e) => {
          if (e.target === e.currentTarget) {
            onDragLeaveCard();
          }
        }}
      >
        {cards.map((card, i) => (
          <Card
            key={card.id}
            card={card}
            index={i}
            columnName={name}
            onUpdate={(updated) => onUpdateCard(name, updated)}
            onDelete={(id) => onDeleteCard(name, id)}
            onDragStart={onDragStart}
            onDragOverCard={onDragOverCard}
            onDragLeaveCard={onDragLeaveCard}
            dropIndicator={
              dropTarget && dropTarget.columnName === name && dropTarget.index === i
                ? dropTarget.half
                : null
            }
          />
        ))}
        {dropTarget && dropTarget.columnName === name && dropTarget.index === cards.length && (
          <div className="h-0.5 bg-blue-400 rounded-full" />
        )}
      </div>
      <div className="mt-3">
        <AddCard onAdd={(title, desc) => onAddCard(name, title, desc)} />
      </div>
    </div>
  );
}
