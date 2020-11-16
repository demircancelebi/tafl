import { Tafl, Piece } from "../index";

const tafl = new Tafl()
const A = Piece.PA
const D = Piece.PD
const K = Piece.PK
const _ = Piece.__

const topTestBoard = {
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
}
test("fort check", () => {
  expect(tafl.fortSearchFromKing(topTestBoard, { r: 0, c: 4 })).toBe(true)
})

const bottomSimpleTestBoard = {
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
}
test("fort check", () => {
  expect(tafl.fortSearchFromKing(bottomSimpleTestBoard, { r: 10, c: 5 })).toBe(true)
})

const bottomTwoFortsTestBoard = {
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
}
test("fort check", () => {
  expect(tafl.fortSearchFromKing(bottomTwoFortsTestBoard, { r: 10, c: 5 })).toBe(false)
})

const bottomEyeFortsTestBoard = {
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
}
test("fort check", () => {
  expect(tafl.fortSearchFromKing(bottomEyeFortsTestBoard, { r: 10, c: 5 })).toBe(true)
})

const bottomUnsafeAlmostEyeFortsBoard = {
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
}
test("fort check", () => {
  expect(tafl.fortSearchFromKing(bottomUnsafeAlmostEyeFortsBoard, { r: 10, c: 5 })).toBe(false)
})

const rightExitTestBoard = {
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
}
test("fort check", () => {
  expect(tafl.fortSearchFromKing(rightExitTestBoard, { r: 4, c: 10 })).toBe(true)
})

const rightBottomNotAFortTestBoard = {
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
}
test("fort check", () => {
  expect(tafl.fortSearchFromKing(rightBottomNotAFortTestBoard, { r: 4, c: 10 })).toBe(false)
})

const rightExitUnsafeTestBoard = {
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
}
test("fort check", () => {
  expect(tafl.fortSearchFromKing(rightExitUnsafeTestBoard, { r: 4, c: 10 })).toBe(false)
})