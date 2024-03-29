import { Tafl, Piece } from "../src/index";

const tafl = new Tafl();
const A = Piece.PA;
const D = Piece.PD;
const K = Piece.PK;
const _ = Piece.__;

test("Surrounding should work if there is no defender outside", () => {
  expect(
    tafl.didAttackersSurroundDefenders([
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
    ])
  ).toBe(true);
});

test("Surrounding should not work if there is a defender outside", () => {
  expect(
    tafl.didAttackersSurroundDefenders([
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
    ])
  ).toBe(false);
});

test("Surrounding attackers should be equal to true", () => {
  expect(
    tafl.didAttackersSurroundDefenders([
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
    ])
  ).toBe(true);
});

test("Spiral of attackers does not surround defenders", () => {
  expect(
    tafl.didAttackersSurroundDefenders([
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
    ])
  ).toBe(false);
});

test("Closed spiral of attackers surround defenders", () => {
  expect(
    tafl.didAttackersSurroundDefenders([
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
    ])
  ).toBe(true);
});

test("Two layers of attackers does not surround if there is a hole", () => {
  expect(
    tafl.didAttackersSurroundDefenders([
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
    ])
  ).toBe(false);
});

test("Second layer of attackers surround if defenders are between layers", () => {
  expect(
    tafl.didAttackersSurroundDefenders([
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
    ])
  ).toBe(true);
});

test("Two layers of attackers does not surround if there is a defender outside", () => {
  expect(
    tafl.didAttackersSurroundDefenders([
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
    ])
  ).toBe(false);
});

test("Start position does not surround defenders", () => {
  expect(
    tafl.didAttackersSurroundDefenders([
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
    ])
  ).toBe(false);
});
