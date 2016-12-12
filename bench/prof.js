const heredoc = require('..');
let b = false;
for (let i = 0; i < 1000000; ++i) {
    heredoc`
        The answer is ${i}.
        It's ${b = !b}.

            Note: This is test for benchmark.
    `
}
