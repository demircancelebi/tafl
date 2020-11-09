"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
}
class Side extends String {
}
class Rule {
}
class RuleSet {
}
const util = require("util");
var Piece;
(function (Piece) {
    Piece["__"] = " ";
    Piece["PA"] = "A";
    Piece["PD"] = "D";
    Piece["PK"] = "K";
})(Piece || (Piece = {}));
exports.Piece = Piece;
const _ = Piece.__;
const A = Piece.PA;
const D = Piece.PD;
const K = Piece.PK;
class TaflBoard {
}
exports.TaflBoard = TaflBoard;
// Irish
TaflBoard._7_BRANDUBH = [
    [_, _, _, A, _, _, _],
    [_, _, _, A, _, _, _],
    [_, _, _, D, _, _, _],
    [A, A, D, K, D, A, A],
    [_, _, _, D, _, _, _],
    [_, _, _, A, _, _, _],
    [_, _, _, A, _, _, _],
];
// Saami
TaflBoard._9_TABLUT = [
    [_, _, _, A, A, A, _, _, _],
    [_, _, _, _, A, _, _, _, _],
    [_, _, _, _, D, _, _, _, _],
    [A, _, _, _, D, _, _, _, A],
    [A, A, D, D, K, D, D, A, A],
    [A, _, _, _, D, _, _, _, A],
    [_, _, _, _, D, _, _, _, _],
    [_, _, _, _, A, _, _, _, _],
    [_, _, _, A, A, A, _, _, _],
];
TaflBoard._11_CLASSIC = [
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
];
TaflBoard._11_LINE = [
    [_, _, _, A, A, A, A, A, _, _, _],
    [_, _, _, _, _, A, _, _, _, _, _],
    [_, _, _, _, _, D, _, _, _, _, _],
    [A, _, _, _, _, D, _, _, _, _, A],
    [A, _, _, _, _, D, _, _, _, _, A],
    [A, A, D, D, D, K, D, D, D, A, A],
    [A, _, _, _, _, D, _, _, _, _, A],
    [A, _, _, _, _, D, _, _, _, _, A],
    [_, _, _, _, _, D, _, _, _, _, _],
    [_, _, _, _, _, A, _, _, _, _, _],
    [_, _, _, A, A, A, A, A, _, _, _],
];
// Welsh
TaflBoard._11_TAWLBWRDD = [
    [_, _, _, _, A, A, A, _, _, _, _],
    [_, _, _, _, A, _, A, _, _, _, _],
    [_, _, _, _, _, A, _, _, _, _, _],
    [_, _, _, _, _, D, _, _, _, _, _],
    [A, A, _, _, D, D, D, _, _, A, A],
    [A, _, A, D, D, K, D, D, A, _, A],
    [A, A, _, _, D, D, D, _, _, A, A],
    [_, _, _, _, _, D, _, _, _, _, _],
    [_, _, _, _, _, A, _, _, _, _, _],
    [_, _, _, _, A, _, A, _, _, _, _],
    [_, _, _, _, A, A, A, _, _, _, _],
];
TaflBoard._11_LEWISS = [
    [_, _, _, _, A, A, A, _, _, _, _],
    [_, _, _, _, A, A, A, _, _, _, _],
    [_, _, _, _, _, D, _, _, _, _, _],
    [_, _, _, _, _, D, _, _, _, _, _],
    [A, A, _, _, _, D, _, _, _, A, A],
    [A, A, D, D, D, K, D, D, D, A, A],
    [A, A, _, _, _, D, _, _, _, A, A],
    [_, _, _, _, _, D, _, _, _, _, _],
    [_, _, _, _, _, D, _, _, _, _, _],
    [_, _, _, _, A, A, A, _, _, _, _],
    [_, _, _, _, A, A, A, _, _, _, _],
];
TaflBoard._13_PARLETT = [
    [_, _, _, _, A, A, A, A, A, _, _, _, _],
    [_, _, _, _, _, A, _, A, _, _, _, _, _],
    [_, _, _, _, _, _, A, _, _, _, _, _, _],
    [_, _, _, _, _, _, D, _, _, _, _, _, _],
    [A, _, _, _, D, _, _, _, D, _, _, _, A],
    [A, A, _, _, _, D, D, D, _, _, _, A, A],
    [A, _, A, D, _, D, K, D, _, D, A, _, A],
    [A, A, _, _, _, D, D, D, _, _, _, A, A],
    [A, _, _, _, D, _, _, _, D, _, _, _, A],
    [_, _, _, _, _, _, D, _, _, _, _, _, _],
    [_, _, _, _, _, _, A, _, _, _, _, _, _],
    [_, _, _, _, _, A, _, A, _, _, _, _, _],
    [_, _, _, _, A, A, A, A, A, _, _, _, _],
];
TaflBoard._15_DAMIEN_WALKER = [
    [_, _, _, _, _, A, A, A, A, A, _, _, _, _, _],
    [_, _, _, _, _, _, A, A, A, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, A, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, A, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, D, _, _, _, _, _, _, _],
    [A, _, _, _, _, _, D, D, D, _, _, _, _, _, A],
    [A, A, _, _, _, D, _, D, _, D, _, _, _, A, A],
    [A, A, A, A, D, D, D, K, D, D, D, A, A, A, A],
    [A, A, _, _, _, D, _, D, _, D, _, _, _, A, A],
    [A, _, _, _, _, _, D, D, D, _, _, _, _, _, A],
    [_, _, _, _, _, _, _, D, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, A, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, A, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, A, A, A, _, _, _, _, _, _],
    [_, _, _, _, _, A, A, A, A, A, _, _, _, _, _],
];
TaflBoard._19_ALEA_EVANGELII = [
    [_, _, A, _, _, A, _, _, _, _, _, _, _, A, _, _, A, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [A, _, _, _, _, A, _, _, _, _, _, _, _, A, _, _, _, _, A],
    [_, _, _, _, _, _, _, A, _, A, _, A, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, A, _, D, _, D, _, A, _, _, _, _, _, _],
    [A, _, A, _, _, A, _, _, _, _, _, _, _, A, _, _, A, _, A],
    [_, _, _, _, A, _, _, _, _, D, _, _, _, _, A, _, _, _, _],
    [_, _, _, A, _, _, _, _, D, _, D, _, _, _, _, A, _, _, _],
    [_, _, _, _, D, _, _, D, _, D, _, D, _, _, D, _, _, _, _],
    [_, _, _, A, _, _, D, _, D, K, D, _, D, _, _, A, _, _, _],
    [_, _, _, _, D, _, _, D, _, D, _, D, _, _, D, _, _, _, _],
    [_, _, _, A, _, _, _, _, D, _, D, _, _, _, _, A, _, _, _],
    [_, _, _, _, A, _, _, _, _, D, _, _, _, _, A, _, _, _, _],
    [A, _, A, _, _, A, _, _, _, _, _, _, _, A, _, _, A, _, A],
    [_, _, _, _, _, _, A, _, D, _, D, _, A, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, A, _, A, _, A, _, _, _, _, _, _, _],
    [A, _, _, _, _, A, _, _, _, _, _, _, _, A, _, _, _, _, A],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    [_, _, A, _, _, A, _, _, _, _, _, _, _, A, _, _, A, _, _],
];
class TaflSide extends Side {
}
TaflSide.ATTACKER = "Attacker";
TaflSide.DEFENDER = "Defender";
class TaflRule extends Rule {
}
exports.TaflRule = TaflRule;
TaflRule.KING_IS_ARMED = 'kingIsArmed';
TaflRule.KING_CAN_RETURN_TO_CENTER = 'kingCanReturnToCenter';
TaflRule.ATTACKER_COUNT_TO_CAPTURE = 'attackerCountToCapture';
TaflRule.SHIELD_WALLS = 'shieldWalls';
TaflRule.EXIT_FORTS = 'exitForts';
TaflRule.EDGE_ESCAPE = 'edgeEscape';
TaflRule.CORNER_BASE_WIDTH = 'cornerBaseWidth';
TaflRule.STARTING_SIDE = 'startingSide';
class TaflRuleSet extends RuleSet {
}
exports.TaflRuleSet = TaflRuleSet;
TaflRuleSet.COPENHAGEN = {
    [TaflRule.KING_IS_ARMED]: true,
    [TaflRule.KING_CAN_RETURN_TO_CENTER]: true,
    [TaflRule.ATTACKER_COUNT_TO_CAPTURE]: 4,
    [TaflRule.SHIELD_WALLS]: true,
    [TaflRule.EXIT_FORTS]: true,
    [TaflRule.EDGE_ESCAPE]: false,
    [TaflRule.CORNER_BASE_WIDTH]: 1,
    [TaflRule.STARTING_SIDE]: TaflSide.ATTACKER
};
class Tafl {
    constructor() {
        this.name = "Tafl";
        this.controlMap = new Map([
            [TaflSide.ATTACKER, new Set([Piece.PA])],
            [TaflSide.DEFENDER, new Set([Piece.PD, Piece.PK])]
        ]);
        this.sideMap = new Map([
            [Piece.PA, TaflSide.ATTACKER],
            [Piece.PD, TaflSide.DEFENDER],
            [Piece.PK, TaflSide.DEFENDER],
        ]);
    }
    initialState(init) {
        var _a, _b;
        const initialState = {
            turn: 0,
            result: {
                finished: false,
                winner: null,
                desc: ''
            },
            lastAction: null,
            rules: ((_a = init) === null || _a === void 0 ? void 0 : _a.rules) || TaflRuleSet.COPENHAGEN,
            board: ((_b = init) === null || _b === void 0 ? void 0 : _b.board) || TaflBoard._11_CLASSIC
        };
        return initialState;
    }
    log(thing) {
        console.log(util.inspect(thing, {
            showHidden: false,
            depth: null,
            colorize: true,
            maxArrayLength: 100,
            breakLength: 100,
            compact: true
        }));
    }
    isCenter(state, coords) {
        const n = state.board.length;
        const center = Math.floor(n / 2);
        return coords.r === center && coords.c === center;
    }
    isCorner(state, coords) {
        const n = state.board.length;
        const w = state.rules[TaflRule.CORNER_BASE_WIDTH];
        let [rowRes, colRes] = [false, false];
        for (let ww = 0; ww < w; ww += 1) {
            rowRes = rowRes || (coords.r === ww || coords.r === n - 1 - ww);
            colRes = colRes || (coords.c === ww || coords.c === n - 1 - ww);
        }
        return rowRes && colRes;
    }
    isEdge(state, coords) {
        const n = state.board.length;
        const fstRow = coords.r === 0;
        const lstRow = coords.r === n - 1;
        const fstCol = coords.c === 0;
        const lstCol = coords.c === n - 1;
        const onEdge = fstRow || lstRow || fstCol || lstCol;
        return onEdge && !this.isCorner(state, coords);
    }
    repr(coords) {
        return `${coords.r}_${coords.c}`;
    }
    coords(repr) {
        const splitted = repr.split('_');
        return { r: parseInt(splitted[0], 10), c: parseInt(splitted[1], 10) };
    }
    toPathRepr(...args) {
        return args.map(this.repr).join('->');
    }
    toPathCoords(path) {
        return path.split('->').map(this.coords);
    }
    insideBounds(state, coords) {
        const rowInsideBounds = coords.r >= 0 && coords.r <= state.board.length - 1;
        const colInsideBounds = coords.c >= 0 && coords.c <= state.board.length - 1;
        return rowInsideBounds && colInsideBounds;
    }
    connectedDefenders(state, coords) {
        const that = this;
        function getConnectedDefenders(state, coords, setOfCoords) {
            setOfCoords.add(that.repr(coords));
            for (let r = -1; r <= 1; r += 1) {
                for (let c = -1; c <= 1; c += 1) {
                    const newCoords = { r: coords.r + r, c: coords.c + c };
                    const isSelf = r === 0 && c === 0;
                    if (that.insideBounds(state, newCoords) && !isSelf && that.isDefender(state, newCoords)) {
                        if (!setOfCoords.has(that.repr(newCoords))) {
                            getConnectedDefenders(state, newCoords, setOfCoords);
                        }
                    }
                }
            }
        }
        const connectedDefenders = new Set();
        getConnectedDefenders(state, coords, connectedDefenders);
        return connectedDefenders;
    }
    possiblySurrondingDefenders(state, kingCoords) {
        const possiblySurroundingDefendersSet = new Set();
        const processed = new Set();
        const q = new Array();
        // we'll look in 4 directions starting from the king
        const neighbors_4 = [[-1, 0], [0, -1], [0, 1], [1, 0]];
        q.push(this.repr(kingCoords));
        while (q.length > 0) {
            const curCoords = this.coords(q.pop());
            for (const neighbor of neighbors_4) {
                const neighborCoords = { r: curCoords.r + neighbor[0], c: curCoords.c + neighbor[1] };
                if (this.insideBounds(state, neighborCoords) && !processed.has(this.repr(neighborCoords))) {
                    if (this.isDefender(state, neighborCoords)) {
                        possiblySurroundingDefendersSet.add(this.repr(neighborCoords));
                    }
                    else {
                        q.push(this.repr(neighborCoords));
                    }
                }
            }
            processed.add(this.repr(curCoords));
        }
        return [...possiblySurroundingDefendersSet].map(this.coords);
    }
    isInsideEye(state, coords, fullFortStructure) {
        const [smallestEye, attackersInEye] = this.getEmptyPiecesAndAttackersInsideSmallestFort(state, coords, fullFortStructure);
        if (attackersInEye.size > 0) {
            return false;
        }
        return smallestEye.has(this.repr(coords));
    }
    getPossibleSmallestFortStructure(state, innerSet, fullStructure) {
        const processed = new Set();
        const neighbors_4 = [[-1, 0], [0, -1], [0, 1], [1, 0]];
        const smallest = new Set();
        for (const innerRepr of innerSet) {
            const innerCoords = this.coords(innerRepr);
            for (const neighbor of neighbors_4) {
                const neighborCoords = { r: innerCoords.r + neighbor[0], c: innerCoords.c + neighbor[1] };
                if (this.insideBounds(state, neighborCoords) && !processed.has(this.repr(neighborCoords))) {
                    if (this.isDefender(state, neighborCoords)) {
                        smallest.add(this.repr(neighborCoords));
                    }
                    processed.add(this.repr(neighborCoords));
                }
            }
        }
        let intersection = new Set([...fullStructure].filter(x => smallest.has(x)));
        return intersection;
    }
    getEmptyPiecesAndAttackersInsideSmallestFort(state, kingCoords, fullFortStructure) {
        const attackerSet = new Set();
        const innerSet = new Set();
        const processed = new Set();
        const q = new Array();
        // we'll look in 4 directions starting from the king
        const neighbors_4 = [[-1, 0], [0, -1], [0, 1], [1, 0]];
        q.push(this.repr(kingCoords));
        while (q.length > 0) {
            const curCoords = this.coords(q.pop());
            if (this.insideBounds(state, curCoords) && !processed.has(this.repr(curCoords))) {
                if (!fullFortStructure.has(this.repr(curCoords))) {
                    if (this.isEmpty(state, curCoords) || this.isDfOrKing(state, curCoords)) {
                        innerSet.add(this.repr(curCoords));
                    }
                    else if (this.isAttacker(state, curCoords)) {
                        attackerSet.add(this.repr(curCoords));
                    }
                    for (const neighbor of neighbors_4) {
                        const neighborCoords = { r: curCoords.r + neighbor[0], c: curCoords.c + neighbor[1] };
                        q.push(this.repr(neighborCoords));
                    }
                }
            }
            processed.add(this.repr(curCoords));
        }
        return [innerSet, attackerSet];
    }
    insideFort(state, kingCoords) {
        const kingOnTopRow = kingCoords.r === 0;
        const kingOnBottomRow = kingCoords.r === state.board.length - 1;
        const kingOnLeftmostCol = kingCoords.c === 0;
        const kingOnRightmostCol = kingCoords.c === state.board.length - 1;
        let res = false;
        if (kingOnTopRow || kingOnBottomRow) {
            const defenderCount = state.board[kingCoords.r].reduce((acc, cur) => {
                const p = (cur === Piece.PD) ? 1 : 0;
                return acc + p;
            }, 0);
            if (defenderCount >= 2) { // at least 2 defenders are required for a fort
                res = this.fortSearchFromKing(state, kingCoords);
            }
        }
        else if (kingOnLeftmostCol || kingOnRightmostCol) {
            const defenderCount = state.board.reduce((acc, cur) => {
                const p = (cur[kingCoords.c] === Piece.PD) ? 1 : 0;
                return acc + p;
            }, 0);
            if (defenderCount >= 2) { // at least 2 defenders are required for a fort
                res = this.fortSearchFromKing(state, kingCoords);
            }
        }
        return res;
    }
    kingEscapedThroughFort(state) {
        var _a;
        const lastTo = (_a = state.lastAction) === null || _a === void 0 ? void 0 : _a.to;
        const king = this.isKing(state, lastTo);
        if (!king) {
            return false;
        }
        const onEdge = this.isEdge(state, lastTo);
        if (!onEdge) {
            return false;
        }
        const insideFort = this.insideFort(state, lastTo);
        return insideFort;
    }
    isBase(state, coords) {
        return this.isCenter(state, coords) || this.isCorner(state, coords);
    }
    isEmpty(state, coords) {
        return this.pieceAt(state, coords) === Piece.__;
    }
    isEmptyBase(state, coords) {
        return this.isBase(state, coords) && this.isEmpty(state, coords);
    }
    isKing(state, coords) {
        return this.pieceAt(state, coords) === Piece.PK;
    }
    isAttacker(state, coords) {
        return this.pieceAt(state, coords) === Piece.PA;
    }
    isDefender(state, coords) {
        return this.pieceAt(state, coords) === Piece.PD;
    }
    isDfOrKing(state, coords) {
        return this.isDefender(state, coords) || this.isKing(state, coords);
    }
    canHelpCapture(state, coords, canHelp) {
        const isAttackerAndCanHelpAttackers = this.isAttacker(state, coords) && canHelp === TaflSide.ATTACKER;
        const isDefenderAndCanHelpDefenders = this.isDefender(state, coords) && canHelp === TaflSide.DEFENDER;
        const isKingAndCanHelpDefenders = state.rules[TaflRule.KING_IS_ARMED] && this.isKing(state, coords) && canHelp === TaflSide.DEFENDER;
        return this.isEmptyBase(state, coords) || isAttackerAndCanHelpAttackers || isDefenderAndCanHelpDefenders || isKingAndCanHelpDefenders;
    }
    turnSide(state) {
        const evenTurn = state.turn % 2 === 0;
        const attackerStarts = state.rules[TaflRule.STARTING_SIDE] === TaflSide.ATTACKER;
        return (attackerStarts === evenTurn) ? TaflSide.ATTACKER : TaflSide.DEFENDER;
    }
    opponentSide(state) {
        const turnSide = this.turnSide(state);
        return (turnSide === TaflSide.ATTACKER) ? TaflSide.DEFENDER : TaflSide.ATTACKER;
    }
    canControl(side, piece) {
        return !!(this.controlMap.get(side) && this.controlMap.get(side).has(piece));
    }
    sideOfPiece(piece) {
        return this.sideMap.get(piece);
    }
    pieceAt(state, coords) {
        return state.board[coords.r][coords.c];
    }
    canMovePieceHere(state, piece, coords) {
        const empty = this.isEmpty(state, coords);
        const king = piece === Piece.PK;
        const base = this.isBase(state, coords);
        const center = this.isCenter(state, coords);
        const corner = this.isCorner(state, coords);
        const centerOk = state.rules[TaflRule.KING_CAN_RETURN_TO_CENTER];
        return (empty && !base) || (king && ((centerOk && center) || corner));
    }
    getPossibleMovesFrom(state, coords) {
        const row = coords.r;
        const col = coords.c;
        const res = [];
        const piece = this.pieceAt(state, coords);
        const n = state.board.length;
        let rowCount = row - 1;
        while (rowCount >= 0 && this.canMovePieceHere(state, piece, { r: rowCount, c: col })) {
            res.push({ r: rowCount, c: col });
            rowCount -= 1;
        }
        rowCount = row + 1;
        while (rowCount <= n - 1 && this.canMovePieceHere(state, piece, { r: rowCount, c: col })) {
            res.push({ r: rowCount, c: col });
            rowCount += 1;
        }
        let colCount = col - 1;
        while (colCount >= 0 && this.canMovePieceHere(state, piece, { r: row, c: colCount })) {
            res.push({ r: row, c: colCount });
            colCount -= 1;
        }
        colCount = col + 1;
        while (colCount <= n - 1 && this.canMovePieceHere(state, piece, { r: row, c: colCount })) {
            res.push({ r: row, c: colCount });
            colCount += 1;
        }
        return res;
    }
    canMakeAMove(state, side) {
        return this.getPossibleActions(state, side).length > 0;
    }
    fortSearchFromKing(state, kingCoords) {
        const possiblySurroundingDefendersCoords = this.possiblySurrondingDefenders(state, kingCoords);
        const searchOnRow = kingCoords.r === 0 || kingCoords.r === state.board.length - 1;
        const defendersOnSameSearchRowOrSearchCol = searchOnRow ?
            possiblySurroundingDefendersCoords.filter(coords => coords.r === kingCoords.r) :
            possiblySurroundingDefendersCoords.filter(coords => coords.c === kingCoords.c);
        const defendersBeforeKing = searchOnRow ?
            defendersOnSameSearchRowOrSearchCol.filter(coords => coords.c < kingCoords.c) :
            defendersOnSameSearchRowOrSearchCol.filter(coords => coords.r < kingCoords.r);
        const defendersAfterKing = searchOnRow ?
            defendersOnSameSearchRowOrSearchCol.filter(coords => coords.c > kingCoords.c) :
            defendersOnSameSearchRowOrSearchCol.filter(coords => coords.r > kingCoords.r);
        // look for connected paths through before-after pieces
        const startEnds = [];
        for (const defenderBeforeKing of defendersBeforeKing) {
            const defendersConnectedToThisDefender = this.connectedDefenders(state, defenderBeforeKing);
            for (const defenderAfterKing of defendersAfterKing) {
                const index = [...defendersConnectedToThisDefender].findIndex(el => el === this.repr(defenderAfterKing));
                if (index !== -1) {
                    startEnds.push([defenderBeforeKing, defenderAfterKing]);
                }
            }
        }
        if (startEnds.length < 1) {
            return false;
        }
        // for start/end pair of possible fort, get full structure
        const fullStructuresWithPossibleDuplicates = [];
        for (const startEnd of startEnds) {
            const startingDefender = startEnd[0];
            fullStructuresWithPossibleDuplicates.push(this.connectedDefenders(state, startingDefender));
        }
        // deduplication
        const fullStructures = [...new Set(fullStructuresWithPossibleDuplicates
                .map(fullStructure => [...fullStructure].sort().map(this.coords))
                .map(x => this.toPathRepr(...x)))]
            .map(x => this.toPathCoords(x))
            .map(x => x.map(y => this.repr(y)))
            .map(x => new Set(x));
        // for full structure, find the pieces that can be taken and replace them with _
        // and check if remaining structure is still connected
        let isAFort = true;
        for (const fullStructure of fullStructures) {
            const [innerSet, attackerSet] = this.getEmptyPiecesAndAttackersInsideSmallestFort(state, kingCoords, fullStructure);
            // eliminate structures that contain any attacker
            if (attackerSet.size > 0) {
                return false;
            }
            const possibleSmallestFortStructure = this.getPossibleSmallestFortStructure(state, innerSet, fullStructure);
            const weakCoordsInPossibleFort = new Set();
            for (const repr of possibleSmallestFortStructure) {
                const possibleFortCoords = this.coords(repr);
                const neighborsInOppositeDirections = [
                    [{ r: -1, c: 0 }, { r: 1, c: 0 }],
                    [{ r: 0, c: -1 }, { r: 0, c: 1 }]
                ];
                for (const oppositeNeighbors of neighborsInOppositeDirections) {
                    let oppositeSum = 0;
                    for (const neighbor of oppositeNeighbors) {
                        const neighborCoords = { r: possibleFortCoords.r + neighbor.r, c: possibleFortCoords.c + neighbor.c };
                        const insideBounds = this.insideBounds(state, neighborCoords);
                        if (insideBounds) {
                            const neighborRepr = this.repr(neighborCoords);
                            // increase opposite sum if NOT
                            // - is a defender or king OR
                            // - is inside the fort OR
                            // - is inside an eye
                            if (!(this.isDfOrKing(state, neighborCoords) ||
                                innerSet.has(neighborRepr) ||
                                this.isInsideEye(state, neighborCoords, fullStructure))) {
                                oppositeSum += 1;
                            }
                            if (oppositeSum > 1) {
                                weakCoordsInPossibleFort.add(repr);
                            }
                        }
                    }
                }
            }
            if (weakCoordsInPossibleFort.size > 0) {
                const boardCopy = state.board.map(function (arr) {
                    return arr.slice;
                });
                [...weakCoordsInPossibleFort].forEach(weakRepr => {
                    const weakCoords = this.coords(weakRepr);
                    boardCopy[weakCoords.r][weakCoords.c] = Piece.__;
                });
                const stateCopy = { board: boardCopy };
                isAFort = isAFort && this.fortSearchFromKing(stateCopy, kingCoords);
            }
        }
        // if any structure makes it this far, it must be a fort
        return isAFort;
    }
    getPossibleActions(state, side = this.turnSide(state)) {
        const res = [];
        for (const _r in state.board) {
            const r = parseInt(_r, 10);
            const row = state.board[r];
            for (const _c in row) {
                const c = parseInt(_c, 10);
                const piece = row[c];
                if (this.canControl(side, piece)) {
                    const coords = { r, c };
                    const movesFrom = this.getPossibleMovesFrom(state, coords);
                    movesFrom.forEach(toCoords => {
                        const moveAction = {
                            from: coords,
                            to: toCoords
                        };
                        res.push(moveAction);
                    });
                }
            }
        }
        return res;
    }
    isActionPossible(state, act) {
        if (act.from.r !== act.to.r && act.from.c !== act.to.c) {
            throw new Error("Move should be in the same row or column");
        }
        const f = act.from;
        const from = this.pieceAt(state, f);
        if (this.isEmpty(state, f)) {
            throw new Error(`There is no piece at [${f.r}, ${f.c}]`);
        }
        const side = this.turnSide(state);
        if (!this.canControl(side, from)) {
            throw new Error(`You can not control the piece at [${f.r}, ${f.c}]`);
        }
        const t = act.to;
        if (!this.isEmpty(state, t)) {
            throw new Error(`There is already a piece at [${t.r}, ${t.c}]`);
        }
        const possibleCoords = this.getPossibleMovesFrom(state, f);
        const isPossible = possibleCoords.find(pc => pc.r === t.r && pc.c === t.c);
        if (isPossible) {
            return true;
        }
        throw new Error(`Move [${f.r}, ${f.c}] -> [${t.r}, ${t.c}] is not possible`);
    }
    isGameOver(state) {
        var _a, _b, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const to = (_a = state.lastAction) === null || _a === void 0 ? void 0 : _a.to;
        if (!to) {
            return Object.assign({}, state, {
                result: Object.assign(Object.assign({}, state.result), { finished: false })
            });
        }
        const side = this.turnSide(state);
        if (side === TaflSide.ATTACKER) { // King should be captured
            const n = state.board.length;
            let [kingOnTop, kingOnRight, kingOnBottom, kingOnLeft] = [false, false, false, false];
            kingOnTop = ((_b = to) === null || _b === void 0 ? void 0 : _b.r) > 1 && this.isKing(state, { r: to.r - 1, c: to.c });
            kingOnBottom = ((_d = to) === null || _d === void 0 ? void 0 : _d.r) < n - 2 && this.isKing(state, { r: to.r + 1, c: to.c });
            kingOnLeft = ((_e = to) === null || _e === void 0 ? void 0 : _e.c) > 1 && this.isKing(state, { r: to.r, c: to.c - 1 });
            kingOnRight = ((_f = to) === null || _f === void 0 ? void 0 : _f.c) < n - 2 && this.isKing(state, { r: to.r, c: to.c + 1 });
            let kingPosition = null;
            if (kingOnTop) {
                kingPosition = { r: to.r - 1, c: to.c };
            }
            else if (kingOnBottom) {
                kingPosition = { r: to.r + 1, c: to.c };
            }
            else if (kingOnRight) {
                kingPosition = { r: to.r, c: to.c + 1 };
            }
            else if (kingOnLeft) {
                kingPosition = { r: to.r, c: to.c - 1 };
            }
            if (((_g = kingPosition) === null || _g === void 0 ? void 0 : _g.r) > 0 && ((_h = kingPosition) === null || _h === void 0 ? void 0 : _h.r) < n - 1 && ((_j = kingPosition) === null || _j === void 0 ? void 0 : _j.c) > 0 && ((_k = kingPosition) === null || _k === void 0 ? void 0 : _k.c) < n - 1) {
                const [kr, kc] = [(_l = kingPosition) === null || _l === void 0 ? void 0 : _l.r, (_m = kingPosition) === null || _m === void 0 ? void 0 : _m.c];
                const tSurrounded = this.canHelpCapture(state, { r: kr - 1, c: kc }, side) ? 1 : 0;
                const bSurrounded = this.canHelpCapture(state, { r: kr + 1, c: kc }, side) ? 1 : 0;
                const lSurrounded = this.canHelpCapture(state, { r: kr, c: kc - 1 }, side) ? 1 : 0;
                const rSurrounded = this.canHelpCapture(state, { r: kr, c: kc + 1 }, side) ? 1 : 0;
                if (state.rules[TaflRule.ATTACKER_COUNT_TO_CAPTURE] >= 3) {
                    const sum = tSurrounded + bSurrounded + lSurrounded + rSurrounded;
                    if (sum >= state.rules[TaflRule.ATTACKER_COUNT_TO_CAPTURE]) {
                        return Object.assign({}, state, { result: {
                                finished: true,
                                winner: TaflSide.ATTACKER,
                                desc: 'Attackers captured the king'
                            }
                        });
                    }
                }
                if (state.rules[TaflRule.ATTACKER_COUNT_TO_CAPTURE] === 2) {
                    if ((tSurrounded + bSurrounded === 2) || (lSurrounded + rSurrounded === 2)) {
                        return Object.assign({}, state, { result: {
                                finished: true,
                                winner: TaflSide.ATTACKER,
                                desc: 'Attackers captured the king'
                            }
                        });
                    }
                }
            }
        }
        else { // King should be on edge, corner, or in an exit fort
            const edgeEscape = state.rules[TaflRule.EDGE_ESCAPE] && this.isKing(state, to) && this.isEdge(state, to);
            if (edgeEscape) {
                return Object.assign({}, state, {
                    result: {
                        finished: true,
                        winner: TaflSide.DEFENDER,
                        desc: 'King escaped from edge'
                    }
                });
            }
            const cornerEscape = this.isKing(state, to) && this.isCorner(state, to);
            if (cornerEscape) {
                return Object.assign({}, state, {
                    result: {
                        finished: true,
                        winner: TaflSide.DEFENDER,
                        desc: 'King escaped from corner'
                    }
                });
            }
            const fortEscape = state.rules[TaflRule.EXIT_FORTS] && this.kingEscapedThroughFort(state);
            if (fortEscape) {
                return Object.assign({}, state, {
                    result: {
                        finished: true,
                        winner: TaflSide.DEFENDER,
                        desc: 'King escaped through exit fort'
                    }
                });
            }
        }
        // if (state.turn > 50) {
        //   return Object.assign({}, state, {
        //     result: {
        //       finished: true,
        //       winner: this.turnSide(state),
        //       desc: 'Enough is enough'
        //     }
        //   })
        // }
        const canOpponentMove = this.canMakeAMove(state, this.opponentSide(state));
        return Object.assign({}, state, { result: {
                finished: !canOpponentMove,
                winner: !canOpponentMove ? this.turnSide(state) : null,
                desc: ''
            }
        });
    }
    canBeCaptured(state, coords, side) {
        const mid = this.sideOfPiece(this.pieceAt(state, coords));
        return ((side === TaflSide.ATTACKER && mid === TaflSide.DEFENDER && !this.isKing(state, coords)) || (side === TaflSide.DEFENDER && mid === TaflSide.ATTACKER));
    }
    checkCaptures(state) {
        let res = [];
        const [lpr, lpc] = [state.lastAction.to.r, state.lastAction.to.c];
        const side = this.turnSide(state);
        if (lpr >= 2 && this.canHelpCapture(state, { r: lpr - 2, c: lpc }, side) && this.canBeCaptured(state, { r: lpr - 1, c: lpc }, side)) {
            res.push({ r: lpr - 1, c: lpc });
        }
        if (lpr <= state.board.length - 3 && this.canHelpCapture(state, { r: lpr + 2, c: lpc }, side) && this.canBeCaptured(state, { r: lpr + 1, c: lpc }, side)) {
            res.push({ r: lpr + 1, c: lpc });
        }
        if (lpc >= 2 && this.canHelpCapture(state, { r: lpr, c: lpc - 2 }, side) && this.canBeCaptured(state, { r: lpr, c: lpc - 1 }, side)) {
            res.push({ r: lpr, c: lpc - 1 });
        }
        if (lpc <= state.board.length - 3 && this.canHelpCapture(state, { r: lpr, c: lpc + 2 }, side) && this.canBeCaptured(state, { r: lpr, c: lpc + 1 }, side)) {
            res.push({ r: lpr, c: lpc + 1 });
        }
        if (state.rules[TaflRule.SHIELD_WALLS]) {
            res.push(...this.checkShieldWalls(state));
        }
        return res;
    }
    checkShieldWalls(state) {
        const res = [];
        const side = this.turnSide(state);
        const [lpr, lpc] = [state.lastAction.to.r, state.lastAction.to.c];
        const opp = this.opponentSide(state);
        // check top or bottom
        if (lpr === 0 || lpr === state.board.length - 1) {
            const [lCaptured, rCaptured] = [[], []];
            let theCol = lpc - 1;
            const rowBehind = (lpr === state.board.length - 1) ? state.board.length - 2 : 1;
            while (this.insideBounds(state, { r: lpr, c: theCol })
                && this.sideOfPiece(this.pieceAt(state, { r: lpr, c: theCol })) === opp
                && this.insideBounds(state, { r: rowBehind, c: theCol })
                && this.canHelpCapture(state, { r: rowBehind, c: theCol }, side)) {
                if (this.sideOfPiece(this.pieceAt(state, { r: lpr, c: theCol })) === opp && !this.isKing(state, { r: lpr, c: theCol })) {
                    lCaptured.push({ r: lpr, c: theCol });
                }
                theCol -= 1;
            }
            if (this.insideBounds(state, { r: lpr, c: theCol }) && this.canHelpCapture(state, { r: lpr, c: theCol }, side)) {
                res.push(...lCaptured);
            }
            theCol = lpc + 1;
            while (this.insideBounds(state, { r: lpr, c: theCol })
                && this.sideOfPiece(this.pieceAt(state, { r: lpr, c: theCol })) === opp
                && this.insideBounds(state, { r: rowBehind, c: theCol })
                && this.canHelpCapture(state, { r: rowBehind, c: theCol }, side)) {
                if (this.sideOfPiece(this.pieceAt(state, { r: lpr, c: theCol })) === opp && !this.isKing(state, { r: lpr, c: theCol })) {
                    rCaptured.push({ r: lpr, c: theCol });
                }
                theCol += 1;
            }
            if (this.insideBounds(state, { r: lpr, c: theCol }) && this.canHelpCapture(state, { r: lpr, c: theCol }, side)) {
                res.push(...rCaptured);
            }
        }
        // check left or right
        if (lpc === 0 || lpc === state.board.length - 1) {
            const [bCaptured, tCaptured] = [[], []];
            let theRow = lpr - 1;
            const colBehind = (lpc === state.board.length - 1) ? state.board.length - 2 : 1;
            while (this.insideBounds(state, { r: theRow, c: lpc })
                && this.sideOfPiece(this.pieceAt(state, { r: theRow, c: lpc })) === opp
                && this.insideBounds(state, { r: theRow, c: colBehind })
                && this.canHelpCapture(state, { r: theRow, c: colBehind }, side)) {
                if (this.sideOfPiece(this.pieceAt(state, { r: theRow, c: lpc })) === opp && !this.isKing(state, { r: theRow, c: lpc })) {
                    bCaptured.push({ r: theRow, c: lpc });
                }
                theRow -= 1;
            }
            if (this.insideBounds(state, { r: theRow, c: lpc }) && this.canHelpCapture(state, { r: theRow, c: lpc }, side)) {
                res.push(...bCaptured);
            }
            theRow = lpr + 1;
            while (this.insideBounds(state, { r: theRow, c: lpc })
                && this.sideOfPiece(this.pieceAt(state, { r: theRow, c: lpc })) === opp
                && this.insideBounds(state, { r: theRow, c: colBehind })
                && this.canHelpCapture(state, { r: theRow, c: colBehind }, side)) {
                if (this.sideOfPiece(this.pieceAt(state, { r: theRow, c: lpc })) === opp && !this.isKing(state, { r: theRow, c: lpc })) {
                    tCaptured.push({ r: theRow, c: lpc });
                }
                theRow += 1;
            }
            if (this.insideBounds(state, { r: theRow, c: lpc }) && this.canHelpCapture(state, { r: theRow, c: lpc }, side)) {
                res.push(...tCaptured);
            }
        }
        return res;
    }
    act(state, moveAction) {
        if (!this.isActionPossible(state, moveAction)) {
            return state;
        }
        const boardCopy = state.board.map(function (arr) {
            return arr.slice();
        });
        const fr = moveAction.from.r;
        const fc = moveAction.from.c;
        boardCopy[moveAction.to.r][moveAction.to.c] = this.pieceAt(state, moveAction.from);
        boardCopy[fr][fc] = Piece.__;
        const playerMovedState = Object.assign({}, state, { lastAction: moveAction }, { board: boardCopy });
        const captureds = this.checkCaptures(playerMovedState);
        if (captureds.length > 0) {
            for (const capturedCoords of captureds) {
                boardCopy[capturedCoords.r][capturedCoords.c] = Piece.__;
            }
        }
        const capturedPiecesState = Object.assign({}, playerMovedState, { board: boardCopy });
        const gameOverState = this.isGameOver(capturedPiecesState);
        return Object.assign({}, gameOverState, { turn: state.turn + 1 });
    }
}
exports.Tafl = Tafl;
//# sourceMappingURL=index.js.map