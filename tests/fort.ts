import { Tafl, Piece } from "../tafl";

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
const topTest = tafl.fortSearchFromKing(topTestBoard, { r: 0, c: 4 }) === true

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
const bottomSimpleTest = tafl.fortSearchFromKing(bottomSimpleTestBoard, { r: 10, c: 5 }) === true

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
const bottomTwoFortsTest = tafl.fortSearchFromKing(bottomTwoFortsTestBoard, { r: 10, c: 5 }) === false

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
const bottomEyeFortsTest = tafl.fortSearchFromKing(bottomEyeFortsTestBoard, { r: 10, c: 5 }) === true

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
const bottomUnsafeAlmostEyeForts = tafl.fortSearchFromKing(bottomUnsafeAlmostEyeFortsBoard, { r: 10, c: 5 }) === false

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
const rightExitTest = tafl.fortSearchFromKing(rightExitTestBoard, { r: 4, c: 10 }) === true

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
const rightBottomNotAFortTest = tafl.fortSearchFromKing(rightBottomNotAFortTestBoard, { r: 4, c: 10 }) === false

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
const rightExitUnsafeTest = tafl.fortSearchFromKing(rightExitUnsafeTestBoard, { r: 4, c: 10 }) === false

const tests = {
  topTest,
  bottomSimpleTest,
  bottomTwoFortsTest,
  bottomEyeFortsTest,
  bottomUnsafeAlmostEyeForts,
  rightExitTest,
  rightBottomNotAFortTest,
  rightExitUnsafeTest
}

const failures = Object.keys(tests).filter(k => (!tests[k]))
if (failures.length === 0) {
  console.log(`All ${Object.keys(tests).length} fort tests are passing`)
} else {
  console.log("Failing tests:")
  console.log(failures.join(", "))
}
