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
test("hash check", () => {
  expect(tafl.getBoardHash(simpleTestBoard.board)).toBe("ppb0VctBdeE7mF6QKsfvj5wDJM8=")
})

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
test("hash check", () => {
  expect(tafl.getBoardHash(simpleTestDefenderOutsideBoard.board)).toBe("/HVvwa9PwtFACGWQIxkIUau9ld8=")
})

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
test("hash check", () => {
  expect(tafl.getBoardHash(surroundTestBoard.board)).toBe("Hm7ygxCBTKyF7v2Fv/rYvO1SNzA=")
})

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
test("hash check", () => {
  expect(tafl.getBoardHash(spiralTestBoard.board)).toBe("nyAFXVAuvxneZMlVxOJn3qIpCN8=")
})

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
test("hash check", () => {
  expect(tafl.getBoardHash(closedSpiralTestBoard.board)).toBe("FyTtTGi76TsVwHB3nek2Dn5hECI=")
})

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
test("hash check", () => {
  expect(tafl.getBoardHash(connectedTestBoard.board)).toBe("SCBY/71cYICVQwEUBR08sIsZK8s=")
})

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
test("hash check", () => {
  expect(tafl.getBoardHash(twoLayersTestBoard.board)).toBe("Cs62PHjYqhMG33kgH/xjhCfOxLY=")
})

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
test("hash check", () => {
  expect(tafl.getBoardHash(twoLayersWithHoleTestBoard.board)).toBe("kkdQ5da51qCA1tD3UbucNWDw5j4=")
})

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
test("hash check", () => {
  expect(tafl.getBoardHash(startPositionTestBoard.board)).toBe("bX5h3MSdCTIZPtpwyocJM39GJR0=")
})