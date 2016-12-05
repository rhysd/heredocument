const heredoc = require('..');
const equal = require('assert').equal;

describe('interpolation in heredoc``', function () {
    it('embeds values to the string', function () {
        equal(heredoc`
            ${12 + 30}
        `, '42');
        equal(heredoc`
            Values:
                ${true}
                ${42}
                ${'a'}
        `, 'Values:\n    true\n    42\n    a');
        equal(heredoc`
             ${42}
            aaa
        `, ' 42\naaa');
        equal(heredoc`
            aaa
             ${true}
        `, 'aaa\n true');
    });

    it('considers embedded whitespaces', function () {
        equal(heredoc`
          ${'    '}bbb
            aaa
        `, '  bbb\naaa');
        equal(heredoc`
            a
${'           b'}
             c
        `, ' a\nb\n  c');
        equal(heredoc`
            a
${''}
             b
        `, 'a\n\n b');
    });

    it('considers newlines in interpolation', function () {
        equal(heredoc`
            aaa
        ${'   bbb\n           ccc'}
            ddd
        `, ' aaa\nbbb\nccc\n ddd');
        equal(heredoc`${' a\n  b\n c'}`, 'a\n b\nc');
    });
});
