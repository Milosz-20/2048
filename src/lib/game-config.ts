/**
 * Konfiguracja gry 2048
 * Wszystkie wymiary i stałe w jednym miejscu
 */

// Podstawowe wymiary
export const GRID_SIZE = 4; // rozmiar planszy 4x4
export const TILE_SIZE = 100; // rozmiar pojedynczego kafelka w px
export const TILE_GAP = 8; // odstęp między kafelkami w px
export const TILE_PADDING = 2; // padding wewnętrzny kafelka w px

// Animacje
export const MOVE_ANIMATION_DURATION = 100; // czas trwania animacji ruchu kafelków w ms
export const TILE_ANIMATION_SCALE_NEW = 0.95; // początkowa skala dla nowych kafelków
export const TILE_ANIMATION_SCALE_NORMAL = 1; // normalna skala kafelków
export const TILE_ANIMATION_SCALE_MERGED = 1.05; // skala kafelków po zmergowaniu (efekt "pop")
export const TILE_ANIMATION_SCALE_EXIT = 0.95; // skala kafelków podczas znikania

// Obliczone wymiary
export const BOARD_SIZE = GRID_SIZE * TILE_SIZE + (GRID_SIZE + 1) * TILE_GAP; // całkowity rozmiar planszy

// Style dla różnych wartości kafelków
export const TILE_COLORS: Record<number, string> = {
  2: 'bg-amber-100',
  4: 'bg-amber-200',
  8: 'bg-orange-300',
  16: 'bg-orange-400',
  32: 'bg-red-400',
  64: 'bg-red-500',
  128: 'bg-yellow-400',
  256: 'bg-yellow-500',
  512: 'bg-yellow-600',
  1024: 'bg-yellow-700',
  2048: 'bg-yellow-800',
};

// Kolory tekstu - ciemny dla jasnych tła, jasny dla ciemnych tła
export const TILE_TEXT_COLORS: Record<number, string> = {
  2: 'text-gray-800',
  4: 'text-gray-800',
  8: 'text-white',
  16: 'text-white',
  32: 'text-white',
  64: 'text-white',
  128: 'text-white',
  256: 'text-white',
  512: 'text-white',
  1024: 'text-white',
  2048: 'text-white',
};
