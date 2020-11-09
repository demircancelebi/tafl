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

// class Room {
//   players?: Map<String, Player>
//   game?: Game

//   constructor() {}

//   chooseGame(game: Game) {
//     this.game = game
//   }

//   addPlayer(index: String, p: Player) {
//     this.players.set(index, p);
//   }

//   removePlayer(index: String): boolean {
//     return this.players.delete(index);
//   }
// }

// enum Acts {
//   CHOOSE_GAME = "CHOOSE_GAME",
//   GET_ACTIONS = "GET_ACTIONS",
//   ADD_PLAYER = "ADD_PLAYER",
//   SET_PLAYER_COUNT = "SET_PLAYER_COUNT",
//   REMOVE_PLAYER = "REMOVE_PLAYER",
//   USE_BOARD = "USE_BOARD",
//   USE_RULESET = "USE_RULESET",
//   USE_RULE = "USE_RULE",
//   ACT = "ACT",
//   FINISHED = "FINISHED"
// }

class Side extends String {}
class Rule {}
class RuleSet {}

export { Player, Board, GameState, GameAction, MoveAction, PutAction, Game, Coords, Side, Rule, RuleSet }
