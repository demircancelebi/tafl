# tafl

A Typescript library for Hnefatafl (Viking Chess, or Tafl) that is used for move generation/validation, piece placement/movement, and game over detection.

You can use it to simulate games between AI agents - although you need to write the agents yourself :)

## Installation

```
npm install tafl
```

## Features
This library has support for these:

- [X] **Exit forts:** Defenders can build exit forts (edge forts) on the sides for the king to run and win the game
- [X] **Shieldwall:** Both sides can capture multiple pieces on the sides with shieldwall captures
- [X] **Repetition checks:** Game ends on 3-fold repetition. The repeating board states do not have to be in succession. You can modify this number (3) through rules.
- [X] If attackers surround all defender pieces, game ends
- [X] If any side has no moves left, they lose
- [X] King can escape from edges optionally (in addition to corners, usually used in smaller boards)
- [X] King can be armed or not. Armed kings can help with capturing pieces.
- [X] King can return to center or not. In some variations of the game, returning to center base is forbidden.
- [X] Attackers can capture the king with 2, 3, or 4 pieces. In Copenhagen, king has to be surrounded from 4 sides, but this behavior can be modified.
- [X] Setting the starting side for the game. In Copenhagen, attackers start the game.
- [X] Changing the width of corners. Usually corners are one square, but in Alea Evangelii variation, corners are 2x2

You can use the library with an arbitrary game state. (set the board/rules as you'd like and start using the library from that game state, useful for setting up specific board states)

## Basic example
Uses Copenhagen rules on 11x11 board, plays both sides with random agent

```js
const { Tafl } = require('tafl')

const tafl = new Tafl()
let state = tafl.initialState() // by default uses Copenhagen rules on 11x11 board with the classical starting position, you can use a different state if you want

while (!state.result.finished) {
  const possibleActions = tafl.getPossibleActions(state)
  const randomAction = possibleActions[Math.floor(Math.random() * possibleActions.length)];

  state = tafl.act(state, randomAction)
}

tafl.log({ turn: state.turn, result: state.result, lastAction: state.lastAction, board: state.board })
// -> { turn: 604,
//      result: { finished: true, winner: 'Defender', desc: 'King escaped from corner' },
//      lastAction: { from: { r: 10, c: 2 }, to: { r: 10, c: 0 } },
//      board:
//       [ [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
//         [ ' ', ' ', ' ', ' ', ' ', 'A', ' ', ' ', ' ', ' ', ' ' ],
//         [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
//         [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
//         [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'A', 'A', 'A' ],
//         [ 'D', 'A', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'A' ],
//         [ ' ', ' ', 'A', ' ', ' ', ' ', 'A', ' ', ' ', ' ', 'A' ],
//         [ ' ', ' ', ' ', ' ', 'A', ' ', ' ', 'A', ' ', 'A', ' ' ],
//         [ ' ', ' ', ' ', ' ', 'D', 'A', ' ', 'A', ' ', ' ', ' ' ],
//         [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'A', 'A', 'A', ' ' ],
//         [ 'K', ' ', ' ', ' ', ' ', ' ', 'A', ' ', ' ', ' ', ' ' ] ] }

```
## API
You can import these different objects:
```js
const { Piece, TaflBoard, TaflRule, TaflRuleSet, Tafl } = require('tafl')
```

### Piece
Used as an enum. Has `__` key for empty places, `PA` for attackers, `PD` for defenders, and `PK` for king.

```js
console.log(Piece)
// -> { __: ' ', PA: 'A', PD: 'D', PK: 'K' }
```

### TaflBoard
You can pass a custom board to the `tafl.initialState`. Here are some of the starting positions of different variations for the game, you can use these or pass a custom board when creating initial state. See examples for usage.

- `TaflBoard._7_BRANDUBH`
- `TaflBoard._9_TABLUT`
- `TaflBoard._11_CLASSIC`
- `TaflBoard._11_LINE`
- `TaflBoard._11_TAWLBWRDD`
- `TaflBoard._11_LEWISS`
- `TaflBoard._13_PARLETT`
- `TaflBoard._15_DAMIEN_WALKER`
- `TaflBoard._19_ALEA_EVANGELII`

### TaflRule
Used as an enum, and maps to string values. Use these to change the behavior of the game. See examples for usage.

| TaflRule name | Type  | Default (In `TaflRuleset.COPENHAGEN` ) |  Description |
|---------------|-------|---------------------------------|--------------|
| `TaflRule.EXIT_FORTS` | Boolean | true | Exit forts   |
| `TaflRule.SHIELD_WALLS` | Boolean | true | Shieldwall captures |
| `TaflRule.EDGE_ESCAPE` | Boolean | false | King can escape from edges (in addition to corners, usually used in smaller boards)     |
| `TaflRule.KING_IS_ARMED` | Boolean | true | King armed or not |
| `TaflRule.KING_CAN_RETURN_TO_CENTER` | Boolean | true | King can return to center or not |
| `TaflRule.ATTACKER_COUNT_TO_CAPTURE` | Number | 4 | Attackers can capture with 2, 3, or 4 pieces |
| `TaflRule.STARTING_SIDE` | TaflSide | TaflSide.ATTACKER | Game starts with attackers or defenders |
| `TaflRule.CORNER_BASE_WIDTH` | Number | 1 | Width of corners, usually corners are one piece, but in Alea Evangelii variation, corners are 2x2 |
| `TaflRule.REPETITION_TURN_LIMIT` | Number | 3 | Repetition turn limit (On copenhagen game draws on [Threefold repetition](https://en.wikipedia.org/wiki/Threefold_repetition), you can modify this number). You can disable `draw on repetititon` by setting `TaflRule.SAVE_BOARD_HISTORY` to `false` |
| `TaflRule.SAVE_BOARD_HISTORY` | Boolean | true | If set to `false`, repetition checks are disabled. If you are running many simulations and can live without repetition checks, set to `false` as it may allow an order of magnitude more simulations in a given time. Otherwise should be `true`. |
| `TaflRule.SAVE_ACTIONS` | Boolean | true | Saving actions may not be required for simulations. Although this has a tiny effect on performance, you may want to set this to `false` too. |


### TaflRuleSet
Used as an enum, used for grouping rules to access with a single name. Only has `COPENHAGEN` value for now. See examples for usage.

- `TaflRuleSet.COPENHAGEN`

## Examples
Start with Copenhagen on 7x7 Brandubh board, allow edge escape and use 2x2 corners:

```js
const { Tafl, TaflBoard, TaflRule, TaflRuleSet } = require('tafl')

const tafl = new Tafl()
let state = tafl.initialState({
  board: TaflBoard._7_BRANDUBH,
  rules: {
    ...TaflRuleSet.COPENHAGEN,
    [TaflRule.EDGE_ESCAPE]: true,
    [TaflRule.CORNER_BASE_WIDTH]: 2,
    [TaflRule.SAVE_BOARD_HISTORY]: false
  }
})

while (!state.result.finished) {
  const possibleActions = tafl.getPossibleActions(state)
  const randomAction = possibleActions[Math.floor(Math.random() * possibleActions.length)];

  state = tafl.act(state, randomAction)
}

tafl.log({ turn: state.turn, result: state.result, lastAction: state.lastAction, board: state.board })
// -> { turn: 12,
//      result: { finished: true, winner: 'Defender', desc: 'King escaped from edge' },
//      lastAction: { from: { r: 4, c: 3 }, to: { r: 4, c: 6 } },
//      board:
//       [ [ ' ', ' ', 'A', 'A', 'D', ' ', ' ' ],
//         [ ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
//         [ ' ', 'A', ' ', 'D', ' ', 'A', ' ' ],
//         [ 'A', ' ', ' ', ' ', ' ', ' ', 'A' ],
//         [ 'D', ' ', ' ', ' ', ' ', ' ', 'K' ],
//         [ ' ', ' ', 'D', 'A', ' ', ' ', ' ' ],
//         [ ' ', ' ', ' ', 'A', ' ', ' ', ' ' ] ] }
```

## Interfaces & properties & methods
### Interfaces
```ts
interface Named {
  name: String;
}
interface Coords {
  readonly r: number;
  readonly c: number;
}
interface MoveAction {
  from: Coords;
  to: Coords;
}
interface Game extends Named {
  getPossibleActions(state: GameState): MoveAction[];
  isActionPossible(state: GameState, action: MoveAction): boolean;
  isGameOver(state: GameState): typeof state;
  act(state: GameState, action: MoveAction): typeof state;
}

export declare type Board = Array<Array<Piece>>;
export interface GameState {
  board?: Board;
  actions?: Array<MoveAction>;
  boardHistory?: Record<string, number>;
  turn?: number;
  result?: {
    finished: boolean;
    winner?: TaflSide;
    desc: string;
  };
  captures?: Array<Coords>;
  lastAction?: MoveAction;
  rules?: {
    [key: string]: TaflRule;
  };
}
```

### Properties & Methods
Full list of methods and properties, taken from type definitions file and is subject to change.

```ts
name: string;
controlMap: Map<TaflSide, Set<Piece>>;
sideMap: Map<Piece, TaflSide>;
initialState(init?: GameState): GameState;
log(thing: any): void;
isCenter(board: Board, coords: Coords): boolean;
isCorner(state: GameState, coords: Coords): boolean;
isEdge(state: GameState, coords: Coords): boolean;
repr(coords: Coords): String;
coords(repr: String): Coords;
toPathRepr(...args: Array<Coords>): String;
toPathCoords(path: String): Array<Coords>;
insideBounds(board: Board, coords: Coords): boolean;
connectedPieces(board: Board, coords: Coords, side: TaflSide): Set<String>;
connectedDefenders(board: Board, coords: Coords): Set<String>;
connectedAttackers(board: Board, coords: Coords): Set<String>;
possiblySurroundingPieces(board: Board, kingCoords: Coords, side: TaflSide): Array<Coords>;
possiblySurrondingDefenders(board: Board, kingCoords: Coords): Array<Coords>;
possiblySurrondingAttackers(board: Board, kingCoords: Coords): Array<Coords>;
isInsideEye(board: Board, coords: Coords, fullFortStructure: Set<String>): boolean;
getPossibleSmallestFortStructure(board: Board, innerSet: Set<String>, fullStructure: Set<String>): Set<String>;
getEmptyPiecesAndOpponentsInsideSmallestClosedStructure(board: Board, kingCoords: Coords, closedStructure: Set<String>, oppSide?: TaflSide): Array<Set<String>>;
getEmptyPiecesAndAttackersInsideSmallestFort(board: Board, kingCoords: Coords, fullFortStructure: Set<String>): Array<Set<String>>;
insideFort(board: Board, kingCoords: Coords): boolean;
kingEscapedThroughFort(state: GameState): boolean;
isBase(state: GameState, coords: Coords): boolean;
isEmpty(board: Board, coords: Coords): boolean;
isEmptyBase(state: GameState, coords: Coords): boolean;
isKing(board: Board, coords: Coords): boolean;
isAttacker(board: Board, coords: Coords): boolean;
isDefender(board: Board, coords: Coords): boolean;
isDefenderOrKing(board: Board, coords: Coords): boolean;
canHelpCapture(state: GameState, coords: Coords, canHelp: TaflSide): boolean;
turnSide(state: GameState): TaflSide;
opponentSide(state: GameState): TaflSide;
canControl(side: TaflSide, piece: Piece): boolean;
sideOfPiece(piece: Piece): TaflSide | undefined;
pieceAt(board: Board, coords: Coords): Piece;
canMovePieceHere(state: GameState, piece: Piece, coords: Coords): boolean;
getPossibleMovesFrom(state: GameState, coords: Coords): Array<Coords>;
canMakeAMove(state: GameState, side: TaflSide): boolean;
getKingCoords(board: Board): Coords;
didAttackersSurroundDefenders(board: Board): boolean;
canBeCaptured(board: Board, coords: Coords, side: TaflSide): boolean;
checkCaptures(state: GameState): Array<Coords>;
checkShieldWalls(state: GameState): Array<Coords>;
getBoardHash(board: Board): string;
addBoardToHistory(state: GameState, board: Board): typeof state;
getEquivalentBoards(board: Board): Record<string, Board>;
fortSearchFromKing(board: Board, kingCoords: Coords): boolean;
getPossibleActions(state: GameState, side?: TaflSide): Array<MoveAction>;
// Given a state, returns all possible actions that can be chosen
isActionPossible(state: GameState, act: MoveAction): boolean;
// Returns true if action is possible in given state, false otherwise
isGameOver(state: GameState): typeof state;
// Given a state, returns new state with game over information. If game is over, returned state object will have `{result: { finished: true }}` with additional information like `result.winner` and `result.desc`.
act(state: GameState, moveAction: MoveAction): typeof state;
// Given a state and an action, applies that action and returns the new state.
```

## Author
Created by Demircan Celebi in 2020-2022 for use at https://litafl.com/tafl
