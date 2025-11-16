import { GRID_SIZE } from './game-config';
import { Direction, GameState, Position, Tile } from './types';

export function createInitialState(): GameState {
  return {
    tiles: [],
    size: GRID_SIZE,
    score: 0,
    bestScore: 0,
    isLocked: false,
    gameOver: false,
  };
}

export function createInitialTiles(state: GameState): Tile[] {
  state = addRandomTile(state);
  state = addRandomTile(state);

  return state.tiles;
}

export function getFreePositions(state: GameState): Position[] {
  const { tiles, size } = state;
  // Ignoruj tile'y oznaczone jako isMerging przy sprawdzaniu wolnych pozycji
  const occupied = new Set<string>(
    tiles.filter((t) => !t.isMerging).map((t) => `${t.row},${t.col}`)
  );

  const free: Position[] = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!occupied.has(`${row},${col}`)) free.push({ row, col });
    }
  }
  return free;
}

export function addRandomTile(state: GameState): GameState {
  const freePositions = getFreePositions(state);
  if (freePositions.length === 0) return state;

  const pos = freePositions[Math.floor(Math.random() * freePositions.length)];
  const newTile: Tile = {
    id: crypto.randomUUID(),
    value: Math.random() < 0.9 ? 2 : 4,
    row: pos.row,
    col: pos.col,
    isNew: true,
  };

  return { ...state, tiles: [...state.tiles, newTile] };
}

/**
 * Returns true when at least one move is possible.
 * Quick check: if any free position exists, a move is possible.
 * Otherwise check horizontal and vertical neighbors for equal values.
 */
export function hasPossibleMoves(state: GameState): boolean {
  // If there's at least one free cell, a move is possible
  if (getFreePositions(state).length > 0) return true;

  const { size, tiles } = state;

  // Build a lookup map for occupied tiles (ignore tiles that are merging)
  const lookup = new Map<string, Tile>();
  tiles
    .filter((t) => !t.isMerging)
    .forEach((t) => {
      lookup.set(`${t.row},${t.col}`, t);
    });

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const key = `${row},${col}`;
      const tile = lookup.get(key);
      if (!tile) continue;

      // Check right neighbor (avoid duplicate checks by only checking right and down)
      if (col + 1 < size) {
        const right = lookup.get(`${row},${col + 1}`);
        if (right && right.value === tile.value) return true;
      }

      // Check down neighbor
      if (row + 1 < size) {
        const down = lookup.get(`${row + 1},${col}`);
        if (down && down.value === tile.value) return true;
      }
    }
  }

  // No free cells and no adjacent equal tiles => no moves
  return false;
}

function moveLeft(state: GameState): GameState {
  const { size } = state;
  const newTiles: Tile[] = [];
  const mergedIds = new Set<string>();
  let scoreIncrease = 0;

  for (let row = 0; row < size; row++) {
    const rowTiles = state.tiles
      .filter((t) => t.row === row && !t.isMerging)
      .sort((a, b) => a.col - b.col);

    let targetCol = 0;

    for (let i = 0; i < rowTiles.length; i++) {
      const tile = rowTiles[i];
      const next = rowTiles[i + 1];

      if (next && tile.value === next.value && !mergedIds.has(next.id)) {
        // Dodaj nowy zmergowany tile
        const mergedValue = tile.value * 2;
        const mergedTile: Tile = {
          id: crypto.randomUUID(),
          value: mergedValue,
          row,
          col: targetCol,
          mergedFrom: [tile.id, next.id],
        };
        mergedIds.add(tile.id);
        mergedIds.add(next.id);
        newTiles.push(mergedTile);
        scoreIncrease += mergedValue;

        // Dodaj stare tile'y z flagą isMerging i zaktualizowaną pozycją
        newTiles.push({ ...tile, row, col: targetCol, isMerging: true });
        newTiles.push({ ...next, row, col: targetCol, isMerging: true });
        i++;
      } else if (!mergedIds.has(tile.id)) {
        newTiles.push({ ...tile, row, col: targetCol });
      }
      targetCol++;
    }
  }

  const updatedScore = state.score + scoreIncrease;
  const updatedBest = Math.max(state.bestScore, updatedScore);

  return {
    ...state,
    tiles: newTiles,
    score: updatedScore,
    bestScore: updatedBest,
  };
}

function transformForDirection(tile: Tile, dir: Direction, size: number): Tile {
  switch (dir) {
    case Direction.Right:
      return { ...tile, col: size - 1 - tile.col };
    case Direction.Up:
      return { ...tile, row: tile.col, col: tile.row };
    case Direction.Down:
      return { ...tile, row: tile.col, col: size - 1 - tile.row };
    default: // Left
      return tile;
  }
}

function reverseTransform(tile: Tile, dir: Direction, size: number): Tile {
  switch (dir) {
    case Direction.Right:
      return { ...tile, col: size - 1 - tile.col };
    case Direction.Up:
      return { ...tile, row: tile.col, col: tile.row };
    case Direction.Down:
      return { ...tile, row: size - 1 - tile.col, col: tile.row };
    default: // Left
      return tile;
  }
}

export function move(state: GameState, dir: Direction): GameState {
  const { size } = state;

  // 1. Ztransformuj planszę tak, żeby ruch był zawsze w lewo
  const transformed = {
    ...state,
    tiles: state.tiles.map((t) => transformForDirection(t, dir, size)),
  };

  // 2. Wykonaj faktyczny ruch w lewo
  const moved = moveLeft(transformed);

  // 3. Cofnij transformację do oryginalnych współrzędnych
  const reverted = {
    ...moved,
    tiles: moved.tiles.map((t) => reverseTransform(t, dir, size)),
  };

  return reverted;
}
