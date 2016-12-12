const Benchmark = require('benchmark');
const heredoc = require('..');

const suite = new Benchmark.Suite();

let i = 0;
let j = 0;
let b = false

suite.add('heredoc``', () => {
    heredoc`
        The answer is ${++i}.
        It's ${b = !b}.

            Note: This is test for benchmark.
    `
}).add('plain template string', () => {
    `
        The answer is ${++j}.
        It's ${b = !b}.

            Note: This is test for benchmark.
    `
}).on('cycle', event => {
    console.log(String(event.target));
}).on('complete', function () {
    console.log(`heredoc is ${this[1].hz / this[0].hz} times slower than plain string`);
}).run();
