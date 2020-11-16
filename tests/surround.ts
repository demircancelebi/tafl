import { Tafl, Piece } from "../index";

const tafl = new Tafl()
const A = Piece.PA
const D = Piece.PD
const K = Piece.PK
const _ = Piece.__

const simpleTestBoard = {
  board: [
    [_, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, A, _, _, _, _, _],
    [_, _, _, _, A, D, A, _, _, _, _],
    [_, _, _, _, A, K, _, A, _, _, _],
    [_, _, _, _, _, A, A, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _],
  ]
}
const simpleTest = tafl.didAttackersSurroundDefenders(simpleTestBoard) === true


const simpleTestDefenderOutsideBoard = {
  board: [
    [_, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, D, _, _, _, _, _, _, _],
    [_, _, _, _, _, A, _, _, _, _, _],
    [_, _, _, _, A, D, A, _, _, _, _],
    [_, _, _, _, A, K, _, A, _, _, _],
    [_, _, _, _, _, A, A, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _],
  ]
}
const simpleTestDefenderOutside = tafl.didAttackersSurroundDefenders(simpleTestDefenderOutsideBoard) === false


const surroundTestBoard = {
  board: [
    [_, _, _, _, _, _, _, _, A, A, _],
    [_, A, A, A, A, A, A, _, _, _, _],
    [_, A, _, _, D, _, _, A, _, _, _],
    [A, _, D, _, _, _, _, _, A, A, A],
    [A, _, D, _, K, D, D, _, _, _, A],
    [A, A, D, _, _, _, _, A, A, A, A],
    [A, _, _, A, D, _, A, _, _, _, _],
    [_, A, _, _, D, A, _, _, _, _, _],
    [_, _, A, _, A, _, _, A, _, _, _],
    [_, _, _, A, A, _, A, _, _, A, _],
    [_, _, _, _, _, _, _, _, _, _, _],
  ]
}
const surroundTest = tafl.didAttackersSurroundDefenders(surroundTestBoard) === true


const spiralTestBoard = {
  board: [
    [_, _, _, _, _, _, _, _, A, _, _],
    [_, _, _, A, A, A, A, _, _, A, _],
    [_, _, A, _, D, D, D, A, _, _, A],
    [_, A, _, _, A, A, _, _, A, _, A],
    [_, A, _, A, _, _, A, _, A, _, A],
    [_, A, _, A, _, K, D, _, A, _, A],
    [_, A, _, A, _, D, _, A, _, _, A],
    [_, A, _, _, A, A, A, _, _, A, _],
    [_, _, A, _, _, _, _, _, A, _, _],
    [_, _, _, A, A, A, A, A, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _],
  ]
}
const spiralTest = tafl.didAttackersSurroundDefenders(spiralTestBoard) === false


const closedSpiralTestBoard = {
  board: [
    [_, _, _, _, _, _, _, A, A, _, _],
    [_, _, _, A, A, A, A, _, _, A, _],
    [_, _, A, _, D, D, D, A, _, _, A],
    [_, A, _, _, A, A, _, _, A, _, A],
    [_, A, _, A, _, _, A, _, A, _, A],
    [_, A, _, A, _, K, D, _, A, _, A],
    [_, A, _, A, _, D, _, A, _, _, A],
    [_, A, _, _, A, A, A, _, _, A, _],
    [_, _, A, _, _, _, _, _, A, _, _],
    [_, _, _, A, A, A, A, A, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _],
  ]
}
const closedSpiralTest = tafl.didAttackersSurroundDefenders(closedSpiralTestBoard) === true


const connectedTestBoard = {
  board: [
    [_, _, _, _, _, _, _, _, _, _, _],
    [_, A, A, A, A, A, A, A, A, A, A],
    [_, _, A, _, _, _, _, _, _, _, A],
    [_, A, _, _, A, A, A, A, _, _, A],
    [_, A, _, A, _, _, _, _, A, _, A],
    [_, A, _, A, _, K, D, _, A, _, A],
    [_, A, _, A, _, D, _, _, A, _, A],
    [_, A, _, _, A, _, _, A, _, _, A],
    [_, A, _, _, _, A, _, A, _, _, A],
    [_, _, A, A, A, A, _, _, A, A, _],
    [_, _, _, _, _, _, _, _, _, _, _],
  ]
}
const connectedTest = tafl.didAttackersSurroundDefenders(connectedTestBoard) === false


const twoLayersTestBoard = {
  board: [
    [_, _, _, _, _, _, _, _, _, _, _],
    [_, _, A, A, A, A, A, A, A, A, A],
    [_, A, _, _, _, _, _, _, _, _, A],
    [_, A, _, _, A, A, A, _, _, _, A],
    [_, A, _, A, _, _, _, A, D, _, A],
    [_, A, _, A, _, K, D, A, _, _, A],
    [_, A, _, A, _, D, _, A, _, A, A],
    [_, A, D, A, _, _, _, A, _, A, _],
    [_, A, _, D, A, A, A, A, _, A, _],
    [_, A, _, _, D, _, _, _, _, A, _],
    [_, _, A, A, A, A, A, A, A, A, _],
  ]
}
const twoLayersTest = tafl.didAttackersSurroundDefenders(twoLayersTestBoard) === true


const twoLayersWithHoleTestBoard = {
  board: [
    [_, _, _, _, _, _, _, _, _, _, _],
    [_, _, A, A, A, A, A, A, A, A, A],
    [_, A, _, _, _, _, _, _, _, _, A],
    [_, A, _, _, A, A, A, _, _, _, A],
    [_, A, _, A, _, _, _, A, D, _, A],
    [D, A, _, A, _, K, D, A, _, _, A],
    [_, A, _, A, _, D, _, A, _, A, A],
    [_, A, D, A, _, _, _, A, _, A, _],
    [_, A, _, D, A, A, A, A, _, A, _],
    [_, A, _, _, D, _, _, _, _, A, _],
    [_, _, A, A, A, A, A, A, A, A, _],
  ]
}
const twoLayersWithHoleTest = tafl.didAttackersSurroundDefenders(twoLayersWithHoleTestBoard) === false


const startPositionTestBoard = {
  board: [
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
  ]
}
const startPositionTest = tafl.didAttackersSurroundDefenders(startPositionTestBoard) === false

const tests = {
  simpleTest,
  simpleTestDefenderOutside,
  surroundTest,
  spiralTest,
  closedSpiralTest,
  connectedTest,
  twoLayersTest,
  twoLayersWithHoleTest,
  startPositionTest
}

const failures = Object.keys(tests).filter(k => (!tests[k]))
if (failures.length === 0) {
  console.log(`All ${Object.keys(tests).length} surround tests are passing`)
} else {
  console.log("Failing tests:")
  console.log(failures.join(", "))
}
