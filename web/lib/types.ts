export interface Card {
  id: string;
  title: string;
  description: string;
}

export interface Column {
  name: string;
  cards: Card[];
}

export interface Board {
  title: string;
  columns: Column[];
}
