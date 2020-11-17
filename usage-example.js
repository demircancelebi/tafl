"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const tafl = new index_1.Tafl();
let state = tafl.initialState({
    rules: Object.assign(Object.assign({}, index_1.TaflRuleSet.COPENHAGEN), { [index_1.TaflRule.SAVE_BOARD_HISTORY]: false, [index_1.TaflRule.SAVE_ACTIONS]: false })
});
while (!state.result.finished) {
    const possibleActions = tafl.getPossibleActions(state);
    const randomAction = possibleActions[Math.floor(Math.random() * possibleActions.length)];
    state = tafl.act(state, randomAction);
}
tafl.log(state);
//# sourceMappingURL=usage-example.js.map