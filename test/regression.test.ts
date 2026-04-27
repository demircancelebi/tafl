import { Board, Piece, Tafl, TaflBoard, TaflRule, TaflRuleSet } from "../src/index";

const _ = Piece.__;

test("initialState should not leak board mutations to future games", () => {
  const tafl = new Tafl();
  const originalTopLeft = TaflBoard._11_CLASSIC[0][0];
  const firstState = tafl.initialState();

  try {
    firstState.board![0][0] = Piece.PA;
    const secondState = tafl.initialState();

    expect(secondState.board![0][0]).toBe(originalTopLeft);
    expect(TaflBoard._11_CLASSIC[0][0]).toBe(originalTopLeft);
  } finally {
    TaflBoard._11_CLASSIC[0][0] = originalTopLeft;
  }
});

test("initialState should not leak rule mutations to future games", () => {
  const tafl = new Tafl();
  const originalEdgeEscape = TaflRuleSet.COPENHAGEN[TaflRule.EDGE_ESCAPE];
  const firstState = tafl.initialState();

  try {
    firstState.rules![TaflRule.EDGE_ESCAPE] = !originalEdgeEscape;
    const secondState = tafl.initialState();

    expect(secondState.rules![TaflRule.EDGE_ESCAPE]).toBe(originalEdgeEscape);
    expect(TaflRuleSet.COPENHAGEN[TaflRule.EDGE_ESCAPE]).toBe(
      originalEdgeEscape
    );
  } finally {
    TaflRuleSet.COPENHAGEN[TaflRule.EDGE_ESCAPE] = originalEdgeEscape;
  }
});

test("isActionPossible should return false instead of throwing for out-of-bounds actions", () => {
  const tafl = new Tafl();
  const state = tafl.initialState();
  const invalidAction = { from: { r: -1, c: 0 }, to: { r: 0, c: 0 } };
  let result: boolean | undefined = undefined;

  expect(() => {
    result = tafl.isActionPossible(state, invalidAction);
  }).not.toThrow();
  expect(result).toBe(false);
});

test("act should not throw for out-of-bounds actions", () => {
  const tafl = new Tafl();
  const state = tafl.initialState();
  const invalidAction = { from: { r: -1, c: 0 }, to: { r: 0, c: 0 } };
  let nextState = state;

  expect(() => {
    nextState = tafl.act(state, invalidAction);
  }).not.toThrow();
  expect(nextState.turn).toBe(state.turn);
});

test("didAttackersSurroundDefenders should return false when there is no king on board", () => {
  const tafl = new Tafl();
  const board: Board = [
    [_, _, _],
    [_, Piece.PD, _],
    [_, Piece.PA, _],
  ];
  let surrounded: boolean | undefined = undefined;

  expect(() => {
    surrounded = tafl.didAttackersSurroundDefenders(board);
  }).not.toThrow();
  expect(surrounded).toBe(false);
});

test("getKingCoords should return undefined when there is no king on board", () => {
  const tafl = new Tafl();
  const board: Board = [
    [_, _, _],
    [_, Piece.PD, _],
    [_, Piece.PA, _],
  ];

  let kingCoords: ReturnType<Tafl["getKingCoords"]> = undefined;
  expect(() => {
    kingCoords = tafl.getKingCoords(board);
  }).not.toThrow();
  expect(kingCoords).toBeUndefined();
});

test("bounds matrix: out-of-bounds from/to should always be rejected safely", () => {
  const tafl = new Tafl();
  const state = tafl.initialState();
  jest.spyOn(tafl, "log").mockImplementation(() => undefined);

  const invalidActions = [
    { from: { r: -1, c: 0 }, to: { r: 0, c: 0 } },
    { from: { r: 0, c: 0 }, to: { r: -1, c: 0 } },
    { from: { r: 11, c: 0 }, to: { r: 10, c: 0 } },
    { from: { r: 0, c: 0 }, to: { r: 11, c: 0 } },
    { from: { r: 0, c: 11 }, to: { r: 0, c: 10 } },
    { from: { r: 0, c: 0 }, to: { r: 0, c: 11 } },
  ];

  invalidActions.forEach((invalidAction) => {
    let possible: boolean | undefined = undefined;
    let nextState = state;

    expect(() => {
      possible = tafl.isActionPossible(state, invalidAction);
    }).not.toThrow();
    expect(possible).toBe(false);

    expect(() => {
      nextState = tafl.act(state, invalidAction);
    }).not.toThrow();
    expect(nextState).toBe(state);
  });
});

test("invalid in-bounds move should be side-effect free", () => {
  const tafl = new Tafl();
  const state = tafl.initialState();
  jest.spyOn(tafl, "log").mockImplementation(() => undefined);
  const invalidAction = { from: { r: 0, c: 3 }, to: { r: 1, c: 4 } }; // diagonal move
  const boardBefore = state.board!.map((row) => row.slice());
  const actionsBefore = [...state.actions!];
  const historyBefore = { ...state.boardHistory! };
  const turnBefore = state.turn;
  const resultBefore = { ...state.result! };

  const nextState = tafl.act(state, invalidAction);

  expect(nextState).toBe(state);
  expect(state.turn).toBe(turnBefore);
  expect(state.board).toEqual(boardBefore);
  expect(state.actions).toEqual(actionsBefore);
  expect(state.boardHistory).toEqual(historyBefore);
  expect(state.result).toEqual(resultBefore);
  expect(state.lastAction).toBeUndefined();
  expect(state.captures).toBeUndefined();
});

test("custom init board/rules should remain isolated across created states", () => {
  const tafl = new Tafl();
  const customBoard: Board = [
    [Piece.__, Piece.__, Piece.__, Piece.__, Piece.__],
    [Piece.__, Piece.__, Piece.PD, Piece.__, Piece.__],
    [Piece.__, Piece.PD, Piece.PK, Piece.PD, Piece.__],
    [Piece.__, Piece.__, Piece.PA, Piece.__, Piece.__],
    [Piece.__, Piece.__, Piece.__, Piece.__, Piece.__],
  ];
  const customRules = {
    ...TaflRuleSet.COPENHAGEN,
    [TaflRule.EDGE_ESCAPE]: true,
  };
  const originalBoardCenter = customBoard[2][2];
  const originalEdgeEscape = customRules[TaflRule.EDGE_ESCAPE];

  const firstState = tafl.initialState({ board: customBoard, rules: customRules });
  const secondState = tafl.initialState({
    board: customBoard,
    rules: customRules,
  });

  firstState.board![2][2] = Piece.PA;
  firstState.rules![TaflRule.EDGE_ESCAPE] = !originalEdgeEscape;

  expect(secondState.board![2][2]).toBe(originalBoardCenter);
  expect(secondState.rules![TaflRule.EDGE_ESCAPE]).toBe(originalEdgeEscape);
  expect(customBoard[2][2]).toBe(originalBoardCenter);
  expect(customRules[TaflRule.EDGE_ESCAPE]).toBe(originalEdgeEscape);
});

test("Alea Evangelii preset should default to 2x2 corners", () => {
  const tafl = new Tafl();
  const state = tafl.initialState({ board: TaflBoard._19_ALEA_EVANGELII });

  expect(state.rules![TaflRule.CORNER_BASE_WIDTH]).toBe(2);
  expect(tafl.isCorner(state, { r: 0, c: 0 })).toBe(true);
  expect(tafl.isCorner(state, { r: 0, c: 1 })).toBe(true);
  expect(tafl.isCorner(state, { r: 1, c: 0 })).toBe(true);
  expect(tafl.isCorner(state, { r: 1, c: 1 })).toBe(true);
  expect(tafl.isCorner(state, { r: 0, c: 2 })).toBe(false);
  expect(tafl.isCorner(state, { r: 2, c: 0 })).toBe(false);
  expect(tafl.isCorner(state, { r: 2, c: 2 })).toBe(false);
});

test("Alea Evangelii board copies should default to 2x2 corners", () => {
  const tafl = new Tafl();
  const copiedAleaBoard = TaflBoard._19_ALEA_EVANGELII.map((row) =>
    row.slice()
  );
  const state = tafl.initialState({ board: copiedAleaBoard });

  expect(state.rules![TaflRule.CORNER_BASE_WIDTH]).toBe(2);
  expect(tafl.isCorner(state, { r: 1, c: 1 })).toBe(true);
});

test("explicit rules should override Alea Evangelii board defaults", () => {
  const tafl = new Tafl();
  const state = tafl.initialState({
    board: TaflBoard._19_ALEA_EVANGELII,
    rules: {
      ...TaflRuleSet.COPENHAGEN,
      [TaflRule.CORNER_BASE_WIDTH]: 1,
    },
  });

  expect(state.rules![TaflRule.CORNER_BASE_WIDTH]).toBe(1);
  expect(tafl.isCorner(state, { r: 0, c: 0 })).toBe(true);
  expect(tafl.isCorner(state, { r: 0, c: 1 })).toBe(false);
});
