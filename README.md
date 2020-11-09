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
const tafl = new Tafl()
let state = tafl.initialState()

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
##### `getPossibleActions(state): GameAction[]`
Given a state, returns all possible actions that can be chosen

##### `isActionPossible(state, action: GameAction): boolean`
Returns true if action is possible in given state, false otherwise

##### `isGameOver(state): typeof state`
Given a state, returns new state with game over information. If game is over, returned state object will have
`{result: { finished: true }}` with additional information like `result.winner` and `result.desc`.

##### `act(state, action: GameAction): typeof state`
Given a state and an action, applies that action and returns the new state.

