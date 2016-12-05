const heredoc = require('..');
const equal = require('assert').equal;

describe('heredoc``', function () {
    it('removes common indentation', function () {
        equal(heredoc` aa`, 'aa');
        equal(heredoc` aa\n  bb\n cc`, 'aa\n bb\ncc');
        equal(heredoc`  aa\n bb\n cc`, ' aa\nbb\ncc');
        equal(heredoc` aa\n bb\n  cc`, 'aa\nbb\n cc');

        // When including whitespaces only line
        equal(heredoc` a\n  \n c`, 'a\n \nc');
        equal(heredoc`  a\n \n  c`, ' a\n\n c');
    });

    it('ignores empty lines', function () {
        equal(heredoc` aa\n  bb\n\n cc`, 'aa\n bb\n\ncc');
        equal(heredoc`aa\n\nbb\n\ncc`, 'aa\n\nbb\n\ncc');
    });
});

