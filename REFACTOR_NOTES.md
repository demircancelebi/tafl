# Refactor Notes

## Repetition Hotspots

1. `checkShieldWalls` repeats near-identical edge scanning logic for 4 directions.
   - Location: `src/index.ts` (method starts around line 918)

2. `checkCaptures` repeats directional capture checks for up/down/left/right.
   - Location: `src/index.ts` (method starts around line 873)

3. `getPossibleMovesFrom` has 4 similar ray-walk loops (one per direction).
   - Location: `src/index.ts` (method starts around line 711)

4. `getEquivalentBoards` manually enumerates 8 board symmetries with repeated hash/add blocks.
   - Location: `src/index.ts` (method starts around line 1063)

5. Board clone logic is duplicated (`board.map((row) => row.slice())`).
   - Locations include: `src/index.ts` around lines 851, 1064, 1256, 1553

6. `neighbors_4` is redefined in multiple methods.
   - Locations include: `src/index.ts` around lines 406, 475, 520

7. `isGameOver` repeats similar `Object.assign` result blocks.
   - Location: `src/index.ts` (method starts around line 1352)

## Suggested Refactor Order

1. Extract shared helpers/constants first (lowest risk):
   - `cloneBoard(board)`
   - shared directional arrays (`DIR4`, optional `DIR8`)
   - optional `finish(state, winner, desc)` helper for game-over result shaping

2. Refactor directional logic in:
   - `getPossibleMovesFrom`
   - `checkCaptures`

3. Refactor `getEquivalentBoards` to iterate generated transforms instead of manual repetition.

4. Refactor `checkShieldWalls` last (most rule-sensitive section).
