# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.0](https://github.com/demircancelebi/tafl/compare/v3.0.1...v4.0.0) (2026-07-21)


### ⚠ BREAKING CHANGES

* games played with TaflRuleSet.COPENHAGEN that reach
threefold repetition now end as an attacker win instead of a draw.
Set [TaflRule.REPETITION_OUTCOME]: TaflRepetitionOutcome.DRAW to
retain the old behavior.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

### Features

* configurable repetition outcome, Copenhagen defaults to defender loss ([fe2abe0](https://github.com/demircancelebi/tafl/commit/fe2abe0879fdd0ef3a326ae1b0aaedb93c49252d))


### Bug Fixes

* allow pieces to pass through the empty throne ([6af23be](https://github.com/demircancelebi/tafl/commit/6af23bec4b6bf68d95b309a8692b02ea3e07258e))
* positional exit-fort detection with explicit king-mobility check ([e86d862](https://github.com/demircancelebi/tafl/commit/e86d8620a569a0ce75e2f9beef9bea9227928390))

### [3.0.1](https://github.com/demircancelebi/tafl/compare/v3.0.0...v3.0.1) (2026-04-27)


### Bug Fixes

* default Alea Evangelii corners to 2x2 ([6b5fa75](https://github.com/demircancelebi/tafl/commit/6b5fa75bcc7b97dbced36de7a5f86f6717035fbc))

## [3.0.0](https://github.com/demircancelebi/tafl/compare/v2.5.0...v3.0.0) (2026-02-21)

## [2.5.0](https://github.com/demircancelebi/tafl/compare/v2.3.2...v2.5.0) (2022-09-01)


### Features

* typescript fixes ([9e64142](https://github.com/demircancelebi/tafl/commit/9e641426116302e9f5135d2c938338bb5faac174))


### Bug Fixes

* add prepack script ([c1f91ff](https://github.com/demircancelebi/tafl/commit/c1f91ff0b666cfed53792d38c3bef0452e081c0b))

### [2.3.2](https://github.com/demircancelebi/tafl/compare/v2.3.1...v2.3.2) (2020-11-25)

### [2.3.1](https://github.com/demircancelebi/tafl/compare/v2.3.0...v2.3.1) (2020-11-17)

## [2.3.0](https://github.com/demircancelebi/tafl/compare/v2.2.0...v2.3.0) (2020-11-17)


### Features

* **speed:** add SAVE_BOARD_HISTORY and SAVE_ACTIONS options ([146d835](https://github.com/demircancelebi/tafl/commit/146d835db87a08085d625c780ba71ec3d20ff0b9))

## [2.2.0](https://github.com/demircancelebi/tafl/compare/v2.1.3...v2.2.0) (2020-11-16)


### Features

* **game rules:** add support for checking equivalent board states (rotations/symmetries) ([9e61d6c](https://github.com/demircancelebi/tafl/commit/9e61d6c96338f3127f15c2fd8d89f0ae15aec9a0))

### [2.1.3](https://github.com/demircancelebi/tafl/compare/v2.1.2...v2.1.3) (2020-11-16)

### [2.1.2](https://github.com/demircancelebi/tafl/compare/v2.1.1...v2.1.2) (2020-11-16)

### [2.1.1](https://github.com/demircancelebi/tafl/compare/v2.1.0...v2.1.1) (2020-11-16)

## [2.1.0](https://github.com/demircancelebi/tafl/compare/v2.0.1...v2.1.0) (2020-11-16)


### Features

* **game rules:** add actions/boardHistory to state, check repetitions ([de810ab](https://github.com/demircancelebi/tafl/commit/de810ab98404e879dc47c84fc19e4be7fa66c3ce))

### [2.0.1](https://github.com/demircancelebi/tafl/compare/v2.0.0...v2.0.1) (2020-11-16)

## 2.0.0 (2020-11-16)


### ⚠ BREAKING CHANGES

* **add surrounding and commitizen support:** Surrounding will cause the game to behave differently

### Features

* **add surrounding and commitizen support:** added check and tests for surrounding and commitizen ([ba2a052](https://github.com/demircancelebi/tafl/commit/ba2a052f225a55165c40e3179d4a9c1b8365d2b6))
