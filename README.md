# tafl

A Typescript library for Hnefatafl (Viking Chess, or Tafl) that is used for move generation/validation, piece placement/movement, and game over detection.

You can use it to simulate games between AI agents - although you need to write the agents yourself :)

## Installation

```
npm install tafl
```

## Features
This library has support for these:

- [X] Defenders can build exit forts (edge forts) on the sides for the king to run and win the game `TaflRule.EXIT_FORTS`
- [X] Both sides can capture multiple pieces on the sides with shieldwall captures `TaflRule.SHIELD_WALLS`
- [X] If attackers surround all defender pieces, game ends
- [X] If any side has no moves left, they lose
- [X] King can escape from edges optionally (in addition to corners, usually used in smaller boards) `TaflRule.EDGE_ESCAPE`
- [X] King can be armed or not. Armed kings can help with capturing pieces. `TaflRule.KING_IS_ARMED`
- [X] King can return to center or not. In some variations, returning to center base is not possible. `TaflRule.KING_CAN_RETURN_TO_CENTER`
- [X] Attackers can capture the king with 2, 3, or 4 pieces. In Copenhagen, king has to be surrounded from 4 sides, but this behavior can be modified. `TaflRule.ATTACKER_COUNT_TO_CAPTURE`
- [X] Setting the starting side for the game. In Copenhagen, attackers start the game. `TaflRule.STARTING_SIDE`
- [X] Changing the width of corners. Usually corners are one piece, but in Alea Evangelii variation, corners are 2x2 `TaflRule.CORNER_BASE_WIDTH`
- [X] Game ends on 3-fold repetition. The repeating board states do not have to be in succession. You can modify this number (3) through rules. `TaflRule.REPETITION_TURN_LIMIT`

## Basic example
Uses Copenhagen rules on 11x11 board, plays both sides with random agent

```js
const { Tafl } = require('tafl')

const tafl = new Tafl()
let state = tafl.initialState() // by default uses Copenhagen rules on 11x11 board

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
| `TaflRule.SAVE_BOARD_HISTORY` | Boolean | true | If you don't save board history, repetition checks are not disabled. You may want to set this to false for simulations as it has a big effect on speed. |
| `TaflRule.SAVE_ACTIONS` | Boolean | true | Saving actions may not be required for simulations. You may want to set this to false for simulations, but it has a tiny effect on speed. |


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

## Methods & properties
Full list of methods and properties, taken from type definitions file and is subject to change.

```js
name: string;
controlMap: Map<TaflSide, Set<Piece>>;
sideMap: Map<Piece, TaflSide>;
initialState(init?: any): GameState;
log(thing: any): void;
isCenter(state: any, coords: Coords): boolean;
isCorner(state: any, coords: Coords): boolean;
isEdge(state: any, coords: Coords): boolean;
repr(coords: Coords): String;
coords(repr: String): Coords;
toPathRepr(...args: any[]): String;
toPathCoords(path: String): Array<Coords>;
insideBounds(state: any, coords: Coords): boolean;
connectedPieces(state: any, coords: Coords, side: TaflSide): Set<String>;
connectedDefenders(state: any, coords: Coords): Set<String>;
connectedAttackers(state: any, coords: Coords): Set<String>;
possiblySurroundingPieces(state: any, kingCoords: Coords, side: TaflSide): Array<Coords>;
possiblySurrondingDefenders(state: any, kingCoords: Coords): Array<Coords>;
possiblySurrondingAttackers(state: any, kingCoords: Coords): Array<Coords>;
isInsideEye(state: any, coords: Coords, fullFortStructure: Set<String>): boolean;
getPossibleSmallestFortStructure(state: any, innerSet: Set<String>, fullStructure: Set<String>): Set<String>;
getEmptyPiecesAndOpponentsInsideSmallestClosedStructure(state: any, kingCoords: Coords, closedStructure: Set<String>, oppSide?: TaflSide): Array<Set<String>>;
getEmptyPiecesAndAttackersInsideSmallestFort(state: any, kingCoords: Coords, fullFortStructure: Set<String>): Array<Set<String>>;
insideFort(state: any, kingCoords: Coords): boolean;
kingEscapedThroughFort(state: any): boolean;
isBase(state: any, coords: Coords): boolean;
isEmpty(state: any, coords: Coords): boolean;
isEmptyBase(state: any, coords: Coords): boolean;
isKing(state: any, coords: Coords): boolean;
isAttacker(state: any, coords: Coords): boolean;
isDefender(state: any, coords: Coords): boolean;
isDfOrKing(state: any, coords: Coords): boolean;
canHelpCapture(state: any, coords: Coords, canHelp: TaflSide): boolean;
turnSide(state: any): TaflSide;
opponentSide(state: any): TaflSide;
canControl(side: TaflSide, piece: Piece): boolean;
sideOfPiece(piece: Piece): TaflSide;
pieceAt(state: any, coords: Coords): Piece;
canMovePieceHere(state: any, piece: Piece, coords: Coords): boolean;
getPossibleMovesFrom(state: any, coords: Coords): Array<Coords>;
canMakeAMove(state: any, side: TaflSide): boolean;
getKingCoords(state: any): Coords;
didAttackersSurroundDefenders(state: any): boolean;
fortSearchFromKing(state: any, kingCoords: Coords): boolean;
canBeCaptured(state: any, coords: Coords, side: TaflSide): boolean;
checkCaptures(state: any): Array<Coords>;
checkShieldWalls(state: any): Array<Coords>;
getBoardHash(state: any): string;
addBoardToHistory(state: any, board: any): typeof state;
getEquivalentBoards(board: any): {};
getPossibleActions(state: any, side?: TaflSide): Array<MoveAction>;
// Given a state, returns all possible actions that can be chosen
isActionPossible(state: any, act: MoveAction): boolean;
// Returns true if action is possible in given state, false otherwise
isGameOver(state: any): typeof state;
// Given a state, returns new state with game over information. If game is over, returned state object will have `{result: { finished: true }}` with additional information like `result.winner` and `result.desc`.
act(state: any, moveAction: MoveAction): typeof state;
// Given a state and an action, applies that action and returns the new state.
```

## Author
Created by Demircan Celebi in 2020 for use at https://litafl.com/tafl
