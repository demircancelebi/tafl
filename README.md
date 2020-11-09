# tafl

A Typescript library for Hnefatafl (Viking Chess, or Tafl) that is used for move generation/validation, piece placement/movement, and game over detection.

You can use it to simulate games between AI agents - although you need to write the agents yourself :)

## Features
These behaviors can be modified with rules:

- [X] Exit forts
- [X] Shieldwall captures
- [X] King can escape from edges (in addition to corners, usually used in smaller boards)
- [X] King armed or not
- [X] King can return to center or not
- [X] Attackers can capture with 2, 3, or 4 pieces
- [X] Game starts with attackers or defenders
- [X] Width of corners, usually corners are one piece, but in Alea Evangelii variation, corners are 2x2

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

tafl.log(state)
// -> { turn: 604,
//      result: { finished: true, winner: 'Defender', desc: 'King escaped from corner' },
//      lastAction: { from: { r: 10, c: 2 }, to: { r: 10, c: 0 } },
//      rules:
//       { kingIsArmed: true,
//         kingCanReturnToCenter: true,
//         attackerCountToCapture: 4,
//         shieldWalls: true,
//         exitForts: true,
//         edgeEscape: false,
//         cornerBaseWidth: 1,
//         startingSide: 'Attacker' },
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
const { Piece, TaflBoard, TaflRule, TaflRuleSet, Tafl } = require('tafl')

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

- `TaflRule.KING_IS_ARMED`
- `TaflRule.KING_CAN_RETURN_TO_CENTER`
- `TaflRule.ATTACKER_COUNT_TO_CAPTURE`
- `TaflRule.SHIELD_WALLS`
- `TaflRule.EXIT_FORTS`
- `TaflRule.EDGE_ESCAPE`
- `TaflRule.CORNER_BASE_WIDTH`
- `TaflRule.STARTING_SIDE`

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
    [TaflRule.CORNER_BASE_WIDTH]: 2
  }
})

while (!state.result.finished) {
  const possibleActions = tafl.getPossibleActions(state)
  const randomAction = possibleActions[Math.floor(Math.random() * possibleActions.length)];

  state = tafl.act(state, randomAction)
}

tafl.log(state)
// -> { turn: 12,
//      result: { finished: true, winner: 'Defender', desc: 'King escaped from edge' },
//      lastAction: { from: { r: 4, c: 3 }, to: { r: 4, c: 6 } },
//      rules:
//       { kingIsArmed: true,
//         kingCanReturnToCenter: true,
//         attackerCountToCapture: 4,
//         shieldWalls: true,
//         exitForts: true,
//         edgeEscape: true,
//         cornerBaseWidth: 2,
//         startingSide: 'Attacker' },
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
connectedDefenders(state: any, coords: Coords): Set<String>;
possiblySurrondingDefenders(state: any, kingCoords: Coords): Array<Coords>;
isInsideEye(state: any, coords: Coords, fullFortStructure: Set<String>): boolean;
getPossibleSmallestFortStructure(state: any, innerSet: Set<String>, fullStructure: Set<String>): Set<String>;
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
controlMap: Map<TaflSide, Set<Piece>>;
sideMap: Map<Piece, TaflSide>;
canControl(side: TaflSide, piece: Piece): boolean;
sideOfPiece(piece: Piece): TaflSide;
pieceAt(state: any, coords: Coords): Piece;
canMovePieceHere(state: any, piece: Piece, coords: Coords): boolean;
getPossibleMovesFrom(state: any, coords: Coords): Array<Coords>;
canMakeAMove(state: any, side: TaflSide): boolean;
fortSearchFromKing(state: any, kingCoords: Coords): boolean;
getPossibleActions(state: any, side?: TaflSide): Array<MoveAction>;
// Given a state, returns all possible actions that can be chosen
isActionPossible(state: any, act: MoveAction): boolean | never;
// Returns true if action is possible in given state, false otherwise
isGameOver(state: any): typeof state;
// Given a state, returns new state with game over information. If game is over, returned state object will have `{result: { finished: true }}` with additional information like `result.winner` and `result.desc`.
canBeCaptured(state: any, coords: Coords, side: TaflSide): boolean;
checkCaptures(state: any): Array<Coords>;
checkShieldWalls(state: any): Array<Coords>;
act(state: any, moveAction: MoveAction): typeof state;
// Given a state and an action, applies that action and returns the new state.
```

## Author
Created by Demircan Celebi in 2020 for use at https://litafl.com/tafl
