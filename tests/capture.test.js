"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const tafl = new index_1.Tafl();
const A = index_1.Piece.PA;
const D = index_1.Piece.PD;
const K = index_1.Piece.PK;
const _ = index_1.Piece.__;
test("check simple capture", () => {
    const res = tafl.checkCaptures({
        turn: 1,
        board: [
            [_, _, _, _, _, _, _],
            [_, D, A, D, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
        ],
        lastAction: { from: { r: 0, c: 1 }, to: { r: 1, c: 1 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length === 1 && res[0].r === 1 && res[0].c === 2).toBe(true);
});
test("check simple capture with king", () => {
    const res = tafl.checkCaptures({
        turn: 1,
        board: [
            [_, _, _, _, _, _, _],
            [_, K, A, D, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
        ],
        lastAction: { from: { r: 0, c: 1 }, to: { r: 1, c: 1 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length === 1 && res[0].r === 1 && res[0].c === 2).toBe(true);
});
test("check that king cannot be captured with 2 pieces", () => {
    const res = tafl.checkCaptures({
        turn: 0,
        board: [
            [_, _, _, _, _, _, _],
            [_, A, K, A, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
        ],
        lastAction: { from: { r: 0, c: 1 }, to: { r: 1, c: 1 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length).toBe(0);
});
test("check capturing of pieces other than king on shieldwall", () => {
    const res = tafl.checkCaptures({
        turn: 0,
        board: [
            [_, A, D, K, D, A, _],
            [_, _, A, A, A, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
        ],
        lastAction: { from: { r: 1, c: 1 }, to: { r: 0, c: 1 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length).toBe(2);
});
test("check no capture if piece moves in between 2 opponent pieces", () => {
    const res = tafl.checkCaptures({
        turn: 0,
        board: [
            [_, _, _, _, _, _, _],
            [_, D, A, D, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
        ],
        lastAction: { from: { r: 0, c: 2 }, to: { r: 1, c: 2 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length).toBe(0);
});
test("check capturing 2 pieces at the same time", () => {
    const res = tafl.checkCaptures({
        turn: 1,
        board: [
            [_, _, _, _, _, _, _],
            [_, D, A, D, A, D, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
        ],
        lastAction: { from: { r: 0, c: 3 }, to: { r: 1, c: 3 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length).toBe(2);
});
test("check capturing 3 pieces at the same time", () => {
    const res = tafl.checkCaptures({
        turn: 1,
        board: [
            [_, _, _, _, _, _, _],
            [D, A, D, A, D, _, _],
            [_, _, A, _, _, _, _],
            [_, _, D, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
        ],
        lastAction: { from: { r: 0, c: 2 }, to: { r: 1, c: 2 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length).toBe(3);
});
test("check capturing in top left corner", () => {
    const res = tafl.checkCaptures({
        turn: 1,
        board: [
            [_, A, D, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
        ],
        lastAction: { from: { r: 1, c: 2 }, to: { r: 0, c: 2 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length === 1 && res[0].r === 0 && res[0].c === 1).toBe(true);
});
test("check capturing in top left corner with attacker", () => {
    const res = tafl.checkCaptures({
        turn: 0,
        board: [
            [_, D, A, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
        ],
        lastAction: { from: { r: 1, c: 2 }, to: { r: 0, c: 2 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length === 1 && res[0].r === 0 && res[0].c === 1).toBe(true);
});
test("check capturing 3 pieces with the help of center base", () => {
    const res = tafl.checkCaptures({
        turn: 1,
        board: [
            [_, _, _, _, _, _, _],
            [_, D, A, D, A, D, _],
            [_, _, _, A, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
        ],
        lastAction: { from: { r: 0, c: 3 }, to: { r: 1, c: 3 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length).toBe(3);
});
test("check capturing 3 pieces with the help of center base with attackers", () => {
    const res = tafl.checkCaptures({
        turn: 0,
        board: [
            [_, _, _, _, _, _, _],
            [_, A, D, A, D, A, _],
            [_, _, _, D, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
        ],
        lastAction: { from: { r: 0, c: 3 }, to: { r: 1, c: 3 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length).toBe(3);
});
test("check shieldwall capture", () => {
    const res = tafl.checkCaptures({
        turn: 1,
        board: [
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, D, D, D, _, _],
            [_, D, A, A, A, D, _],
        ],
        lastAction: { from: { r: 0, c: 5 }, to: { r: 6, c: 5 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length === 3 && res.reduce((acc, cur) => (cur.c + acc), 0) === 9).toBe(true);
});
test("shieldwall should not work if it is not a flanking move", () => {
    const res = tafl.checkCaptures({
        turn: 1,
        board: [
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, D, D, D, _, _],
            [_, D, A, A, A, D, _],
        ],
        lastAction: { from: { r: 0, c: 4 }, to: { r: 5, c: 4 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length).toBe(0);
});
test("check shieldwall capture with attackers", () => {
    const res = tafl.checkCaptures({
        turn: 0,
        board: [
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, _, _, _, _, _],
            [_, _, A, A, A, _, _],
            [_, A, D, D, D, A, _],
        ],
        lastAction: { from: { r: 0, c: 5 }, to: { r: 6, c: 5 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length === 3 && res.reduce((acc, cur) => (cur.c + acc), 0) === 9).toBe(true);
});
test("check shieldwall from both sides", () => {
    const res = tafl.checkCaptures({
        turn: 1,
        board: [
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, D, D, D, _, D, D, D, D, _],
            [_, D, A, A, A, D, A, A, A, A, _],
        ],
        lastAction: { from: { r: 0, c: 5 }, to: { r: 10, c: 5 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length).toBe(7);
});
test("check shieldwall from only one side", () => {
    const res = tafl.checkCaptures({
        turn: 1,
        board: [
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, D, D, D, _, D, D, D, D, _],
            [_, D, A, A, A, D, A, A, A, _, _],
        ],
        lastAction: { from: { r: 0, c: 5 }, to: { r: 10, c: 5 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length).toBe(3);
});
test("check shieldwall with king", () => {
    const res = tafl.checkCaptures({
        turn: 1,
        board: [
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, D, D, D, _, D, D, D, D, _],
            [_, D, A, A, A, K, A, A, A, _, _],
        ],
        lastAction: { from: { r: 0, c: 5 }, to: { r: 10, c: 5 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length).toBe(3);
});
test("check shieldwall with king on wall", () => {
    const res = tafl.checkCaptures({
        turn: 1,
        board: [
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, D, K, D, _, D, D, D, D, _],
            [_, D, A, A, A, D, A, A, A, _, _],
        ],
        lastAction: { from: { r: 0, c: 5 }, to: { r: 10, c: 5 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length).toBe(3);
});
test("check shieldwall with incomplete wall", () => {
    const res = tafl.checkCaptures({
        turn: 1,
        board: [
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, K, D, _, D, D, D, D, _],
            [_, D, A, A, A, D, A, A, A, _, _],
        ],
        lastAction: { from: { r: 0, c: 5 }, to: { r: 10, c: 5 } },
        rules: index_1.TaflRuleSet.COPENHAGEN
    });
    expect(res.length).toBe(0);
});
//# sourceMappingURL=capture.test.js.map