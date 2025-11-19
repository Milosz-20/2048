import { MOVE_ANIMATION_DURATION, WINNING_TILE_VALUE } from '@/lib/game-config';
import {
  addRandomTile,
  createInitialState,
  createInitialTiles,
  hasPossibleMoves,
  move,
} from '@/lib/game-logic';
import { Direction, GameState, Tile } from '@/lib/types';
import { create } from 'zustand';

interface GameActions {
  newGame: () => void;
  move: (direction: Direction) => void;
  lock: () => void;
  unlock: () => void;
  addTile: (tile: Tile) => void;
  setTiles: (tiles: Tile[]) => void;
  setScore: (score: number) => void;
  setBestScore: (bestScore: number) => void;
  setGameOver: (gameOver: boolean) => void;
}

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  // --- STAN POCZĄTKOWY ---
  ...createInitialState(),

  // --- PODSTAWOWE AKCJE ---
  newGame: () => {
    const initialState = createInitialState();
    const freshTiles = createInitialTiles(initialState);
    set({
      tiles: freshTiles,
      score: 0,
      bestScore: get().bestScore,
      isLocked: false,
      gameOver: false,
      gameWon: false,
    });
  },

  move: (direction) => {
    const state = get();
    if (state.isLocked || state.gameOver) return;

    set({ isLocked: true });

    const newState = move(state, direction);

    // Sprawdź czy coś się zmieniło - porównaj pozycje kafelków i ilość (merge)
    const oldPositions = state.tiles
      .filter((t) => !t.isMerging)
      .map((t) => `${t.id}:${t.row},${t.col}`)
      .sort()
      .join('|');
    const newPositions = newState.tiles
      .filter((t) => !t.isMerging)
      .map((t) => `${t.id}:${t.row},${t.col}`)
      .sort()
      .join('|');
    const hasChanged = oldPositions !== newPositions;

    // Ustaw nowy stan BEZ dodawania nowego kafelka
    const hasReachedWinningTile =
      state.gameWon ||
      newState.tiles.some(
        (tile) => !tile.isMerging && tile.value >= WINNING_TILE_VALUE
      );

    set({
      tiles: newState.tiles,
      score: newState.score,
      bestScore: newState.bestScore,
      gameOver: newState.gameOver,
      gameWon: hasReachedWinningTile,
    });

    setTimeout(() => {
      // Usuń tile'y oznaczone jako isMerging i flagi animacji po zakończeniu animacji
      const currentState = get();
      const tilesWithoutMerging = currentState.tiles
        .filter((tile) => !tile.isMerging)
        .map((tile) => {
          // Usuń flagi animacji po zakończeniu
          const { mergedFrom, isNew, ...cleanTile } = tile;
          return cleanTile;
        });

      // Dodaj nowy kafelek DOPIERO PO zakończeniu animacji
      let finalTiles = tilesWithoutMerging;
      if (hasChanged) {
        const stateWithNewTile = addRandomTile({
          ...currentState,
          tiles: tilesWithoutMerging,
        });
        finalTiles = stateWithNewTile.tiles;
      }

      // Compute final state and check for possible moves (game over)
      const finalState = { ...currentState, tiles: finalTiles };
      const gameOver = !hasPossibleMoves(finalState);

      set({ tiles: finalTiles, isLocked: false, gameOver });
    }, MOVE_ANIMATION_DURATION);
  },

  lock: () => set({ isLocked: true }),
  unlock: () => set({ isLocked: false }),

  addTile: (tile) => {
    const { tiles } = get();
    set({ tiles: [...tiles, tile] });
  },

  setTiles: (tiles) => set({ tiles }),
  setScore: (score) => set({ score }),
  setBestScore: (bestScore) => set({ bestScore }),
  setGameOver: (gameOver) => set({ gameOver }),
}));
