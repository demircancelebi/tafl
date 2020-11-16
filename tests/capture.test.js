"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const tafl = new index_1.Tafl();
const A = index_1.Piece.PA;
const D = index_1.Piece.PD;
const K = index_1.Piece.PK;
const _ = index_1.Piece.__;
const simpleCaptureState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(simpleCaptureState);
    expect(res.length === 1 && res[0].r === 1 && res[0].c === 2).toBe(true);
});
const simpleKingCaptureState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(simpleKingCaptureState);
    expect(res.length === 1 && res[0].r === 1 && res[0].c === 2).toBe(true);
});
const cannotCaptureKingState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(cannotCaptureKingState);
    expect(res.length).toBe(0);
});
const cannotCaptureKingShieldWallState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(cannotCaptureKingShieldWallState);
    expect(res.length).toBe(2);
});
const simpleInBetweenState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(simpleInBetweenState);
    expect(res.length).toBe(0);
});
const take2State = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(take2State);
    expect(res.length).toBe(2);
});
const take3State = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(take3State);
    expect(res.length).toBe(3);
});
const topLeftCornerState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(topLeftCornerState);
    expect(res.length === 1 && res[0].r === 0 && res[0].c === 1).toBe(true);
});
const topLeftCornerAttackerState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(topLeftCornerAttackerState);
    expect(res.length === 1 && res[0].r === 0 && res[0].c === 1).toBe(true);
});
const checkCenterState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(checkCenterState);
    expect(res.length).toBe(3);
});
const checkCenterAttackerState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(checkCenterAttackerState);
    expect(res.length).toBe(3);
});
const shieldWallState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(shieldWallState);
    expect(res.length === 3 && res.reduce((acc, cur) => (cur.c + acc), 0) === 9).toBe(true);
});
const shieldWallNoCaptureState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(shieldWallNoCaptureState);
    expect(res.length).toBe(0);
});
const shieldWallAttackerState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(shieldWallAttackerState);
    expect(res.length === 3 && res.reduce((acc, cur) => (cur.c + acc), 0) === 9).toBe(true);
});
const shieldWallBothSidesState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(shieldWallBothSidesState);
    expect(res.length).toBe(7);
});
const shieldWallOneSideState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(shieldWallOneSideState);
    expect(res.length).toBe(3);
});
const shieldWallKingOneSideState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(shieldWallKingOneSideState);
    expect(res.length).toBe(3);
});
const shieldWallKingOnWallState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(shieldWallKingOnWallState);
    expect(res.length).toBe(3);
});
const shieldWallIncompleteWallState = {
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
};
test("capture check", () => {
    const res = tafl.checkCaptures(shieldWallIncompleteWallState);
    expect(res.length).toBe(0);
});
//# sourceMappingURL=capture.test.js.map