const oneline = require('..').oneline;
const equal = require('assert').equal;

describe('oneline`...`', function () {
    it('trims first new line', function () {
        equal(oneline`
            foo!`, 'foo!');
        equal(oneline`
            foo!
             bar`, 'foo!  bar');
    });

    it('trims last empty line', function () {
        equal(oneline`foo!
            `, 'foo!');
        equal(oneline`              foo!
             bar
        `, ' foo! bar');
    });

    it('removes common indentation and newlines', function () {
        equal(oneline`
            foo
            bar
            baz
        `, 'foo bar baz');
        equal(oneline`
            aa
             bb
            cc
        `, 'aa  bb cc');

        equal(oneline`
              aa
             bb
             cc
        `, ' aa bb cc');

        equal(oneline`
            aa
            bb
             cc
        `, 'aa bb  cc');

        equal(oneline`
no
indent
is removed
        `, 'no indent is removed');

        // Note: Content is empty
        equal(oneline``, '');
        equal(oneline`
        `, '');
    });

    it('can interpolate values in strings', function () {
        equal(oneline`
            The answer is
            ${40 + 2}.
            `, 'The answer is 42.');
        equal(oneline`
            Interpolated indentation:
            ${'  aa'}.
            `, 'Interpolated indentation:   aa.');
    });

    it('can handle tab character as heredoc`...` does', function () {
        equal(oneline`
		oneline
		indented
		with
		tab
        `, 'oneline indented with tab');
    });

    it('skip adding seperator space on empty line', function () {
        equal(oneline`
            foo

            baz
        `, 'foo baz');
        equal(oneline`

            foo
            baz
        `, 'foo baz');
        equal(oneline`
            foo
            baz

        `, 'foo baz');
    });

    it('deals with tab character as 8 whitespaces', function () {
        equal(oneline`
		foo
		bar
		piyo
        `, 'foo bar piyo');
        equal(oneline`
		foo
			bar
		piyo
        `, 'foo 	bar piyo');
        equal(oneline`
		  foo
		    bar
			piyo
        `, 'foo   bar       piyo');
        equal(oneline`
	  	foo
		    bar
  		  piyo
        `, 'foo   bar   piyo');
    });
});
