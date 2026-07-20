import {
  GameState,
  Tafl,
  TaflRepetitionOutcome,
  TaflRule,
  TaflRuleSet,
  TaflSide,
} from "../src/index";

const repetitionMoves = [
  { from: { r: 0, c: 3 }, to: { r: 1, c: 3 } },
  { from: { r: 3, c: 5 }, to: { r: 2, c: 5 } },
  { from: { r: 1, c: 3 }, to: { r: 0, c: 3 } },
  { from: { r: 2, c: 5 }, to: { r: 3, c: 5 } },
  { from: { r: 0, c: 3 }, to: { r: 1, c: 3 } },
  { from: { r: 3, c: 5 }, to: { r: 2, c: 5 } },
  { from: { r: 1, c: 3 }, to: { r: 0, c: 3 } },
  { from: { r: 2, c: 5 }, to: { r: 3, c: 5 } },
];

function stateAfterThirdRepetition(rules?: GameState["rules"]): GameState {
  const tafl = new Tafl();
  let state = tafl.initialState(rules ? { rules } : undefined);

  for (const move of repetitionMoves) {
    state = tafl.act(state, move);
  }

  return state;
}

test("explicit draw outcome preserves the existing repetition result", () => {
  const state = stateAfterThirdRepetition({
    ...TaflRuleSet.COPENHAGEN,
    [TaflRule.REPETITION_OUTCOME]: TaflRepetitionOutcome.DRAW,
  });

  expect(state.result).toEqual({
    finished: true,
    winner: null,
    desc: "Draw on repetition",
  });
});

test("Copenhagen makes the defender lose on repetition by default", () => {
  expect(TaflRuleSet.COPENHAGEN[TaflRule.REPETITION_OUTCOME]).toBe(
    TaflRepetitionOutcome.DEFENDER_LOSES
  );

  const state = stateAfterThirdRepetition();

  expect(state.result).toEqual({
    finished: true,
    winner: TaflSide.ATTACKER,
    desc: "Defender loses on repetition",
  });
});

test("mover loses on repetition when configured", () => {
  const state = stateAfterThirdRepetition({
    ...TaflRuleSet.COPENHAGEN,
    [TaflRule.REPETITION_OUTCOME]: TaflRepetitionOutcome.MOVER_LOSES,
  });
  const finishingPly = repetitionMoves.length;
  const finishingMover =
    finishingPly % 2 === 1 ? TaflSide.ATTACKER : TaflSide.DEFENDER;
  const expectedWinner =
    finishingMover === TaflSide.ATTACKER
      ? TaflSide.DEFENDER
      : TaflSide.ATTACKER;

  expect(state.result).toEqual({
    finished: true,
    winner: expectedWinner,
    desc: "Mover loses on repetition",
  });
});

test("missing repetition outcome falls back to a draw", () => {
  const rulesWithoutRepetitionOutcome: GameState["rules"] = {
    ...TaflRuleSet.COPENHAGEN,
  };
  delete rulesWithoutRepetitionOutcome![TaflRule.REPETITION_OUTCOME];
  const tafl = new Tafl();
  let state = tafl.initialState();
  state = { ...state, rules: rulesWithoutRepetitionOutcome };

  for (const move of repetitionMoves) {
    state = tafl.act(state, move);
  }

  expect(
    rulesWithoutRepetitionOutcome![TaflRule.REPETITION_OUTCOME]
  ).toBeUndefined();
  expect(state.result).toEqual({
    finished: true,
    winner: null,
    desc: "Draw on repetition",
  });
});
