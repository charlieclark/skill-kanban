import React, { useState, useRef, useEffect } from "react";

interface AddCardProps {
  onAdd: (title: string, description: string) => void;
}

export default function AddCard({ onAdd }: AddCardProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && titleRef.current) {
      titleRef.current.focus();
    }
  }, [open]);

  function handleSubmit() {
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim());
    setTitle("");
    setDescription("");
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") {
      setTitle("");
      setDescription("");
      setOpen(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left text-slate-400 hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-slate-700/50 transition-colors"
      >
        + Add card
      </button>
    );
  }

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
        className="w-full bg-transparent text-slate-300 text-sm outline-none resize-none"
        placeholder="Description (optional)"
        rows={2}
      />
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => {
            setTitle("");
            setDescription("");
            setOpen(false);
          }}
          className="text-xs text-slate-400 hover:text-white px-2 py-1"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}
