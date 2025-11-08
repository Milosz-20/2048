export interface Tile {
  id: string;              // Unikalny identyfikator (do animacji i łączenia)
  value: number;           // Wartość liczby: 2, 4, 8, ...
  row: number;             // Aktualny wiersz w siatce
  col: number;             // Aktualna kolumna w siatce
  previousRow?: number;    // Poprzedni wiersz (do animacji ruchu)
  previousCol?: number;    // Poprzednia kolumna
  mergedFrom?: [string, string]; // ID kafelków, które utworzyły ten (po scaleniu)
  isNew?: boolean;         // Flaga do animacji nowego kafelka
}

export interface GameState {
  tiles: Tile[];
  size: number;
}

export interface Position {
  row: number;
  col: number;
}

export enum Direction {
  Left = "left",
  Right = "right",
  Up = "up",
  Down = "down",
}