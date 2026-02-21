import { Tafl, Piece } from "../src/index";

const tafl = new Tafl();
const A = Piece.PA;
const D = Piece.PD;
const K = Piece.PK;
const _ = Piece.__;

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
  ],
};
test("hash check", () => {
  expect(tafl.getBoardHash(simpleTestBoard.board)).toBe(
    "           |           |           |     A     |    ADA    |    AK A   |     AA    |           |           |           |           "
  );
});

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
  ],
};
test("hash check", () => {
  expect(tafl.getBoardHash(simpleTestDefenderOutsideBoard.board)).toBe(
    "           |           |   D       |     A     |    ADA    |    AK A   |     AA    |           |           |           |           "
  );
});

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
  ],
};
test("hash check", () => {
  expect(tafl.getBoardHash(surroundTestBoard.board)).toBe(
    "        AA | AAAAAA    | A  D  A   |A D     AAA|A D KDD   A|AAD    AAAA|A  AD A    | A  DA     |  A A  A   |   AA A  A |           "
  );
});

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
  ],
};
test("hash check", () => {
  expect(tafl.getBoardHash(spiralTestBoard.board)).toBe(
    "        A  |   AAAA  A |  A DDDA  A| A  AA  A A| A A  A A A| A A KD A A| A A D A  A| A  AAA  A |  A     A  |   AAAAA   |           "
  );
});

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
  ],
};
test("hash check", () => {
  expect(tafl.getBoardHash(closedSpiralTestBoard.board)).toBe(
    "       AA  |   AAAA  A |  A DDDA  A| A  AA  A A| A A  A A A| A A KD A A| A A D A  A| A  AAA  A |  A     A  |   AAAAA   |           "
  );
});

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
  ],
};
test("hash check", () => {
  expect(tafl.getBoardHash(connectedTestBoard.board)).toBe(
    "           | AAAAAAAAAA|  A       A| A  AAAA  A| A A    A A| A A KD A A| A A D  A A| A  A  A  A| A   A A  A|  AAAA  AA |           "
  );
});

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
  ],
};
test("hash check", () => {
  expect(tafl.getBoardHash(twoLayersTestBoard.board)).toBe(
    "           |  AAAAAAAAA| A        A| A  AAA   A| A A   AD A| A A KDA  A| A A D A AA| ADA   A A | A DAAAA A | A  D    A |  AAAAAAAA "
  );
});

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
  ],
};
test("hash check", () => {
  expect(tafl.getBoardHash(twoLayersWithHoleTestBoard.board)).toBe(
    "           |  AAAAAAAAA| A        A| A  AAA   A| A A   AD A|DA A KDA  A| A A D A AA| ADA   A A | A DAAAA A | A  D    A |  AAAAAAAA "
  );
});

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
  ],
};
test("hash check", () => {
  expect(tafl.getBoardHash(startPositionTestBoard.board)).toBe(
    "   AAAAA   |     A     |           |A    D    A|A   DDD   A|AA DDKDD AA|A   DDD   A|A    D    A|           |     A     |   AAAAA   "
  );
});
