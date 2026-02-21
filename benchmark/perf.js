"use strict";

const os = require("os");
const path = require("path");

const distPath = path.join(__dirname, "..", "dist", "index.js");
let taflLib;
try {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  taflLib = require(distPath);
} catch (_err) {
  console.error("Could not load dist build at dist/index.js");
  console.error("Run `npm run prepack` first.");
  process.exit(1);
}

const { Tafl, TaflBoard, TaflRuleSet } = taflLib;

function parseArgInt(name, defaultValue, minValue = 0) {
  const prefix = `--${name}=`;
  const hit = process.argv.find((arg) => arg.startsWith(prefix));
  if (!hit) {
    return defaultValue;
  }
  const parsed = Math.floor(Number(hit.slice(prefix.length)));
  if (!Number.isFinite(parsed) || parsed < minValue) {
    return defaultValue;
  }
  return parsed;
}

function nowNs() {
  return process.hrtime.bigint();
}

function formatNum(n) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(n);
}

function formatRate(perSec, unit) {
  if (perSec >= 1_000_000) {
    return `${formatNum(perSec / 1_000_000)}M ${unit}/s`;
  }
  if (perSec >= 1_000) {
    return `${formatNum(perSec / 1_000)}K ${unit}/s`;
  }
  return `${formatNum(perSec)} ${unit}/s`;
}

function bench({ name, warmup, iterations, run, unit = "ops", meanUnit = "us/op" }) {
  for (let i = 0; i < warmup; i += 1) {
    run();
  }

  const start = nowNs();
  for (let i = 0; i < iterations; i += 1) {
    run();
  }
  const end = nowNs();

  const elapsedSec = Number(end - start) / 1_000_000_000;
  const perSec = iterations / elapsedSec;
  const mean = meanUnit === "ms/op"
    ? (elapsedSec * 1_000) / iterations
    : (elapsedSec * 1_000_000) / iterations;

  console.log(
    `${name.padEnd(40)} ${formatRate(perSec, unit).padEnd(16)} ${formatNum(mean)} ${meanUnit}`
  );
}

function createRng(seed) {
  let state = seed >>> 0;
  return function nextInt(maxExclusive) {
    state = (1664525 * state + 1013904223) >>> 0;
    return maxExclusive > 0 ? state % maxExclusive : 0;
  };
}

function runSingleRandomGame({ tafl, maxPlies, rng, board }) {
  let state = tafl.initialState({
    board,
    rules: TaflRuleSet.COPENHAGEN,
  });
  let playedPlies = 0;

  for (let ply = 0; ply < maxPlies && !state.result.finished; ply += 1) {
    const actions = tafl.getPossibleActions(state);
    if (actions.length === 0) {
      break;
    }
    const actionIndex = rng(actions.length);
    state = tafl.act(state, actions[actionIndex]);
    playedPlies += 1;
  }

  return playedPlies;
}

function benchPlayout({ tafl, warmupGames, games, maxPlies, board }) {
  const warmupRng = createRng(42);
  for (let i = 0; i < warmupGames; i += 1) {
    runSingleRandomGame({
      tafl,
      maxPlies,
      rng: warmupRng,
      board,
    });
  }

  const rng = createRng(1337);
  let totalPlies = 0;
  const start = nowNs();
  for (let i = 0; i < games; i += 1) {
    totalPlies += runSingleRandomGame({
      tafl,
      maxPlies,
      rng,
      board,
    });
  }
  const end = nowNs();

  const elapsedSec = Number(end - start) / 1_000_000_000;
  const gamesPerSec = games / elapsedSec;
  const pliesPerSec = totalPlies / elapsedSec;
  const meanMsPerGame = (elapsedSec * 1_000) / games;
  const meanPliesPerGame = totalPlies / games;

  console.log(
    `${"random playout game (classic)".padEnd(40)} ${formatRate(gamesPerSec, "games").padEnd(
      16
    )} ${formatNum(meanMsPerGame)} ms/game`
  );
  console.log(
    `${"".padEnd(40)} ${formatRate(pliesPerSec, "plies").padEnd(16)} avg ${formatNum(
      meanPliesPerGame
    )} plies/game`
  );
}

function main() {
  const warmup = parseArgInt("warmup", 2_000, 0);
  const iterations = parseArgInt("iterations", 20_000, 1);
  const games = parseArgInt("games", 30, 1);
  const warmupGames = parseArgInt("warmup-games", 3, 0);
  const plies = parseArgInt("plies", 300, 1);

  const cpu = os.cpus()[0]?.model || "unknown";
  console.log(`Node: ${process.version}`);
  console.log(`CPU: ${cpu}`);
  console.log(
    `Config: warmup=${warmup}, iterations=${iterations}, warmup-games=${warmupGames}, games=${games}, plies=${plies}`
  );
  console.log("");

  const tafl = new Tafl();
  const classicState = tafl.initialState({
    board: TaflBoard._11_CLASSIC,
    rules: TaflRuleSet.COPENHAGEN,
  });
  const aleaState = tafl.initialState({
    board: TaflBoard._19_ALEA_EVANGELII,
    rules: TaflRuleSet.COPENHAGEN,
  });
  const classicActions = tafl.getPossibleActions(classicState);
  const sampleAction = classicActions[Math.floor(classicActions.length / 2)];

  console.log("Micro Benchmarks");
  console.log("-".repeat(72));
  console.log("Scenario".padEnd(40), "Throughput".padEnd(16), "Mean");
  console.log("-".repeat(72));

  bench({
    name: "getPossibleActions (11x11 classic)",
    warmup,
    iterations,
    run: () => tafl.getPossibleActions(classicState),
  });

  bench({
    name: "getPossibleActions (19x19 alea)",
    warmup,
    iterations,
    run: () => tafl.getPossibleActions(aleaState),
  });

  bench({
    name: "isActionPossible (single legal action)",
    warmup,
    iterations,
    run: () => tafl.isActionPossible(classicState, sampleAction),
  });

  bench({
    name: "act (single legal action)",
    warmup,
    iterations,
    run: () => tafl.act(classicState, sampleAction),
  });

  console.log("");
  console.log("Playout Benchmark");
  console.log("-".repeat(72));
  console.log("Scenario".padEnd(40), "Throughput".padEnd(16), "Mean");
  console.log("-".repeat(72));

  benchPlayout({
    tafl,
    warmupGames,
    games,
    maxPlies: plies,
    board: TaflBoard._11_CLASSIC,
  });

  console.log("");
  console.log("Notes:");
  console.log("- In playout benchmark, total timed games is exactly `--games`.");
  console.log("- Use the same args before/after code changes for fair comparison.");
  console.log("Example:");
  console.log(
    "  npm run bench -- --warmup=2000 --iterations=20000 --warmup-games=3 --games=30 --plies=300"
  );
}

main();
