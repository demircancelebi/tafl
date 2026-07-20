import {
  Board,
  GameState,
  Piece,
  Tafl,
  TaflSide,
} from "../src/index";

const tafl = new Tafl();
const A = Piece.PA;
const D = Piece.PD;
const K = Piece.PK;
const _ = Piece.__;
const kingCoords = { r: 0, c: 3 };

function emptyBoard(size: number = 7): Board {
  return Array.from({ length: size }, () => Array(size).fill(_));
}

function place(board: Board, piece: Piece, coords: Array<[number, number]>) {
  for (const [r, c] of coords) {
    board[r][c] = piece;
  }
}

function completeFortBoard(): Board {
  const board = emptyBoard();
  place(board, D, [
    [0, 1],
    [0, 5],
    [1, 1],
    [1, 5],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
  ]);
  board[kingCoords.r][kingCoords.c] = K;
  return board;
}

function stateForTurn(board: Board, turn: number): GameState {
  return { ...tafl.initialState({ board }), turn };
}

function expectExitFortWin(state: GameState) {
  expect(state.result).toEqual({
    finished: true,
    winner: TaflSide.DEFENDER,
    desc: "King escaped through exit fort",
  });
}

test("non-king defender wall completion immediately wins through an exit fort", () => {
  const board = completeFortBoard();
  board[2][3] = _;
  board[4][3] = D;
  board[6][3] = A;
  const state = stateForTurn(board, 1);

  expect(tafl.insideFort(state.board!, kingCoords)).toBe(false);

  const nextState = tafl.act(state, {
    from: { r: 4, c: 3 },
    to: { r: 2, c: 3 },
  });

  expectExitFortWin(nextState);
});

test("king landing on the edge still wins through an exit fort", () => {
  const board = completeFortBoard();
  board[kingCoords.r][kingCoords.c] = _;
  board[1][3] = K;
  board[6][3] = A;
  const state = stateForTurn(board, 1);

  const nextState = tafl.act(state, {
    from: { r: 1, c: 3 },
    to: kingCoords,
  });

  expectExitFortWin(nextState);
});

test("wall completion does not win when the king cannot move", () => {
  const board = completeFortBoard();
  board[2][3] = _;
  board[4][3] = D;
  board[6][3] = A;
  place(board, D, [
    [0, 2],
    [0, 4],
    [1, 3],
  ]);
  const state = stateForTurn(board, 1);

  const nextState = tafl.act(state, {
    from: { r: 4, c: 3 },
    to: { r: 2, c: 3 },
  });

  expect(tafl.fortSearchFromKing(nextState.board!, kingCoords)).toBe(true);
  expect(tafl.insideFort(nextState.board!, kingCoords)).toBe(false);
  expect(nextState.result).toEqual({
    finished: false,
    winner: null,
    desc: "Game continues...",
  });
});

test("attacker vacating the fort interior triggers the positional win", () => {
  const board = completeFortBoard();
  board[6][3] = A;
  const state = stateForTurn(board, 0);
  state.lastAction = {
    from: { r: 1, c: 3 },
    to: { r: 6, c: 3 },
  };

  expectExitFortWin(tafl.isGameOver(state));
});

test("insideFort rejects an immobile walled-in king", () => {
  const board = emptyBoard(11);
  place(board, D, [
    [9, 4],
    [9, 5],
    [9, 6],
    [10, 4],
    [10, 6],
  ]);
  board[10][5] = K;

  expect(tafl.fortSearchFromKing(board, { r: 10, c: 5 })).toBe(true);
  expect(tafl.insideFort(board, { r: 10, c: 5 })).toBe(false);
});
