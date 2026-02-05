import React, { useState, useRef, useEffect } from "react";
import type { Card as CardType } from "../lib/types.ts";

interface CardProps {
  card: CardType;
  index: number;
  columnName: string;
  onUpdate: (card: CardType) => void;
  onDelete: (cardId: string) => void;
  onDragStart: (cardId: string, columnName: string) => void;
  onDragOverCard: (columnName: string, index: number, half: "top" | "bottom") => void;
  onDragLeaveCard: () => void;
  dropIndicator: "top" | "bottom" | null;
}

export default function Card({
  card,
  index,
  columnName,
  onUpdate,
  onDelete,
  onDragStart,
  onDragOverCard,
  onDragLeaveCard,
  dropIndicator,
}: CardProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && titleRef.current) {
      titleRef.current.focus();
    }
  }, [editing]);

  function handleSave() {
    if (!title.trim()) return;
    onUpdate({ ...card, title: title.trim(), description: description.trim() });
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      setTitle(card.title);
      setDescription(card.description);
      setEditing(false);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const half = e.clientY < midY ? "top" : "bottom";
    onDragOverCard(columnName, index, half);
  }

  if (editing) {
    return (
      <div className="bg-card rounded-lg p-3 shadow-md">
        <input
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-white text-sm font-semibold outline-none border-b border-slate-500 pb-1 mb-2"
          placeholder="Card title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-slate-300 text-sm outline-none resize-none min-h-[40px]"
          placeholder="Description (optional)"
          rows={2}
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => {
              setTitle(card.title);
              setDescription(card.description);
              setEditing(false);
            }}
            className="text-xs text-slate-400 hover:text-white px-2 py-1"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={(e) => {
        e.stopPropagation();
        onDragLeaveCard();
      }}
    >
      {dropIndicator === "top" && (
        <div className="h-0.5 bg-blue-400 rounded-full mb-1.5" />
      )}
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.effectAllowed = "move";
          onDragStart(card.id, columnName);
          (e.target as HTMLElement).classList.add("dragging");
        }}
        onDragEnd={(e) => {
          (e.target as HTMLElement).classList.remove("dragging");
        }}
        className="bg-card hover:bg-card-hover rounded-lg p-3 shadow-md cursor-grab active:cursor-grabbing group transition-colors"
      >
        <div className="flex justify-between items-start">
          <h3
            className="text-white text-sm font-semibold cursor-pointer flex-1"
            onClick={() => setEditing(true)}
          >
            {card.title}
          </h3>
          <button
            onClick={() => onDelete(card.id)}
            className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-xs"
            title="Delete card"
          >
            ✕
          </button>
        </div>
        {card.description && (
          <p
            className="text-slate-400 text-xs mt-1 cursor-pointer"
            onClick={() => setEditing(true)}
          >
            {card.description}
          </p>
        )}
      </div>
      {dropIndicator === "bottom" && (
        <div className="h-0.5 bg-blue-400 rounded-full mt-1.5" />
      )}
    </div>
  );
}
