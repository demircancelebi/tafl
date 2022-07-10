import { Tafl } from "../src/index";

const tafl = new Tafl();
let state = tafl.initialState(); // by default uses Copenhagen rules on 11x11 board

state = tafl.act(state, { from: { r: 0, c: 3 }, to: { r: 1, c: 3 } });
state = tafl.act(state, { from: { r: 3, c: 5 }, to: { r: 2, c: 5 } });
state = tafl.act(state, { from: { r: 1, c: 3 }, to: { r: 0, c: 3 } });
state = tafl.act(state, { from: { r: 2, c: 5 }, to: { r: 3, c: 5 } });

state = tafl.act(state, { from: { r: 0, c: 3 }, to: { r: 1, c: 3 } });
state = tafl.act(state, { from: { r: 3, c: 5 }, to: { r: 2, c: 5 } });
state = tafl.act(state, { from: { r: 1, c: 3 }, to: { r: 0, c: 3 } });
state = tafl.act(state, { from: { r: 2, c: 5 }, to: { r: 3, c: 5 } });

test("Must be draw on repetition", () => {
  expect(
    state.result!.finished &&
      !state.result!.winner &&
      state.result!.desc === "Draw on repetition"
  ).toBe(true);
});
