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

export enum Piece {
  __ = " ",
  PA = "A",
  PD = "D",
  PK = "K",
}
export type Board = Array<Array<Piece>>;

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
  rules?: { [key: string]: TaflRule };
}

const util = require("util");

const _ = Piece.__;
const A = Piece.PA;
const D = Piece.PD;
const K = Piece.PK;

export class TaflBoard {
  // Irish
  static readonly _7_BRANDUBH = [
    [_, _, _, A, _, _, _],
    [_, _, _, A, _, _, _],
    [_, _, _, D, _, _, _],
    [A, A, D, K, D, A, A],
    [_, _, _, D, _, _, _],
    [_, _, _, A, _, _, _],
    [_, _, _, A, _, _, _],
  ];

  // Saami
  static readonly _9_TABLUT = [
    [_, _, _, A, A, A, _, _, _],
    [_, _, _, _, A, _, _, _, _],
    [_, _, _, _, D, _, _, _, _],
    [A, _, _, _, D, _, _, _, A],
    [A, A, D, D, K, D, D, A, A],
    [A, _, _, _, D, _, _, _, A],
    [_, _, _, _, D, _, _, _, _],
    [_, _, _, _, A, _, _, _, _],
    [_, _, _, A, A, A, _, _, _],
  ];

  static readonly _11_CLASSIC = [
    [_, _, _, A, A, A, A, A, _, _, _],
    [_, _, _, _, _, A, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _],
    [A, _, _, _, _, D, _, _, _, _, A],
    [A, _, _, _, D, D, D, _, _, _, A],
    [A, A, _, D, D, K, D, D, _, A, A],
    [A, _, _, _, D, D, D, _, _, _, A],
    [A, _, _, _, _, D, _, _, _, _, A],
    [_, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, A, _, _, _, _, _],
    [_, _, _, A, A, A, A, A, _, _, _],
  ];

  static readonly _11_LINE = [
    [_, _, _, A, A, A, A, A, _, _, _],
    [_, _, _, _, _, A, _, _, _, _, _],
    [_, _, _, _, _, D, _, _, _, _, _],
    [A, _, _, _, _, D, _, _, _, _, A],
    [A, _, _, _, _, D, _, _, _, _, A],
    [A, A, D, D, D, K, D, D, D, A, A],
    [A, _, _, _, _, D, _, _, _, _, A],
    [A, _, _, _, _, D, _, _, _, _, A],
    [_, _, _, _, _, D, _, _, _, _, _],
    [_, _, _, _, _, A, _, _, _, _, _],
    [_, _, _, A, A, A, A, A, _, _, _],
  ];

  // Welsh
  static readonly _11_TAWLBWRDD = [
    [_, _, _, _, A, A, A, _, _, _, _],
    [_, _, _, _, A, _, A, _, _, _, _],
    [_, _, _, _, _, A, _, _, _, _, _],
    [_, _, _, _, _, D, _, _, _, _, _],
    [A, A, _, _, D, D, D, _, _, A, A],
    [A, _, A, D, D, K, D, D, A, _, A],
    [A, A, _, _, D, D, D, _, _, A, A],
    [_, _, _, _, _, D, _, _, _, _, _],
    [_, _, _, _, _, A, _, _, _, _, _],
    [_, _, _, _, A, _, A, _, _, _, _],
    [_, _, _, _, A, A, A, _, _, _, _],
  ];

  static readonly _11_LEWISS = [
    [_, _, _, _, A, A, A, _, _, _, _],
    [_, _, _, _, A, A, A, _, _, _, _],
    [_, _, _, _, _, D, _, _, _, _, _],
    [_, _, _, _, _, D, _, _, _, _, _],
    [A, A, _, _, _, D, _, _, _, A, A],
    [A, A, D, D, D, K, D, D, D, A, A],
    [A, A, _, _, _, D, _, _, _, A, A],
    [_, _, _, _, _, D, _, _, _, _, _],
    [_, _, _, _, _, D, _, _, _, _, _],
    [_, _, _, _, A, A, A, _, _, _, _],
    [_, _, _, _, A, A, A, _, _, _, _],
  ];

  static readonly _13_PARLETT = [
    [_, _, _, _, A, A, A, A, A, _, _, _, _],
    [_, _, _, _, _, A, _, A, _, _, _, _, _],
    [_, _, _, _, _, _, A, _, _, _, _, _, _],
    [_, _, _, _, _, _, D, _, _, _, _, _, _],
    [A, _, _, _, D, _, _, _, D, _, _, _, A],
    [A, A, _, _, _, D, D, D, _, _, _, A, A],
    [A, _, A, D, _, D, K, D, _, D, A, _, A],
    [A, A, _, _, _, D, D, D, _, _, _, A, A],
    [A, _, _, _, D, _, _, _, D, _, _, _, A],
    [_, _, _, _, _, _, D, _, _, _, _, _, _],
    [_, _, _, _, _, _, A, _, _, _, _, _, _],
    [_, _, _, _, _, A, _, A, _, _, _, _, _],
    [_, _, _, _, A, A, A, A, A, _, _, _, _],
  ];

  static readonly _15_DAMIEN_WALKER = [
    [_, _, _, _, _, A, A, A, A, A, _, _, _, _, _],
    [_, _, _, _, _, _, A, A, A, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, A, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, A, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, D, _, _, _, _, _, _, _],
    [A, _, _, _, _, _, D, D, D, _, _, _, _, _, A],
    [A, A, _, _, _, D, _, D, _, D, _, _, _, A, A],
    [A, A, A, A, D, D, D, K, D, D, D, A, A, A, A],
    [A, A, _, _, _, D, _, D, _, D, _, _, _, A, A],
    [A, _, _, _, _, _, D, D, D, _, _, _, _, _, A],
    [_, _, _, _, _, _, _, D, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, A, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, A, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, A, A, A, _, _, _, _, _, _],
    [_, _, _, _, _, A, A, A, A, A, _, _, _, _, _],
  ];

  static readonly _19_ALEA_EVANGELII = [
    [_, _, A, _, _, A, _, _, _, _, _, _, _, A, _, _, A, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [A, _, _, _, _, A, _, _, _, _, _, _, _, A, _, _, _, _, A],
    [_, _, _, _, _, _, _, A, _, A, _, A, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, A, _, D, _, D, _, A, _, _, _, _, _, _],
    [A, _, A, _, _, A, _, _, _, _, _, _, _, A, _, _, A, _, A],
    [_, _, _, _, A, _, _, _, _, D, _, _, _, _, A, _, _, _, _],
    [_, _, _, A, _, _, _, _, D, _, D, _, _, _, _, A, _, _, _],
    [_, _, _, _, D, _, _, D, _, D, _, D, _, _, D, _, _, _, _],
    [_, _, _, A, _, _, D, _, D, K, D, _, D, _, _, A, _, _, _],
    [_, _, _, _, D, _, _, D, _, D, _, D, _, _, D, _, _, _, _],
    [_, _, _, A, _, _, _, _, D, _, D, _, _, _, _, A, _, _, _],
    [_, _, _, _, A, _, _, _, _, D, _, _, _, _, A, _, _, _, _],
    [A, _, A, _, _, A, _, _, _, _, _, _, _, A, _, _, A, _, A],
    [_, _, _, _, _, _, A, _, D, _, D, _, A, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, A, _, A, _, A, _, _, _, _, _, _, _],
    [A, _, _, _, _, A, _, _, _, _, _, _, _, A, _, _, _, _, A],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, A, _, _, A, _, _, _, _, _, _, _, A, _, _, A, _, _],
  ];
}

export class TaflSide extends String {
  static readonly ATTACKER = "Attacker";
  static readonly DEFENDER = "Defender";
}

export class TaflRepetitionOutcome extends String {
  static readonly DRAW = "draw";
  static readonly DEFENDER_LOSES = "defender-loses";
  static readonly MOVER_LOSES = "mover-loses";
}

export class TaflRule {
  static readonly KING_IS_ARMED = "kingIsArmed";
  static readonly KING_CAN_RETURN_TO_CENTER = "kingCanReturnToCenter";
  static readonly ATTACKER_COUNT_TO_CAPTURE = "attackerCountToCapture";
  static readonly REPETITION_TURN_LIMIT = "repetitionTurnLimit";
  static readonly REPETITION_OUTCOME = "repetitionOutcome";
  static readonly SHIELD_WALLS = "shieldWalls";
  static readonly EXIT_FORTS = "exitForts";
  static readonly EDGE_ESCAPE = "edgeEscape";
  static readonly CORNER_BASE_WIDTH = "cornerBaseWidth";
  static readonly STARTING_SIDE = "startingSide";
  static readonly SAVE_BOARD_HISTORY = "saveBoardHistory";
  static readonly SAVE_ACTIONS = "saveActions";
}

export class TaflRuleSet {
  static readonly COPENHAGEN = {
    [TaflRule.KING_IS_ARMED]: true,
    [TaflRule.KING_CAN_RETURN_TO_CENTER]: true,
    [TaflRule.ATTACKER_COUNT_TO_CAPTURE]: 4,
    [TaflRule.REPETITION_TURN_LIMIT]: 3,
    [TaflRule.REPETITION_OUTCOME]: TaflRepetitionOutcome.DEFENDER_LOSES,
    [TaflRule.SHIELD_WALLS]: true,
    [TaflRule.EXIT_FORTS]: true,
    [TaflRule.EDGE_ESCAPE]: false,
    [TaflRule.CORNER_BASE_WIDTH]: 1,
    [TaflRule.STARTING_SIDE]: TaflSide.ATTACKER,
    [TaflRule.SAVE_BOARD_HISTORY]: true,
    [TaflRule.SAVE_ACTIONS]: true,
  };
}

function rotateLeft<T>(array: Array<Array<T>>): Array<Array<T>> {
  const result: Array<Array<T>> = [];
  array.forEach(function (a, i, aa) {
    a.forEach(function (b, j, bb) {
      result[j] = result[j] || [];
      result[j][aa.length - i - 1] = b;
    });
  });
  return result;
}

const ORTHOGONAL_DIRECTIONS: ReadonlyArray<Coords> = [
  { r: -1, c: 0 },
  { r: 1, c: 0 },
  { r: 0, c: -1 },
  { r: 0, c: 1 },
];

function cloneBoard(board: Board): Board {
  return board.map((row) => row.slice());
}

function getSymmetryVariants(board: Board): Board[] {
  const b = cloneBoard(board);

  const variants: Board[] = [];
  let rotated = b;
  for (let i = 0; i < 4; i += 1) {
    variants.push(rotated);
    rotated = rotateLeft(rotated);
  }

  const mirrored = b.slice().reverse();
  let mirroredRotated = mirrored;
  for (let i = 0; i < 4; i += 1) {
    variants.push(mirroredRotated);
    mirroredRotated = rotateLeft(mirroredRotated);
  }

  return variants;
}

function boardToKey(board: Board): string {
  return board.map((row) => row.join("")).join("|");
}

function canonicalBoardKey(board: Board): string {
  const variants = getSymmetryVariants(board);
  let key = boardToKey(variants[0]);
  for (let i = 1; i < variants.length; i += 1) {
    const cur = boardToKey(variants[i]);
    if (cur < key) {
      key = cur;
    }
  }
  return key;
}

function getBoardRuleOverrides(board: Board): GameState["rules"] {
  if (
    board === TaflBoard._19_ALEA_EVANGELII ||
    boardToKey(board) === boardToKey(TaflBoard._19_ALEA_EVANGELII)
  ) {
    return {
      [TaflRule.CORNER_BASE_WIDTH]: 2,
    };
  }

  return {};
}

const OPPOSITE_NEIGHBOR_PAIRS: ReadonlyArray<ReadonlyArray<Coords>> = [
  [
    { r: -1, c: 0 },
    { r: 1, c: 0 },
  ],
  [
    { r: 0, c: -1 },
    { r: 0, c: 1 },
  ],
];

export class Tafl implements Game {
  name = "Tafl";

  controlMap = new Map<TaflSide, Set<Piece>>([
    [TaflSide.ATTACKER, new Set([Piece.PA])],
    [TaflSide.DEFENDER, new Set([Piece.PD, Piece.PK])],
  ]);

  sideMap = new Map<Piece, TaflSide>([
    [Piece.PA, TaflSide.ATTACKER],
    [Piece.PD, TaflSide.DEFENDER],
    [Piece.PK, TaflSide.DEFENDER],
  ]);

  initialState(init?: GameState): GameState {
    const sourceBoard = init?.board || TaflBoard._11_CLASSIC;
    const board = cloneBoard(sourceBoard);
    const rules = {
      ...TaflRuleSet.COPENHAGEN,
      ...getBoardRuleOverrides(sourceBoard),
      ...(init?.rules || {}),
    };
    const historyKey = canonicalBoardKey(board);
    const initialState: GameState = {
      turn: 0,
      actions: [],
      boardHistory: { [historyKey]: 1 },
      result: {
        finished: false,
        winner: undefined,
        desc: "",
      },
      lastAction: undefined,
      rules,
      board,
    };

    return initialState;
  }

  log(thing: any) {
    console.log(
      util.inspect(thing, {
        showHidden: false,
        depth: null,
        colorize: true,
        maxArrayLength: 100,
        breakLength: 100,
        compact: true,
      })
    );
  }

  isCenter(board: Board, coords: Coords): boolean {
    const n = board.length;
    const center = Math.floor(n / 2);
    return coords.r === center && coords.c === center;
  }

  isCorner(state: GameState, coords: Coords): boolean {
    if (!state.board) {
      return false;
    }

    const n = state.board.length;
    const w = state.rules?.[TaflRule.CORNER_BASE_WIDTH]!;

    let [rowRes, colRes] = [false, false];
    for (let ww = 0; ww < w; ww += 1) {
      rowRes = rowRes || coords.r === ww || coords.r === n - 1 - ww;
      colRes = colRes || coords.c === ww || coords.c === n - 1 - ww;
    }

    return rowRes && colRes;
  }

  isEdge(state: GameState, coords: Coords): boolean {
    if (!state.board) {
      return false;
    }

    const n = state.board.length;
    const fstRow = coords.r === 0;
    const lstRow = coords.r === n - 1;
    const fstCol = coords.c === 0;
    const lstCol = coords.c === n - 1;

    const onEdge = fstRow || lstRow || fstCol || lstCol;

    return onEdge && !this.isCorner(state, coords);
  }

  repr(coords: Coords): String {
    return `${coords.r}_${coords.c}`;
  }

  coords(repr: String): Coords {
    const splitted = repr.split("_");
    return { r: parseInt(splitted[0], 10), c: parseInt(splitted[1], 10) };
  }

  toPathRepr(...args: Array<Coords>): String {
    return args.map(this.repr).join("->");
  }

  toPathCoords(path: String): Array<Coords> {
    return path.split("->").map(this.coords);
  }

  insideBounds(board: Board, coords: Coords): boolean {
    const rowInsideBounds = coords.r >= 0 && coords.r <= board.length - 1;
    const colInsideBounds = coords.c >= 0 && coords.c <= board.length - 1;
    return rowInsideBounds && colInsideBounds;
  }

  connectedPieces(board: Board, coords: Coords, side: TaflSide): Set<String> {
    const that = this;
    function getConnectedPieces(
      board: Board,
      coords: Coords,
      setOfCoords: Set<String>
    ) {
      setOfCoords.add(that.repr(coords));

      for (let r = -1; r <= 1; r += 1) {
        for (let c = -1; c <= 1; c += 1) {
          const newCoords: Coords = { r: coords.r + r, c: coords.c + c };
          const isSelf = r === 0 && c === 0;

          if (
            that.insideBounds(board, newCoords) &&
            !isSelf &&
            ((side === TaflSide.DEFENDER &&
              that.isDefender(board, newCoords)) ||
              (side === TaflSide.ATTACKER && that.isAttacker(board, newCoords)))
          ) {
            if (!setOfCoords.has(that.repr(newCoords))) {
              getConnectedPieces(board, newCoords, setOfCoords);
            }
          }
        }
      }
    }

    const connectedPieces = new Set<String>();
    getConnectedPieces(board, coords, connectedPieces);

    return connectedPieces;
  }

  connectedDefenders(board: Board, coords: Coords): Set<String> {
    return this.connectedPieces(board, coords, TaflSide.DEFENDER);
  }

  connectedAttackers(board: Board, coords: Coords): Set<String> {
    return this.connectedPieces(board, coords, TaflSide.ATTACKER);
  }

  possiblySurroundingPieces(
    board: Board,
    kingCoords: Coords,
    side: TaflSide
  ): Array<Coords> {
    const possiblySurroundingPiecesSet = new Set<String>();
    const processed = new Set<String>();
    const q = new Array<String>();

    q.push(this.repr(kingCoords));

    while (q.length > 0) {
      const curCoords = this.coords(q.pop()!);
      for (const neighbor of ORTHOGONAL_DIRECTIONS) {
        const neighborCoords: Coords = {
          r: curCoords.r + neighbor.r,
          c: curCoords.c + neighbor.c,
        };
        if (
          this.insideBounds(board, neighborCoords) &&
          !processed.has(this.repr(neighborCoords))
        ) {
          if (
            (side === TaflSide.DEFENDER &&
              this.isDefender(board, neighborCoords)) ||
            (side === TaflSide.ATTACKER &&
              this.isAttacker(board, neighborCoords))
          ) {
            possiblySurroundingPiecesSet.add(this.repr(neighborCoords));
          } else {
            q.push(this.repr(neighborCoords));
          }
        }
      }
      processed.add(this.repr(curCoords));
    }

    return [...possiblySurroundingPiecesSet].map(this.coords);
  }

  possiblySurrondingDefenders(board: Board, kingCoords: Coords): Array<Coords> {
    return this.possiblySurroundingPieces(board, kingCoords, TaflSide.DEFENDER);
  }

  possiblySurrondingAttackers(board: Board, kingCoords: Coords): Array<Coords> {
    return this.possiblySurroundingPieces(board, kingCoords, TaflSide.ATTACKER);
  }

  isInsideEye(
    board: Board,
    coords: Coords,
    fullFortStructure: Set<String>
  ): boolean {
    const [smallestEye, attackersInEye] =
      this.getEmptyPiecesAndAttackersInsideSmallestFort(
        board,
        coords,
        fullFortStructure
      );
    if (attackersInEye.size > 0) {
      return false;
    }

    return smallestEye.has(this.repr(coords));
  }

  getPossibleSmallestFortStructure(
    board: Board,
    innerSet: Set<String>,
    fullStructure: Set<String>
  ): Set<String> {
    const processed = new Set<String>();
    const smallest: Set<String> = new Set<String>();
    for (const innerRepr of innerSet) {
      const innerCoords = this.coords(innerRepr);
      for (const neighbor of ORTHOGONAL_DIRECTIONS) {
        const neighborCoords: Coords = {
          r: innerCoords.r + neighbor.r,
          c: innerCoords.c + neighbor.c,
        };
        if (
          this.insideBounds(board, neighborCoords) &&
          !processed.has(this.repr(neighborCoords))
        ) {
          if (this.isDefender(board, neighborCoords)) {
            smallest.add(this.repr(neighborCoords));
          }
          processed.add(this.repr(neighborCoords));
        }
      }
    }

    let intersection = new Set(
      [...fullStructure].filter((x) => smallest.has(x))
    );
    return intersection;
  }

  getEmptyPiecesAndOpponentsInsideSmallestClosedStructure(
    board: Board,
    kingCoords: Coords,
    closedStructure: Set<String>,
    oppSide: TaflSide = TaflSide.ATTACKER
  ): Array<Set<String>> {
    const opponentSet = new Set<String>();
    const innerSet = new Set<String>();
    const processed = new Set<String>();
    const q = new Array<String>();

    q.push(this.repr(kingCoords));

    while (q.length > 0) {
      const curCoords = this.coords(q.pop()!);
      if (
        this.insideBounds(board, curCoords) &&
        !processed.has(this.repr(curCoords))
      ) {
        if (!closedStructure.has(this.repr(curCoords))) {
          if (
            this.isEmpty(board, curCoords) ||
            this.isDefenderOrKing(board, curCoords)
          ) {
            innerSet.add(this.repr(curCoords));
          } else if (
            (oppSide === TaflSide.ATTACKER &&
              this.isAttacker(board, curCoords)) ||
            (oppSide === TaflSide.DEFENDER && this.isDefender(board, curCoords))
          ) {
            opponentSet.add(this.repr(curCoords));
          }

          for (const neighbor of ORTHOGONAL_DIRECTIONS) {
            const neighborCoords: Coords = {
              r: curCoords.r + neighbor.r,
              c: curCoords.c + neighbor.c,
            };
            q.push(this.repr(neighborCoords));
          }
        }
      }

      processed.add(this.repr(curCoords));
    }

    return [innerSet, opponentSet];
  }

  getEmptyPiecesAndAttackersInsideSmallestFort(
    board: Board,
    kingCoords: Coords,
    fullFortStructure: Set<String>
  ): Array<Set<String>> {
    return this.getEmptyPiecesAndOpponentsInsideSmallestClosedStructure(
      board,
      kingCoords,
      fullFortStructure
    );
  }

  insideFort(
    board: Board,
    kingCoords: Coords,
    kingCanReturnToCenter: boolean = true
  ): boolean {
    const onTopOrBottom = kingCoords.r === 0 || kingCoords.r === board.length - 1;
    const onLeftOrRight = kingCoords.c === 0 || kingCoords.c === board.length - 1;
    if (!onTopOrBottom && !onLeftOrRight) {
      return false;
    }

    const kingCanMove = ORTHOGONAL_DIRECTIONS.some((direction) => {
      const destination = {
        r: kingCoords.r + direction.r,
        c: kingCoords.c + direction.c,
      };
      return (
        this.insideBounds(board, destination) &&
        this.isEmpty(board, destination) &&
        (kingCanReturnToCenter || !this.isCenter(board, destination))
      );
    });
    if (!kingCanMove) {
      return false;
    }

    // at least 2 defenders are required for a fort
    const defenderCount = onTopOrBottom
      ? board[kingCoords.r].reduce(
          (acc, piece) => acc + (piece === Piece.PD ? 1 : 0),
          0
        )
      : board.reduce(
          (acc, row) => acc + (row[kingCoords.c] === Piece.PD ? 1 : 0),
          0
        );

    return defenderCount >= 2 && this.fortSearchFromKing(board, kingCoords);
  }

  kingEscapedThroughFort(state: GameState): boolean {
    if (!state.board) {
      return false;
    }

    const kingCoords = this.getKingCoords(state.board);
    if (!kingCoords) {
      return false;
    }

    const onEdge = this.isEdge(state, kingCoords);
    if (!onEdge) {
      return false;
    }

    return this.insideFort(
      state.board,
      kingCoords,
      !!state.rules?.[TaflRule.KING_CAN_RETURN_TO_CENTER]
    );
  }

  isBase(state: GameState, coords: Coords): boolean {
    return this.isCenter(state.board!, coords) || this.isCorner(state, coords);
  }

  isEmpty(board: Board, coords: Coords) {
    return this.pieceAt(board, coords) === Piece.__;
  }

  isEmptyBase(state: GameState, coords: Coords): boolean {
    return this.isBase(state, coords) && this.isEmpty(state.board!, coords);
  }

  isKing(board: Board, coords: Coords): boolean {
    return this.pieceAt(board, coords) === Piece.PK;
  }

  isAttacker(board: Board, coords: Coords): boolean {
    return this.pieceAt(board, coords) === Piece.PA;
  }

  isDefender(board: Board, coords: Coords): boolean {
    return this.pieceAt(board, coords) === Piece.PD;
  }

  isDefenderOrKing(board: Board, coords: Coords): boolean {
    return this.isDefender(board, coords) || this.isKing(board, coords);
  }

  canHelpCapture(state: GameState, coords: Coords, canHelp: TaflSide): boolean {
    const isAttackerAndCanHelpAttackers =
      this.isAttacker(state.board!, coords) && canHelp === TaflSide.ATTACKER;
    const isDefenderAndCanHelpDefenders =
      this.isDefender(state.board!, coords) && canHelp === TaflSide.DEFENDER;
    const isKingAndCanHelpDefenders =
      state.rules?.[TaflRule.KING_IS_ARMED]! &&
      this.isKing(state.board!, coords) &&
      canHelp === TaflSide.DEFENDER;

    return (
      this.isEmptyBase(state, coords) ||
      isAttackerAndCanHelpAttackers ||
      isDefenderAndCanHelpDefenders ||
      isKingAndCanHelpDefenders
    );
  }

  turnSide(state: GameState): TaflSide {
    const evenTurn = state.turn! % 2 === 0;
    const attackerStarts =
      state.rules?.[TaflRule.STARTING_SIDE]! === TaflSide.ATTACKER;
    return attackerStarts === evenTurn ? TaflSide.ATTACKER : TaflSide.DEFENDER;
  }

  opponentSide(state: GameState): TaflSide {
    const turnSide = this.turnSide(state);
    return turnSide === TaflSide.ATTACKER
      ? TaflSide.DEFENDER
      : TaflSide.ATTACKER;
  }

  canControl(side: TaflSide, piece: Piece): boolean {
    return !!this.controlMap.get(side)?.has(piece);
  }

  sideOfPiece(piece: Piece): TaflSide | undefined {
    return this.sideMap.get(piece);
  }

  pieceAt(board: Board, coords: Coords): Piece {
    return board[coords.r][coords.c];
  }

  canMovePieceHere(state: GameState, piece: Piece, coords: Coords): boolean {
    const empty = this.isEmpty(state.board!, coords);
    const king = piece === Piece.PK;
    const base = this.isBase(state, coords);
    const center = this.isCenter(state.board!, coords);
    const corner = this.isCorner(state, coords);
    const centerOk = state.rules?.[TaflRule.KING_CAN_RETURN_TO_CENTER]!;

    return (empty && !base) || (king && ((centerOk && center) || corner));
  }

  getPossibleMovesFrom(state: GameState, coords: Coords): Array<Coords> {
    const res: Coords[] = [];
    if (!state.board) {
      return [];
    }

    const piece: Piece = this.pieceAt(state.board, coords);
    const row = coords.r;
    const col = coords.c;
    const n = state.board.length;

    let rowCount = row - 1;
    while (
      rowCount >= 0 &&
      this.isEmpty(state.board, { r: rowCount, c: col })
    ) {
      if (this.canMovePieceHere(state, piece, { r: rowCount, c: col })) {
        res.push({ r: rowCount, c: col });
      }
      rowCount -= 1;
    }

    rowCount = row + 1;
    while (
      rowCount <= n - 1 &&
      this.isEmpty(state.board, { r: rowCount, c: col })
    ) {
      if (this.canMovePieceHere(state, piece, { r: rowCount, c: col })) {
        res.push({ r: rowCount, c: col });
      }
      rowCount += 1;
    }

    let colCount = col - 1;
    while (
      colCount >= 0 &&
      this.isEmpty(state.board, { r: row, c: colCount })
    ) {
      if (this.canMovePieceHere(state, piece, { r: row, c: colCount })) {
        res.push({ r: row, c: colCount });
      }
      colCount -= 1;
    }

    colCount = col + 1;
    while (
      colCount <= n - 1 &&
      this.isEmpty(state.board, { r: row, c: colCount })
    ) {
      if (this.canMovePieceHere(state, piece, { r: row, c: colCount })) {
        res.push({ r: row, c: colCount });
      }
      colCount += 1;
    }

    return res;
  }

  canMakeAMove(state: GameState, side: TaflSide): boolean {
    return this.getPossibleActions(state, side).length > 0;
  }

  getKingCoords(board: Board): Coords | undefined {
    let kingCoords = null;
    for (const _r in board) {
      const r = parseInt(_r, 10);
      for (const _c in board[r]) {
        const c = parseInt(_c, 10);
        const coords = { r, c };
        if (this.isKing(board, coords)) {
          kingCoords = coords;
        }
      }
    }

    return kingCoords || undefined;
  }

  didAttackersSurroundDefenders(board: Board): boolean {
    const kingCoords = this.getKingCoords(board);
    if (!kingCoords) {
      return false;
    }
    let [top, right, bottom, left] = [0, 0, 0, 0];

    for (let r = 0; r < kingCoords.r; r += 1) {
      if (this.isAttacker(board, { r, c: kingCoords.c })) {
        top += 1;
      }
    }

    for (let r = kingCoords.r + 1; r < board.length; r += 1) {
      if (this.isAttacker(board, { r, c: kingCoords.c })) {
        bottom += 1;
      }
    }

    for (let c = 0; c < kingCoords.c; c += 1) {
      if (this.isAttacker(board, { r: kingCoords.r, c })) {
        left += 1;
      }
    }

    for (let c = kingCoords.c + 1; c < board.length; c += 1) {
      if (this.isAttacker(board, { r: kingCoords.r, c })) {
        right += 1;
      }
    }

    if (top === 0 || right === 0 || bottom === 0 || left === 0) {
      return false;
    }

    const psa = this.possiblySurrondingAttackers(board, kingCoords);
    const psaSet = new Set(psa.map(this.repr));
    const [innerSet, _] =
      this.getEmptyPiecesAndOpponentsInsideSmallestClosedStructure(
        board,
        kingCoords,
        psaSet
      );

    const coordsArr = [...innerSet].map(this.coords);
    const n = board.length;
    const m = board[n - 1].length;
    const ind = coordsArr.findIndex(
      (coords) =>
        coords.r === 0 ||
        coords.c === 0 ||
        coords.r === n - 1 ||
        coords.c === m - 1
    );

    if (ind !== -1) {
      return false;
    }

    const defCount = coordsArr.reduce(
      (acc, cur) => acc + (this.isDefender(board, cur) ? 1 : 0),
      0
    );
    const totCount = board.reduce(
      (acc, cur) =>
        acc + cur.reduce((pAcc, pCur) => pAcc + (pCur === Piece.PD ? 1 : 0), 0),
      0
    );

    if (defCount !== totCount) {
      const boardCopy = cloneBoard(board);
      [...psaSet].map(this.coords).forEach((coords) => {
        boardCopy[coords.r][coords.c] = Piece.__;
      });
      return this.didAttackersSurroundDefenders(boardCopy);
    }

    return true;
  }

  canBeCaptured(board: Board, coords: Coords, side: TaflSide): boolean {
    const mid = this.sideOfPiece(this.pieceAt(board, coords));
    return (
      (side === TaflSide.ATTACKER &&
        mid === TaflSide.DEFENDER &&
        !this.isKing(board, coords)) ||
      (side === TaflSide.DEFENDER && mid === TaflSide.ATTACKER)
    );
  }

  checkCaptures(state: GameState): Array<Coords> {
    let res: Array<Coords> = [];
    if (!state.lastAction?.to || !state.board) {
      return [];
    }

    const [lpr, lpc] = [state.lastAction.to.r, state.lastAction.to.c];
    const side = this.turnSide(state);

    for (const direction of ORTHOGONAL_DIRECTIONS) {
      const midCoords = { r: lpr + direction.r, c: lpc + direction.c };
      const flankCoords = { r: lpr + 2 * direction.r, c: lpc + 2 * direction.c };

      if (
        this.insideBounds(state.board, midCoords) &&
        this.insideBounds(state.board, flankCoords) &&
        this.canHelpCapture(state, flankCoords, side) &&
        this.canBeCaptured(state.board, midCoords, side)
      ) {
        res.push(midCoords);
      }
    }

    if (state.rules?.[TaflRule.SHIELD_WALLS]!) {
      res.push(...this.checkShieldWalls(state));
    }

    return res;
  }

  checkShieldWalls(state: GameState): Array<Coords> {
    const res: Array<Coords> = [];
    const side = this.turnSide(state);
    if (!state.lastAction?.to || !state.board) {
      return [];
    }
    const [lpr, lpc] = [state.lastAction.to.r, state.lastAction.to.c];
    const opp = this.opponentSide(state);

    // check top or bottom
    if (lpr === 0 || lpr === state.board.length - 1) {
      const [lCaptured, rCaptured]: Array<Array<Coords>> = [[], []];
      let theCol = lpc - 1;
      const rowBehind =
        lpr === state.board.length - 1 ? state.board.length - 2 : 1;

      while (
        this.insideBounds(state.board, { r: lpr, c: theCol }) &&
        this.sideOfPiece(this.pieceAt(state.board, { r: lpr, c: theCol })) ===
          opp &&
        this.insideBounds(state.board, { r: rowBehind, c: theCol }) &&
        this.canHelpCapture(state, { r: rowBehind, c: theCol }, side)
      ) {
        if (
          this.sideOfPiece(this.pieceAt(state.board, { r: lpr, c: theCol })) ===
            opp &&
          !this.isKing(state.board, { r: lpr, c: theCol })
        ) {
          lCaptured.push({ r: lpr, c: theCol });
        }
        theCol -= 1;
      }

      if (
        this.insideBounds(state.board, { r: lpr, c: theCol }) &&
        this.canHelpCapture(state, { r: lpr, c: theCol }, side)
      ) {
        res.push(...lCaptured);
      }

      theCol = lpc + 1;

      while (
        this.insideBounds(state.board, { r: lpr, c: theCol }) &&
        this.sideOfPiece(this.pieceAt(state.board, { r: lpr, c: theCol })) ===
          opp &&
        this.insideBounds(state.board, { r: rowBehind, c: theCol }) &&
        this.canHelpCapture(state, { r: rowBehind, c: theCol }, side)
      ) {
        if (
          this.sideOfPiece(this.pieceAt(state.board, { r: lpr, c: theCol })) ===
            opp &&
          !this.isKing(state.board, { r: lpr, c: theCol })
        ) {
          rCaptured.push({ r: lpr, c: theCol });
        }
        theCol += 1;
      }

      if (
        this.insideBounds(state.board, { r: lpr, c: theCol }) &&
        this.canHelpCapture(state, { r: lpr, c: theCol }, side)
      ) {
        res.push(...rCaptured);
      }
    }

    // check left or right
    if (lpc === 0 || lpc === state.board.length - 1) {
      const [bCaptured, tCaptured]: Array<Array<Coords>> = [[], []];
      let theRow = lpr - 1;
      const colBehind =
        lpc === state.board.length - 1 ? state.board.length - 2 : 1;

      while (
        this.insideBounds(state.board, { r: theRow, c: lpc }) &&
        this.sideOfPiece(this.pieceAt(state.board, { r: theRow, c: lpc })) ===
          opp &&
        this.insideBounds(state.board, { r: theRow, c: colBehind }) &&
        this.canHelpCapture(state, { r: theRow, c: colBehind }, side)
      ) {
        if (
          this.sideOfPiece(this.pieceAt(state.board, { r: theRow, c: lpc })) ===
            opp &&
          !this.isKing(state.board, { r: theRow, c: lpc })
        ) {
          bCaptured.push({ r: theRow, c: lpc });
        }
        theRow -= 1;
      }

      if (
        this.insideBounds(state.board, { r: theRow, c: lpc }) &&
        this.canHelpCapture(state, { r: theRow, c: lpc }, side)
      ) {
        res.push(...bCaptured);
      }

      theRow = lpr + 1;
      while (
        this.insideBounds(state.board, { r: theRow, c: lpc }) &&
        this.sideOfPiece(this.pieceAt(state.board, { r: theRow, c: lpc })) ===
          opp &&
        this.insideBounds(state.board, { r: theRow, c: colBehind }) &&
        this.canHelpCapture(state, { r: theRow, c: colBehind }, side)
      ) {
        if (
          this.sideOfPiece(this.pieceAt(state.board, { r: theRow, c: lpc })) ===
            opp &&
          !this.isKing(state.board, { r: theRow, c: lpc })
        ) {
          tCaptured.push({ r: theRow, c: lpc });
        }
        theRow += 1;
      }

      if (
        this.insideBounds(state.board, { r: theRow, c: lpc }) &&
        this.canHelpCapture(state, { r: theRow, c: lpc }, side)
      ) {
        res.push(...tCaptured);
      }
    }

    return res;
  }

  getBoardHash(board: Board) {
    return boardToKey(board);
  }

  addBoardToHistory(state: GameState, board: Board): typeof state {
    const boardHistoryCopy: Record<string, number> = { ...state.boardHistory };
    const boardKey = canonicalBoardKey(board);
    if (!(boardKey in boardHistoryCopy)) {
      boardHistoryCopy[boardKey] = 0;
    }
    boardHistoryCopy[boardKey] += 1;

    return Object.assign({}, state, { boardHistory: boardHistoryCopy });
  }

  getEquivalentBoards(board: Board) {
    const variants = getSymmetryVariants(board);

    const res: Record<string, Board> = {};
    for (const variant of variants) {
      const hash = this.getBoardHash(variant);
      if (!(hash in res)) {
        res[hash] = variant;
      }
    }

    return res;
  }

  public fortSearchFromKing(board: Board, kingCoords: Coords): boolean {
    const possiblySurroundingDefendersCoords = this.possiblySurrondingDefenders(
      board,
      kingCoords
    );

    const searchOnRow = kingCoords.r === 0 || kingCoords.r === board.length - 1;
    const onSameSearchLine = (coords: Coords) =>
      searchOnRow ? coords.r === kingCoords.r : coords.c === kingCoords.c;
    const beforeKing = (coords: Coords) =>
      searchOnRow ? coords.c < kingCoords.c : coords.r < kingCoords.r;
    const afterKing = (coords: Coords) =>
      searchOnRow ? coords.c > kingCoords.c : coords.r > kingCoords.r;

    const defendersOnSearchLine = possiblySurroundingDefendersCoords.filter(
      onSameSearchLine
    );
    const defendersBeforeKing = defendersOnSearchLine.filter(beforeKing);
    const defendersAfterKing = defendersOnSearchLine.filter(afterKing);

    // look for connected paths from a before-king piece to any after-king piece
    const fortStarts: Array<Coords> = [];
    for (const defenderBeforeKing of defendersBeforeKing) {
      const defendersConnectedToThisDefender = this.connectedDefenders(
        board,
        defenderBeforeKing
      );
      const hasPathToAfterKing = defendersAfterKing.some((defenderAfterKing) =>
        defendersConnectedToThisDefender.has(this.repr(defenderAfterKing))
      );
      if (hasPathToAfterKing) {
        fortStarts.push(defenderBeforeKing);
      }
    }

    if (fortStarts.length < 1) {
      return false;
    }

    // deduplicate full structures by sorted coordinate repr list
    const fullStructuresByKey = new Map<string, Set<String>>();
    for (const startingDefender of fortStarts) {
      const fullStructure = this.connectedDefenders(board, startingDefender);
      const key = [...fullStructure].sort().join("->");
      if (!fullStructuresByKey.has(key)) {
        fullStructuresByKey.set(key, fullStructure);
      }
    }
    const fullStructures = [...fullStructuresByKey.values()];

    // for full structure, find the pieces that can be taken and replace them with _
    // and check if remaining structure is still connected
    for (const fullStructure of fullStructures) {
      const [innerSet, attackerSet] =
        this.getEmptyPiecesAndAttackersInsideSmallestFort(
          board,
          kingCoords,
          fullStructure
        );

      // eliminate structures that contain any attacker
      if (attackerSet.size > 0) {
        return false;
      }

      const possibleSmallestFortStructure =
        this.getPossibleSmallestFortStructure(board, innerSet, fullStructure);
      const weakCoordsInPossibleFort: Set<String> = new Set<String>();
      for (const repr of possibleSmallestFortStructure) {
        const possibleFortCoords = this.coords(repr);
        for (const oppositeNeighbors of OPPOSITE_NEIGHBOR_PAIRS) {
          let oppositeSum = 0;
          for (const neighbor of oppositeNeighbors) {
            const neighborCoords: Coords = {
              r: possibleFortCoords.r + neighbor.r,
              c: possibleFortCoords.c + neighbor.c,
            };
            if (!this.insideBounds(board, neighborCoords)) {
              continue;
            }

            const neighborRepr = this.repr(neighborCoords);
            // increase opposite sum if NOT
            // - is a defender or king OR
            // - is inside the fort OR
            // - is inside an eye
            if (
              !(
                this.isDefenderOrKing(board, neighborCoords) ||
                innerSet.has(neighborRepr) ||
                this.isInsideEye(board, neighborCoords, fullStructure)
              )
            ) {
              oppositeSum += 1;
            }

            if (oppositeSum > 1) {
              weakCoordsInPossibleFort.add(repr);
            }
          }
        }
      }

      if (weakCoordsInPossibleFort.size > 0) {
        const boardCopy = cloneBoard(board);

        [...weakCoordsInPossibleFort].forEach((weakRepr) => {
          const weakCoords = this.coords(weakRepr);
          boardCopy[weakCoords.r][weakCoords.c] = Piece.__;
        });

        if (!this.fortSearchFromKing(boardCopy, kingCoords)) {
          return false;
        }
      }
    }

    // if any structure makes it this far, it must be a fort
    return true;
  }

  public getPossibleActions(
    state: GameState,
    side: TaflSide = this.turnSide(state)
  ): Array<MoveAction> {
    if (!state.board) {
      return [];
    }

    const res: Array<MoveAction> = [];
    const board = state.board;
    const controlPieces = this.controlMap.get(side);
    for (let r = 0; r < board.length; r += 1) {
      const row = board[r];
      for (let c = 0; c < row.length; c += 1) {
        const piece = row[c];
        if (controlPieces?.has(piece)) {
          const coords: Coords = { r, c };
          const movesFrom = this.getPossibleMovesFrom(state, coords);
          for (let i = 0; i < movesFrom.length; i += 1) {
            res.push({
              from: coords,
              to: movesFrom[i],
            });
          }
        }
      }
    }

    return res;
  }

  public isActionPossible(state: GameState, act: MoveAction): boolean {
    if (!state.board) {
      return false;
    }
    const board = state.board;

    if (
      !this.insideBounds(board, act.from) ||
      !this.insideBounds(board, act.to)
    ) {
      this.log("Move is outside board bounds");
      return false;
    }

    if (act.from.r !== act.to.r && act.from.c !== act.to.c) {
      this.log("Move should be in the same row or column");
      return false;
    }

    const f = act.from;
    const from = this.pieceAt(board, f);
    if (from === Piece.__) {
      this.log(`There is no piece at [${f.r}, ${f.c}]`);
      return false;
    }

    const side = this.turnSide(state);
    if (!this.canControl(side, from)) {
      this.log(`You can not control the piece at [${f.r}, ${f.c}]`);
      return false;
    }

    const t = act.to;
    if (!this.isEmpty(board, t)) {
      this.log(`There is already a piece at [${t.r}, ${t.c}]`);
      return false;
    }

    const rowMove = f.r === t.r;
    const dr = rowMove ? 0 : t.r > f.r ? 1 : -1;
    const dc = rowMove ? (t.c > f.c ? 1 : -1) : 0;
    let curR = f.r + dr;
    let curC = f.c + dc;
    while (curR !== t.r || curC !== t.c) {
      if (!this.isEmpty(board, { r: curR, c: curC })) {
        this.log(`Move [${f.r}, ${f.c}] -> [${t.r}, ${t.c}] is not possible`);
        return false;
      }
      curR += dr;
      curC += dc;
    }

    if (!this.canMovePieceHere(state, from, t)) {
      this.log(`Move [${f.r}, ${f.c}] -> [${t.r}, ${t.c}] is not possible`);
      return false;
    }

    return true;
  }

  public isGameOver(state: GameState): typeof state {
    if (!state.board) {
      return state;
    }

    const to = state.lastAction?.to;
    if (!to) {
      return Object.assign({}, state, {
        result: {
          ...state.result,
          finished: false,
        },
      });
    }

    if (
      state.rules?.[TaflRule.SAVE_BOARD_HISTORY]! &&
      state.boardHistory?.[canonicalBoardKey(state.board)]! ===
        state.rules?.[TaflRule.REPETITION_TURN_LIMIT]!
    ) {
      const repetitionOutcome =
        state.rules?.[TaflRule.REPETITION_OUTCOME] ||
        TaflRepetitionOutcome.DRAW;
      const winner =
        repetitionOutcome === TaflRepetitionOutcome.DEFENDER_LOSES
          ? TaflSide.ATTACKER
          : repetitionOutcome === TaflRepetitionOutcome.MOVER_LOSES
          ? this.opponentSide(state)
          : null;
      const desc =
        repetitionOutcome === TaflRepetitionOutcome.DEFENDER_LOSES
          ? "Defender loses on repetition"
          : repetitionOutcome === TaflRepetitionOutcome.MOVER_LOSES
          ? "Mover loses on repetition"
          : "Draw on repetition";
      return Object.assign({}, state, {
        result: {
          finished: true,
          winner,
          desc,
        },
      });
    }

    const side = this.turnSide(state);
    if (side === TaflSide.ATTACKER) {
      // King should be captured or all defenders should be surrounded
      const n = state.board.length;
      let [kingOnTop, kingOnRight, kingOnBottom, kingOnLeft] = [
        false,
        false,
        false,
        false,
      ];
      kingOnTop =
        to?.r > 1 && this.isKing(state.board, { r: to.r - 1, c: to.c });
      kingOnBottom =
        to?.r < n - 2 && this.isKing(state.board, { r: to.r + 1, c: to.c });
      kingOnLeft =
        to?.c > 1 && this.isKing(state.board, { r: to.r, c: to.c - 1 });
      kingOnRight =
        to?.c < n - 2 && this.isKing(state.board, { r: to.r, c: to.c + 1 });

      let kingPosition: Coords = { r: -1, c: -1 }; // king is initially not on the board

      if (kingOnTop) {
        kingPosition = { r: to.r - 1, c: to.c };
      } else if (kingOnBottom) {
        kingPosition = { r: to.r + 1, c: to.c };
      } else if (kingOnRight) {
        kingPosition = { r: to.r, c: to.c + 1 };
      } else if (kingOnLeft) {
        kingPosition = { r: to.r, c: to.c - 1 };
      }

      if (
        kingPosition?.r > 0 &&
        kingPosition?.r < n - 1 &&
        kingPosition?.c > 0 &&
        kingPosition?.c < n - 1
      ) {
        const [kr, kc] = [kingPosition?.r, kingPosition?.c];

        const tSurrounded = this.canHelpCapture(
          state,
          { r: kr - 1, c: kc },
          side
        )
          ? 1
          : 0;
        const bSurrounded = this.canHelpCapture(
          state,
          { r: kr + 1, c: kc },
          side
        )
          ? 1
          : 0;
        const lSurrounded = this.canHelpCapture(
          state,
          { r: kr, c: kc - 1 },
          side
        )
          ? 1
          : 0;
        const rSurrounded = this.canHelpCapture(
          state,
          { r: kr, c: kc + 1 },
          side
        )
          ? 1
          : 0;

        if (state.rules?.[TaflRule.ATTACKER_COUNT_TO_CAPTURE]! >= 3) {
          const sum = tSurrounded + bSurrounded + lSurrounded + rSurrounded;
          if (sum >= state.rules?.[TaflRule.ATTACKER_COUNT_TO_CAPTURE]!) {
            return Object.assign({}, state, {
              result: {
                finished: true,
                winner: TaflSide.ATTACKER,
                desc: "Attackers captured the king",
              },
            });
          }
        }

        if (state.rules?.[TaflRule.ATTACKER_COUNT_TO_CAPTURE]! === 2) {
          if (
            tSurrounded + bSurrounded === 2 ||
            lSurrounded + rSurrounded === 2
          ) {
            return Object.assign({}, state, {
              result: {
                finished: true,
                winner: TaflSide.ATTACKER,
                desc: "Attackers captured the king",
              },
            });
          }
        }
      }

      const surrounded = this.didAttackersSurroundDefenders(state.board);
      if (surrounded) {
        return Object.assign({}, state, {
          result: {
            finished: true,
            winner: TaflSide.ATTACKER,
            desc: "Attackers surrounded the defenders",
          },
        });
      }
    } else {
      // King should be on edge, corner, or in an exit fort
      const edgeEscape =
        state.rules?.[TaflRule.EDGE_ESCAPE]! &&
        this.isKing(state.board, to) &&
        this.isEdge(state, to);

      if (edgeEscape) {
        return Object.assign({}, state, {
          result: {
            finished: true,
            winner: TaflSide.DEFENDER,
            desc: "King escaped from edge",
          },
        });
      }

      const cornerEscape =
        this.isKing(state.board, to) && this.isCorner(state, to);
      if (cornerEscape) {
        return Object.assign({}, state, {
          result: {
            finished: true,
            winner: TaflSide.DEFENDER,
            desc: "King escaped from corner",
          },
        });
      }

    }

    const fortEscape =
      state.rules?.[TaflRule.EXIT_FORTS]! &&
      this.kingEscapedThroughFort(state);
    if (fortEscape) {
      return Object.assign({}, state, {
        result: {
          finished: true,
          winner: TaflSide.DEFENDER,
          desc: "King escaped through exit fort",
        },
      });
    }

    const canOpponentMove = this.canMakeAMove(state, this.opponentSide(state));

    return Object.assign({}, state, {
      result: {
        finished: !canOpponentMove,
        winner: !canOpponentMove ? this.turnSide(state) : null,
        desc: !canOpponentMove
          ? "No move left for opponent"
          : "Game continues...",
      },
    });
  }

  public act(state: GameState, moveAction: MoveAction): typeof state {
    if (!state.board) {
      return state;
    }

    if (!this.isActionPossible(state, moveAction)) {
      return state;
    }

    const boardCopy = cloneBoard(state.board);

    const fr = moveAction.from.r;
    const fc = moveAction.from.c;
    boardCopy[moveAction.to.r][moveAction.to.c] = this.pieceAt(
      state.board,
      moveAction.from
    );
    boardCopy[fr][fc] = Piece.__;

    let actionsCopy;
    if (state.rules?.[TaflRule.SAVE_ACTIONS]!) {
      actionsCopy = state.actions?.slice()!;
      actionsCopy.push(moveAction);
    }

    const playerMovedState = Object.assign(
      {},
      state,
      { lastAction: moveAction },
      { board: boardCopy },
      state.rules?.[TaflRule.SAVE_ACTIONS]! ? { actions: actionsCopy } : {}
    );

    const captureds = this.checkCaptures(playerMovedState);
    if (captureds.length > 0) {
      for (const capturedCoords of captureds) {
        boardCopy[capturedCoords.r][capturedCoords.c] = Piece.__;
      }
    }

    const capturedPiecesState = Object.assign({}, playerMovedState, {
      board: boardCopy,
      captures: captureds,
    });

    let gameOverState;
    if (state.rules?.[TaflRule.SAVE_BOARD_HISTORY]!) {
      const boardAddedToHistoryState = this.addBoardToHistory(
        capturedPiecesState,
        boardCopy
      );
      gameOverState = this.isGameOver(boardAddedToHistoryState);
    } else {
      gameOverState = this.isGameOver(capturedPiecesState);
    }

    return Object.assign({}, gameOverState, { turn: state.turn! + 1 });
  }
}
