"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const tafl = new index_1.Tafl();
const A = index_1.Piece.PA;
const D = index_1.Piece.PD;
const K = index_1.Piece.PK;
const _ = index_1.Piece.__;
test("check fort is built on top", () => {
    expect(tafl.fortSearchFromKing({
        board: [
            [_, D, _, D, K, _, _, D, _, D, _],
            [_, D, _, _, D, _, _, _, _, D, _],
            [_, _, D, _, D, D, _, _, D, _, _],
            [A, _, D, _, _, _, _, D, A, A, A],
            [A, _, _, D, D, D, D, _, _, _, A],
            [A, A, _, _, _, _, _, _, _, _, A],
            [A, _, _, D, _, _, _, D, _, _, _],
            [_, _, _, D, _, D, _, _, D, _, _],
            [_, _, _, D, D, _, D, _, D, _, _],
            [_, _, D, _, D, _, D, _, D, _, _],
            [_, _, _, D, _, _, _, D, _, _, _],
        ]
    }, { r: 0, c: 4 })).toBe(true);
});
test("check fort is built on bottom", () => {
    expect(tafl.fortSearchFromKing({
        board: [
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [A, _, _, _, _, _, _, _, A, A, A],
            [A, _, _, _, _, _, _, _, _, _, A],
            [A, A, _, _, _, _, _, _, _, _, A],
            [A, _, _, _, _, _, D, _, _, _, _],
            [_, _, _, D, D, D, D, D, _, _, _],
            [_, _, D, _, _, _, _, _, D, _, _],
            [_, D, _, _, _, D, _, D, _, D, _],
            [_, D, _, _, D, K, _, D, _, D, _],
        ]
    }, { r: 10, c: 5 })).toBe(true);
});
test("check two weak forts does not mean a fort", () => {
    expect(tafl.fortSearchFromKing({
        board: [
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [A, _, _, _, _, _, _, _, A, A, A],
            [A, _, _, _, _, _, _, _, _, _, A],
            [A, A, _, _, _, D, _, _, _, _, A],
            [A, _, _, _, D, _, D, _, _, _, _],
            [_, _, _, D, _, _, _, D, _, _, _],
            [_, _, D, _, _, D, _, _, D, _, _],
            [_, D, _, _, D, _, D, _, _, D, _],
            [_, D, _, D, _, K, _, D, _, D, _],
        ]
    }, { r: 10, c: 5 })).toBe(false);
});
test("check fort is built with the help of eye structures", () => {
    expect(tafl.fortSearchFromKing({
        board: [
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [A, _, _, _, _, _, _, _, A, A, A],
            [A, _, _, _, _, _, _, _, _, _, A],
            [A, D, D, _, D, D, _, _, _, _, A],
            [A, D, _, _, D, _, D, _, _, _, _],
            [_, _, _, D, _, D, _, D, _, _, _],
            [_, D, D, D, _, D, _, _, D, _, _],
            [_, D, _, _, D, _, _, D, _, D, _],
            [_, D, D, D, D, K, _, D, _, D, _],
        ]
    }, { r: 10, c: 5 })).toBe(true);
});
test("check fort is not built if eye structure is not there", () => {
    expect(tafl.fortSearchFromKing({
        board: [
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [A, _, _, _, _, _, _, _, A, A, A],
            [A, _, _, _, _, _, _, _, _, _, A],
            [A, D, D, _, D, D, _, _, _, _, A],
            [A, D, _, _, _, _, D, _, _, _, _],
            [_, _, _, D, _, D, _, D, _, _, _],
            [_, D, D, D, _, D, _, _, D, _, _],
            [_, D, _, _, D, _, _, D, _, _, _],
            [_, D, D, D, D, K, _, D, _, D, _],
        ]
    }, { r: 10, c: 5 })).toBe(false);
});
test("check fort is built on right side", () => {
    expect(tafl.fortSearchFromKing({
        board: [
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, A, A, A, A, _, _, _, _, D],
            [A, _, _, _, _, _, _, _, D, D, _],
            [_, _, _, _, _, _, _, _, D, _, K],
            [_, _, _, _, _, _, _, D, _, _, _],
            [_, _, _, _, _, _, D, _, D, _, D],
            [_, _, _, D, D, D, D, D, _, _, _],
            [_, _, D, _, _, _, _, _, D, _, D],
            [_, D, _, _, _, D, _, D, _, D, _],
            [_, D, _, _, D, _, _, D, _, D, _],
        ]
    }, { r: 4, c: 10 })).toBe(true);
});
test("check fort is not built if columns are not coming from the same edge", () => {
    expect(tafl.fortSearchFromKing({
        board: [
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, A, A, A, A, _, _, _, _, D],
            [A, _, _, _, _, _, _, _, D, D, _],
            [_, _, _, _, _, _, _, _, D, _, K],
            [_, _, _, _, _, _, _, D, _, _, _],
            [_, _, _, _, _, _, D, _, D, _, D],
            [_, _, _, D, D, D, D, D, _, _, _],
            [_, _, D, _, _, _, _, _, D, _, _],
            [_, D, _, _, _, D, _, D, _, D, _],
            [_, D, _, _, D, _, _, D, _, D, _],
        ]
    }, { r: 4, c: 10 })).toBe(false);
});
test("check fort is not built on right edge if there are weak pieces", () => {
    expect(tafl.fortSearchFromKing({
        board: [
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _],
            [_, _, A, A, A, A, _, _, _, _, D],
            [A, _, _, _, _, _, _, _, D, D, _],
            [_, _, _, _, _, _, _, D, _, _, K],
            [_, _, _, _, _, _, _, _, D, D, _],
            [_, _, _, _, _, _, D, _, _, _, D],
            [_, _, _, D, D, D, D, D, _, _, _],
            [_, _, D, _, _, _, _, _, D, _, _],
            [_, D, _, _, _, D, _, D, _, D, _],
            [_, D, _, _, D, _, _, D, _, D, _],
        ]
    }, { r: 4, c: 10 })).toBe(false);
});
//# sourceMappingURL=fort.test.js.map