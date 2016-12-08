const equal = require('assert').equal;
const createHeredoc = require('..');

describe('heredoc(options)', function () {
    describe('options.tabSize', function () {
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

    describe('options.newline', function () {
        it('changes and maintains the specified newline (e.g. \\n\\r)', function () {
            const heredoc = createHeredoc({newline: '\n\r'});

            equal(heredoc`  foo\n\r bar\n\r piyo`, ' foo\n\rbar\n\rpiyo');
            equal(heredoc`  foo\n\r\n\r bar\n\r piyo`, ' foo\n\r\n\rbar\n\rpiyo');
        });
    });
});
