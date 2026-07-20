import {
  Board,
  Piece,
  Tafl,
  TaflRule,
  TaflRuleSet,
  TaflSide,
} from "../src/index";

const tafl = new Tafl();
const A = Piece.PA;
const D = Piece.PD;
const K = Piece.PK;
const _ = Piece.__;

jest.spyOn(tafl, "log").mockImplementation(() => undefined);

function emptyBoard(): Board {
  return Array.from({ length: 7 }, () => Array<Piece>(7).fill(_));
}

test("defender can move through the empty throne", () => {
  const board = emptyBoard();
  board[1][1] = K;
  board[3][1] = D;
  const state = tafl.initialState({
    board,
    rules: {
      ...TaflRuleSet.COPENHAGEN,
      [TaflRule.STARTING_SIDE]: TaflSide.DEFENDER,
    },
  });
  const move = { from: { r: 3, c: 1 }, to: { r: 3, c: 5 } };

  expect(tafl.getPossibleMovesFrom(state, move.from)).toContainEqual(move.to);
  expect(tafl.isActionPossible(state, move)).toBe(true);
});

test("attacker can move through the empty throne", () => {
  const board = emptyBoard();
  board[1][1] = K;
  board[2][2] = D;
  board[3][1] = D;
  board[3][2] = A;
  board[4][2] = D;
  const state = tafl.initialState({ board });
  const move = { from: { r: 3, c: 2 }, to: { r: 3, c: 5 } };

  expect(tafl.getPossibleMovesFrom(state, move.from)).toContainEqual(move.to);
  expect(tafl.isActionPossible(state, move)).toBe(true);
  expect(tafl.canMakeAMove(state, TaflSide.ATTACKER)).toBe(true);
});

test("non-king cannot stop on the empty throne", () => {
  const board = emptyBoard();
  board[1][1] = K;
  board[3][1] = A;
  const state = tafl.initialState({ board });
  const move = { from: { r: 3, c: 1 }, to: { r: 3, c: 3 } };

  expect(tafl.getPossibleMovesFrom(state, move.from)).not.toContainEqual(
    move.to
  );
  expect(tafl.isActionPossible(state, move)).toBe(false);
});

test("king can stop on and pass through the empty throne when return is allowed", () => {
  const board = emptyBoard();
  board[3][1] = K;
  const state = tafl.initialState({
    board,
    rules: {
      ...TaflRuleSet.COPENHAGEN,
      [TaflRule.KING_CAN_RETURN_TO_CENTER]: true,
      [TaflRule.STARTING_SIDE]: TaflSide.DEFENDER,
    },
  });
  const throne = { r: 3, c: 3 };
  const beyond = { r: 3, c: 5 };
  const moves = tafl.getPossibleMovesFrom(state, { r: 3, c: 1 });

  expect(moves).toContainEqual(throne);
  expect(moves).toContainEqual(beyond);
  expect(
    tafl.isActionPossible(state, { from: { r: 3, c: 1 }, to: throne })
  ).toBe(true);
  expect(
    tafl.isActionPossible(state, { from: { r: 3, c: 1 }, to: beyond })
  ).toBe(true);
});

test("occupied throne blocks transit", () => {
  const board = emptyBoard();
  board[3][1] = A;
  board[3][3] = K;
  const state = tafl.initialState({ board });
  const move = { from: { r: 3, c: 1 }, to: { r: 3, c: 5 } };

  expect(tafl.getPossibleMovesFrom(state, move.from)).not.toContainEqual(
    move.to
  );
  expect(tafl.isActionPossible(state, move)).toBe(false);
});
