import { Tafl, TaflBoard, TaflRuleSet, Piece } from "../index";

const tafl = new Tafl()
const A = Piece.PA
const D = Piece.PD
const K = Piece.PK
const _ = Piece.__

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
  lastAction: { from: { r: 0, c: 1 }, to: { r: 1, c: 1 }},
  rules: TaflRuleSet.COPENHAGEN,
}

const sc = tafl.checkCaptures(simpleCaptureState)
const simpleCaptureTest = sc.length === 1 && sc[0].r === 1 && sc[0].c === 2

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
  rules: TaflRuleSet.COPENHAGEN,
}

const skc = tafl.checkCaptures(simpleKingCaptureState)
const simpleKingCaptureTest = skc.length === 1 && skc[0].r === 1 && skc[0].c === 2


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
  rules: TaflRuleSet.COPENHAGEN,
}

const cck = tafl.checkCaptures(cannotCaptureKingState)
const cannotCaptureKingTest = cck.length === 0

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
  rules: TaflRuleSet.COPENHAGEN,
}

const ccksw = tafl.checkCaptures(cannotCaptureKingShieldWallState)
const cannotCaptureKingShieldWallTest = ccksw.length === 2

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
  rules: TaflRuleSet.COPENHAGEN,
}

const sib = tafl.checkCaptures(simpleInBetweenState)
const simpleInBetweenTest = sib.length === 0


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
  rules: TaflRuleSet.COPENHAGEN,
}
const t2 = tafl.checkCaptures(take2State)
const takeTwoTest = t2.length === 2

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
  rules: TaflRuleSet.COPENHAGEN,
}
const t3 = tafl.checkCaptures(take3State)
const takeThreeTest = t3.length === 3

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
  rules: TaflRuleSet.COPENHAGEN,
}
const tlc = tafl.checkCaptures(topLeftCornerState)
const topLeftCornerTest = tlc.length === 1 && tlc[0].r === 0 && tlc[0].c === 1

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
  rules: TaflRuleSet.COPENHAGEN,
}
const tlac = tafl.checkCaptures(topLeftCornerAttackerState)
const topLeftCornerAttackerTest = tlac.length === 1 && tlac[0].r === 0 && tlac[0].c === 1

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
  rules: TaflRuleSet.COPENHAGEN,
}
const cc = tafl.checkCaptures(checkCenterState)
const checkCenterTest = cc.length === 3


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
  rules: TaflRuleSet.COPENHAGEN,
}
const cca = tafl.checkCaptures(checkCenterAttackerState)
const checkCenterAttackerTest = cca.length === 3


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
  rules: TaflRuleSet.COPENHAGEN,
}
const sw = tafl.checkCaptures(shieldWallState)
const shieldWallTest = sw.length === 3 && sw.reduce((acc, cur) => (cur.c + acc), 0) === 9

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
  rules: TaflRuleSet.COPENHAGEN,
}
const swno = tafl.checkCaptures(shieldWallNoCaptureState)
const shieldWallNoCaptureTest = swno.length === 0

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
  rules: TaflRuleSet.COPENHAGEN,
}
const swa = tafl.checkCaptures(shieldWallAttackerState)
const shieldWallAttackerTest = swa.length === 3 && swa.reduce((acc, cur) => (cur.c + acc), 0) === 9

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
  rules: TaflRuleSet.COPENHAGEN,
}
const swbs = tafl.checkCaptures(shieldWallBothSidesState)
const shieldWallBothSidesTest = swbs.length === 7

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
  rules: TaflRuleSet.COPENHAGEN,
}
const swos = tafl.checkCaptures(shieldWallOneSideState)
const shieldWallOneSideTest = swos.length === 3

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
  rules: TaflRuleSet.COPENHAGEN,
}
const swkos = tafl.checkCaptures(shieldWallKingOneSideState)
const shieldWallKingOneSideTest = swkos.length === 3


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
  rules: TaflRuleSet.COPENHAGEN,
}
const swkow = tafl.checkCaptures(shieldWallKingOnWallState)
const shieldWallKingOnWallTest = swkos.length === 3


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
  rules: TaflRuleSet.COPENHAGEN,
}
const swiw = tafl.checkCaptures(shieldWallIncompleteWallState)
const shieldWallIncompleteWallTest = swiw.length === 0


const tests = {
  simpleCaptureTest,
  simpleKingCaptureTest,
  cannotCaptureKingTest,
  cannotCaptureKingShieldWallTest,
  simpleInBetweenTest,
  takeTwoTest,
  takeThreeTest,
  topLeftCornerTest,
  topLeftCornerAttackerTest,
  checkCenterTest,
  checkCenterAttackerTest,
  shieldWallTest,
  shieldWallNoCaptureTest,
  shieldWallAttackerTest,
  shieldWallBothSidesTest,
  shieldWallOneSideTest,
  shieldWallKingOneSideTest,
  shieldWallKingOnWallTest,
  shieldWallIncompleteWallTest
}

const failures = Object.keys(tests).filter(k => (!tests[k]))
if (failures.length === 0) {
  console.log(`All ${Object.keys(tests).length} capture tests are passing`)
} else {
  console.log("Failing tests:")
  console.log(failures.join(", "))
}
