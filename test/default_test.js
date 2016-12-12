const heredoc = require('..');
const equal = require('assert').equal;

describe('heredoc`...`', function () {
    it('trims first new line', function () {
        equal(heredoc`
             aaa`, 'aaa');
        equal(heredoc`
             aaa
            bbb`, ' aaa\nbbb');
    });

    it('trims last empty line', function () {
        equal(heredoc`aaa
        `, 'aaa\n');
        equal(heredoc`             aaa
            bbb
        `, ' aaa\nbbb\n');
    });

    it('removes common indentation', function () {
        equal(heredoc`aa`, 'aa');
        equal(heredoc` aa`, 'aa');

        equal(heredoc`
 aa
  bb
 cc
        `, 'aa\n bb\ncc\n');

        equal(heredoc`
  aa
 bb
 cc
        `, ' aa\nbb\ncc\n');

        equal(heredoc`
 aa
 bb
  cc
        `, 'aa\nbb\n cc\n');

        equal(heredoc`
aa
bb
cc
        `, 'aa\nbb\ncc\n');

        // When including whitespaces only line
        equal(heredoc`
 a
  
 c
        `, 'a\n \nc\n');

        equal(heredoc`
  a
 
  c
        `, ' a\n\n c\n');
    });

    it('ignores empty lines', function () {
        equal(heredoc`
            aa
             bb

            cc
        `, 'aa\n bb\n\ncc\n');

        equal(heredoc`
aa

bb

cc
        `, 'aa\n\nbb\n\ncc\n');

        equal(heredoc`

            aa
            bb
        `, '\naa\nbb\n');

        equal(heredoc`
            aa

            bb
        `, 'aa\n\nbb\n');

        equal(heredoc`
            aa
            bb

        `, 'aa\nbb\n\n');
    });

    it('can deal with empty line', function () {
        equal(heredoc``, '');
        equal(heredoc`
        `, '');
        equal(heredoc`

        `, '\n');
        equal(heredoc`



        `, '\n\n\n');
    });

    it('deals with tab character as 8 whitespaces', function () {
        equal(heredoc`
		foo
		bar
		piyo
        `, 'foo\nbar\npiyo\n');
        equal(heredoc`
		foo
			bar
		piyo
        `, 'foo\n	bar\npiyo\n');
        equal(heredoc`
			foo
			bar
		piyo
        `, '	foo\n	bar\npiyo\n');
        equal(heredoc`
		 foo
                bar
		piyo
        `, ' foo\nbar\npiyo\n');
        equal(heredoc`
		  foo
		    bar
			piyo
        `, 'foo\n  bar\n      piyo\n');
        equal(heredoc`
			foo
		    bar
		  piyo
        `, '      foo\n  bar\npiyo\n');
        equal(heredoc`
	  	foo
		    bar
  		  piyo
        `, 'foo\n  bar\n  piyo\n');
    });
});

