const equal = require('assert').equal;
const createHeredoc = require('..');

describe('heredoc(options)', function () {
    it('can change tab size', function () {
        const heredoc = createHeredoc({tabSize: 4});

        // Note:
        // Tab size is now 4 and indent of 'foo' is 8.
        // So indent of 'foo' will be 4 after heredoc tag.
        equal(heredoc`
        foo
	bar
        `, '    foo\nbar');
    });
});
