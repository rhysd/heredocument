const heredoc = require('..');
for (let i = 0; i < 10000; ++i) {
    heredoc`
        The answer is ${42}.
        It's ${true}.

            Note: This is test for benchmark.
    `
}
