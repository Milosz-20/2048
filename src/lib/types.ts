export interface Tile {
  id: string; // Unikalny identyfikator (do animacji i łączenia)
  value: number; // Wartość liczby: 2, 4, 8, ...
  row: number; // Aktualny wiersz w siatce
  col: number; // Aktualna kolumna w siatce
  mergedFrom?: string[]; // ID kafelków, które się połączyły
  isNew?: boolean; // Czy kafelek jest nowy (do animacji pojawienia się)
  isMerging?: boolean; // Czy kafelek jest w trakcie mergowania (do animacji znikania)
}

export interface GameState {
  tiles: Tile[];
  size: number;
  score: number;
  bestScore: number;
  isLocked: boolean; // Czy użytkownik może wykonać ruch (blokada podczas animacji)
  gameOver?: boolean; // Czy gra się skończyła (brak możliwych ruchów)
}

export interface Position {
  row: number;
  col: number;
}

export enum Direction {
  Left = 'left',
  Right = 'right',
  Up = 'up',
  Down = 'down',
}
