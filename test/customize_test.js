const equal = require('assert').equal;
const createHeredoc = require('..');

describe('heredoc(options)', function () {
    it('can change tab size', function () {
        const heredoc = createHeredoc({tabSize: 4});

        // Note:
        // Tab size is now 6 and indent of 'foo' is 8.
        // So foo's indent will be 2 after heredoc tag.
        equal(heredoc`
        foo
	bar
        `, '  foo\nbar');
    });
});
