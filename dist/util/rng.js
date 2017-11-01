"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gen = require("random-seed");
const shuffleArray = require("shuffle-array");
var rng = gen.create();
function mockRng() {
    rng = gen.create('testseed');
}
exports.mockRng = mockRng;
function unmockRng() {
    rng = gen.create();
}
exports.unmockRng = unmockRng;
function random() {
    return rng.random();
}
exports.random = random;
function shuffle(input) {
    shuffleArray(input, {
        rng: rng.random
    });
}
exports.shuffle = shuffle;
//# sourceMappingURL=rng.js.map