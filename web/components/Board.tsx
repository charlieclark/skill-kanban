import React, { useState, useEffect, useRef, useCallback } from "react";
import type { Board as BoardType, Card as CardType } from "../lib/types.ts";
import type { DropTarget } from "./Column.tsx";
import { fetchBoard, saveBoard } from "../lib/api.ts";
import Column from "./Column.tsx";

export default function Board() {
  const [board, setBoard] = useState<BoardType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);
  const dragRef = useRef<{ cardId: string; sourceColumn: string } | null>(null);

  useEffect(() => {
    fetchBoard()
      .then(setBoard)
      .catch((err) => setError(err.message));
  }, []);

  const persist = useCallback(async (updated: BoardType) => {
    setBoard(updated);
    setSaving(true);
    try {
      await saveBoard(updated);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }, []);

  function handleDragStart(cardId: string, columnName: string) {
    dragRef.current = { cardId, sourceColumn: columnName };
  }

  function handleDragOverCard(columnName: string, index: number, half: "top" | "bottom") {
    setDropTarget({ columnName, index, half });
  }

  function handleDragLeaveCard() {
    setDropTarget(null);
  }

  function handleDrop(targetColumn: string, targetIndex: number) {
    setDropTarget(null);
    if (!dragRef.current || !board) return;
    const { cardId, sourceColumn } = dragRef.current;
    dragRef.current = null;

    const updated = structuredClone(board);
    const srcCol = updated.columns.find((c) => c.name === sourceColumn);
    const dstCol = updated.columns.find((c) => c.name === targetColumn);
    if (!srcCol || !dstCol) return;

    const cardIndex = srcCol.cards.findIndex((c) => c.id === cardId);
    if (cardIndex === -1) return;

    // Remove from source
    const [card] = srcCol.cards.splice(cardIndex, 1);

    // Adjust target index if moving within the same column
    // and the source was before the target
    let insertAt = targetIndex;
    if (sourceColumn === targetColumn && cardIndex < targetIndex) {
      insertAt--;
    }

    // Don't persist if nothing changed
    if (sourceColumn === targetColumn && cardIndex === insertAt) return;

    dstCol.cards.splice(insertAt, 0, card);
    persist(updated);
  }

  function handleUpdateCard(columnName: string, card: CardType) {
    if (!board) return;
    const updated = structuredClone(board);
    const col = updated.columns.find((c) => c.name === columnName);
    if (!col) return;
    const idx = col.cards.findIndex((c) => c.id === card.id);
    if (idx === -1) return;
    col.cards[idx] = card;
    persist(updated);
  }

  function handleDeleteCard(columnName: string, cardId: string) {
    if (!board) return;
    const updated = structuredClone(board);
    const col = updated.columns.find((c) => c.name === columnName);
    if (!col) return;
    col.cards = col.cards.filter((c) => c.id !== cardId);
    persist(updated);
  }

  function handleAddCard(
    columnName: string,
    title: string,
    description: string
  ) {
    if (!board) return;
    const updated = structuredClone(board);
    const col = updated.columns.find((c) => c.name === columnName);
    if (!col) return;
    const id = `card-${Date.now()}`;
    col.cards.push({ id, title, description });
    persist(updated);
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-400 bg-red-900/20 px-6 py-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-400">Loading board...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-2xl font-bold">{board.title}</h1>
        {saving && (
          <span className="text-xs text-slate-400 animate-pulse">
            Saving...
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-6">
        {board.columns.map((col) => (
          <Column
            key={col.name}
            name={col.name}
            cards={col.cards}
            dropTarget={dropTarget}
            onUpdateCard={handleUpdateCard}
            onDeleteCard={handleDeleteCard}
            onAddCard={handleAddCard}
            onDragStart={handleDragStart}
            onDragOverCard={handleDragOverCard}
            onDragLeaveCard={handleDragLeaveCard}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
}
