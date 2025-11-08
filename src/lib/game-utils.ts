import { Direction, GameState, Position, Tile } from './types';

export function createInitialState(size: number): GameState {
  let state: GameState = { tiles: [], size };

  state = addRandomTile(state);
  state = addRandomTile(state);

  return state;
}

function getFreePositions(state: GameState) {
  const { tiles, size } = state;
  const occupiedPositions = new Set<string>();

  tiles.forEach((tile) => {
    occupiedPositions.add(`${tile.row},${tile.col}`);
  });

  const freePositions: Position[] = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!occupiedPositions.has(`${row},${col}`)) {
        freePositions.push({ row, col });
      }
    }
  }
  return freePositions;
}

function addRandomTile(state: GameState): GameState {
  const freePositions = getFreePositions(state);

  if (freePositions.length === 0) return state;

  const randomPos =
    freePositions[Math.floor(Math.random() * freePositions.length)];

  const newTile: Tile = {
    id: crypto.randomUUID(),
    value: Math.random() < 0.9 ? 2 : 4, // 90% chance of 2, 10% chance of 4
    row: randomPos.row,
    col: randomPos.col,
    previousRow: randomPos.row,
    previousCol: randomPos.col,
  };

  return { ...state, tiles: [...state.tiles, newTile] };
}

function hasBoardChanged(before: Tile[], after: Tile[]): boolean {
  if (before.length !== after.length) {
    return true;
  }

  const normalize = (tiles: Tile[]) =>
    tiles
      .map((tile) => ({ row: tile.row, col: tile.col, value: tile.value }))
      .sort((a, b) => {
        if (a.row !== b.row) return a.row - b.row;
        if (a.col !== b.col) return a.col - b.col;
        return a.value - b.value;
      });

  const beforeNormalized = normalize(before);
  const afterNormalized = normalize(after);

  for (let i = 0; i < beforeNormalized.length; i++) {
    const beforeTile = beforeNormalized[i];
    const afterTile = afterNormalized[i];

    if (
      beforeTile.row !== afterTile.row ||
      beforeTile.col !== afterTile.col ||
      beforeTile.value !== afterTile.value
    ) {
      return true;
    }
  }

  return false;
}

function moveLeft(state: GameState): GameState {
  const { size } = state;
  const newTiles: Tile[] = [];
  const mergedIds = new Set<string>();

  for (let row = 0; row < size; row++) {
    const rowTiles = state.tiles
      .filter((t) => t.row === row)
      .sort((a, b) => a.col - b.col);

    let targetCol = 0;

    for (let i = 0; i < rowTiles.length; i++) {
      const tile = rowTiles[i];
      const next = rowTiles[i + 1];
      tile.previousRow = tile.row;
      tile.previousCol = tile.col;

      if (next && tile.value === next.value && !mergedIds.has(next.id)) {
        const mergedTile: Tile = {
          id: crypto.randomUUID(),
          value: tile.value * 2,
          row,
          col: targetCol,
          previousCol: tile.col,
          previousRow: tile.row,
          mergedFrom: [tile.id, next.id],
        };
        mergedIds.add(tile.id);
        mergedIds.add(next.id);
        newTiles.push(mergedTile);
        i++;
      } else if (!mergedIds.has(tile.id)) {
        newTiles.push({ ...tile, row, col: targetCol });
      }
      targetCol++;
    }
  }
  return { ...state, tiles: newTiles };
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

export function move(state: GameState, direction: Direction): GameState {
  const { size } = state;

  const transformed = state.tiles.map((t) =>
    transformForDirection(t, direction, size)
  );

  const moved = moveLeft({ ...state, tiles: transformed });

  const reverted = moved.tiles.map((t) => reverseTransform(t, direction, size));

  const nextState: GameState = { ...moved, tiles: reverted };

  if (!hasBoardChanged(state.tiles, nextState.tiles)) {
    return state;
  }

  return addRandomTile(nextState);
}
