import { Tafl, TaflRule, TaflRuleSet } from "./src/index";

const tafl = new Tafl();
let state = tafl.initialState({
  rules: {
    ...TaflRuleSet.COPENHAGEN,
    [TaflRule.SAVE_BOARD_HISTORY]: false, // forgoing 3-fold repetition checks for the sake of simulation speed
    [TaflRule.SAVE_ACTIONS]: false, // actions have no real benefit in simulations
  },
});

while (!state.result!.finished) {
  const possibleActions = tafl.getPossibleActions(state);
  const randomAction =
    possibleActions[Math.floor(Math.random() * possibleActions.length)];

  state = tafl.act(state, randomAction);
}

tafl.log(state);
