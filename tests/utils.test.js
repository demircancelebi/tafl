"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const tafl = new index_1.Tafl();
const A = index_1.Piece.PA;
const D = index_1.Piece.PD;
const K = index_1.Piece.PK;
const _ = index_1.Piece.__;
test("Equivalent board tests", () => {
    const board = [
        [_, _, _, _, _, _, _, _, _, _, _],
        [_, D, _, _, _, _, _, _, _, _, A],
        [_, _, D, _, _, _, _, _, _, _, D],
        [_, _, _, D, _, _, _, _, _, _, A],
        [_, _, _, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, K, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _, _],
        [_, A, A, _, _, _, _, _, _, _, _],
        [_, A, A, _, _, _, _, _, D, A, D],
        [_, _, _, _, _, _, _, _, _, _, _],
    ];
    const eqBoards = Object.keys(tafl.getEquivalentBoards(board)).sort();
    const expected = [
        "/zbudGFJC8HrstoS2NWNqyvfKc8=",
        "15W1cUYEc5baV7dUNLeuMBctqM8=",
        "RR3Gy+lDjfX1bt1/J0449OPGb+M=",
        "U0S5M0XDMwGVwJ/BkLpRq38IH0o=",
        "kbXQRwXLlHl/LHoqeNRv0iZXTts=",
        "o1u/DYfX1dTpQQc0GTZ+noFtqlE=",
        "uVsBzvtaZgHIh8lPweRvEqnD+tw=",
        "xdop3BSra7ed3zV75lmiXb5q/+U="
    ];
    expect(eqBoards).toEqual(expected);
});
test("initial state equivalent boards are all the same", () => {
    const eqBoards = Object.keys(tafl.getEquivalentBoards(tafl.initialState().board));
    expect(eqBoards.length).toBe(1);
});
test("check isCenter", () => {
    expect(tafl.isCenter({ board: index_1.TaflBoard._7_BRANDUBH }, { r: 3, c: 3 })).toBe(true);
    expect(tafl.isCenter({ board: index_1.TaflBoard._9_TABLUT }, { r: 4, c: 4 })).toBe(true);
    expect(tafl.isCenter({ board: index_1.TaflBoard._11_CLASSIC }, { r: 5, c: 5 })).toBe(true);
    expect(tafl.isCenter({ board: index_1.TaflBoard._11_LEWISS }, { r: 5, c: 5 })).toBe(true);
    expect(tafl.isCenter({ board: index_1.TaflBoard._11_LINE }, { r: 5, c: 5 })).toBe(true);
    expect(tafl.isCenter({ board: index_1.TaflBoard._11_TAWLBWRDD }, { r: 5, c: 5 })).toBe(true);
    expect(tafl.isCenter({ board: index_1.TaflBoard._13_PARLETT }, { r: 6, c: 6 })).toBe(true);
    expect(tafl.isCenter({ board: index_1.TaflBoard._15_DAMIEN_WALKER }, { r: 7, c: 7 })).toBe(true);
    expect(tafl.isCenter({ board: index_1.TaflBoard._19_ALEA_EVANGELII }, { r: 9, c: 9 })).toBe(true);
});
test("check isCorner", () => {
    expect(tafl.isCorner({ rules: Object.assign({}, index_1.TaflRuleSet.COPENHAGEN), board: index_1.TaflBoard._11_CLASSIC }, { r: 0, c: 0 })).toBe(true);
    expect(tafl.isCorner({ rules: Object.assign({}, index_1.TaflRuleSet.COPENHAGEN), board: index_1.TaflBoard._11_CLASSIC }, { r: 0, c: 10 })).toBe(true);
    expect(tafl.isCorner({ rules: Object.assign({}, index_1.TaflRuleSet.COPENHAGEN), board: index_1.TaflBoard._11_CLASSIC }, { r: 10, c: 10 })).toBe(true);
    expect(tafl.isCorner({ rules: Object.assign({}, index_1.TaflRuleSet.COPENHAGEN), board: index_1.TaflBoard._11_CLASSIC }, { r: 10, c: 0 })).toBe(true);
    expect(tafl.isCorner({ rules: Object.assign(Object.assign({}, index_1.TaflRuleSet.COPENHAGEN), { [index_1.TaflRule.CORNER_BASE_WIDTH]: 2 }), board: index_1.TaflBoard._11_CLASSIC }, { r: 0, c: 0 })).toBe(true);
    expect(tafl.isCorner({ rules: Object.assign(Object.assign({}, index_1.TaflRuleSet.COPENHAGEN), { [index_1.TaflRule.CORNER_BASE_WIDTH]: 2 }), board: index_1.TaflBoard._11_CLASSIC }, { r: 0, c: 1 })).toBe(true);
    expect(tafl.isCorner({ rules: Object.assign(Object.assign({}, index_1.TaflRuleSet.COPENHAGEN), { [index_1.TaflRule.CORNER_BASE_WIDTH]: 2 }), board: index_1.TaflBoard._11_CLASSIC }, { r: 1, c: 0 })).toBe(true);
    expect(tafl.isCorner({ rules: Object.assign(Object.assign({}, index_1.TaflRuleSet.COPENHAGEN), { [index_1.TaflRule.CORNER_BASE_WIDTH]: 2 }), board: index_1.TaflBoard._11_CLASSIC }, { r: 1, c: 1 })).toBe(true);
    expect(tafl.isCorner({ rules: Object.assign({}, index_1.TaflRuleSet.COPENHAGEN), board: index_1.TaflBoard._11_CLASSIC }, { r: 0, c: 0 })).toBe(true);
    expect(tafl.isCorner({ rules: Object.assign({}, index_1.TaflRuleSet.COPENHAGEN), board: index_1.TaflBoard._11_CLASSIC }, { r: 0, c: 1 })).toBe(false);
    expect(tafl.isCorner({ rules: Object.assign({}, index_1.TaflRuleSet.COPENHAGEN), board: index_1.TaflBoard._11_CLASSIC }, { r: 1, c: 0 })).toBe(false);
    expect(tafl.isCorner({ rules: Object.assign({}, index_1.TaflRuleSet.COPENHAGEN), board: index_1.TaflBoard._11_CLASSIC }, { r: 1, c: 1 })).toBe(false);
});
//# sourceMappingURL=utils.test.js.map