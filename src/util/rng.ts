import * as gen from 'random-seed';
import * as shuffleArray from 'shuffle-array';

var rng = gen.create();

export function mockRng() {
    rng = gen.create('testseed');
}

export function unmockRng() {
    rng = gen.create();
}

export function random() {
    return rng.random();
}

export function shuffle<T>(input: T[]) {
    shuffleArray(input, {
        rng: rng.random
    });
}
