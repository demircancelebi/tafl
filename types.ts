interface Named {
  name: String
}

class Player implements Named {
  name: String
  [_: string]: any
}

interface GameAction {}

interface Coords {
  readonly r: number
  readonly c: number
}

interface MoveAction extends GameAction {
  from: Coords
  to: Coords
}

interface PutAction extends GameAction {
  to: Coords
}

interface Board {
}

interface Game extends Named {
  getPossibleActions(state): GameAction[]
  isActionPossible(state, action: GameAction): boolean
  isGameOver(state): typeof state
  act(state, action: GameAction): typeof state
}

interface GameState {
  board: Board
  turn: number
  result: {
    finished: boolean
    winner: Side
    desc: string
  }
  lastAction: GameAction
  rules: { [key: string]: Rule }
}

class Side extends String {}
class Rule {}
class RuleSet {}

export { Player, Board, GameState, GameAction, MoveAction, PutAction, Game, Coords, Side, Rule, RuleSet }
