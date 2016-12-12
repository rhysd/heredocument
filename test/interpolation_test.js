const heredoc = require('..');
const equal = require('assert').equal;

describe('interpolation in heredoc``', function () {
    it('embeds values to the string', function () {
        equal(heredoc`
            ${12 + 30}
        `, '42\n');
        equal(heredoc`
            Values:
                ${true}
                ${42}
                ${'a'}
        `, 'Values:\n    true\n    42\n    a\n');
        equal(heredoc`
             ${42}
            aaa
        `, ' 42\naaa\n');
        equal(heredoc`
            aaa
             ${true}
        `, 'aaa\n true\n');
    });

    it('considers embedded whitespaces', function () {
        equal(heredoc`
          ${'    '}bbb
            aaa
        `, '  bbb\naaa\n');
        equal(heredoc`
            a
${'           b'}
             c
        `, ' a\nb\n  c\n');
        equal(heredoc`
            a
${''}
             b
        `, 'a\n\n b\n');
    });

    it('considers newlines in interpolation', function () {
        equal(heredoc`
            aaa
        ${'   bbb\n           ccc'}
            ddd
        `, ' aaa\nbbb\nccc\n ddd\n');
        equal(heredoc`${' a\n  b\n c'}`, 'a\n b\nc');
    });
});
