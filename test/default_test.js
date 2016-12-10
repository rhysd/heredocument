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
        `, 'aaa');
        equal(heredoc`             aaa
            bbb
        `, ' aaa\nbbb');
    });

    it('removes common indentation', function () {
        equal(heredoc`aa`, 'aa');
        equal(heredoc` aa`, 'aa');

        equal(heredoc`
 aa
  bb
 cc
        `, 'aa\n bb\ncc');

        equal(heredoc`
  aa
 bb
 cc
        `, ' aa\nbb\ncc');

        equal(heredoc`
 aa
 bb
  cc
        `, 'aa\nbb\n cc');

        equal(heredoc`
aa
bb
cc
        `, 'aa\nbb\ncc');

        // When including whitespaces only line
        equal(heredoc`
 a
  
 c
        `, 'a\n \nc');

        equal(heredoc`
  a
 
  c
        `, ' a\n\n c');
    });

    it('ignores empty lines', function () {
        equal(heredoc`
            aa
             bb

            cc
        `, 'aa\n bb\n\ncc');

        equal(heredoc`
aa

bb

cc
        `, 'aa\n\nbb\n\ncc');

        equal(heredoc`

            aa
            bb
        `, '\naa\nbb');

        equal(heredoc`
            aa

            bb
        `, 'aa\n\nbb');

        equal(heredoc`
            aa
            bb

        `, 'aa\nbb\n');
    });

    it('can deal with empty line', function () {
        equal(heredoc``, '');
        equal(heredoc`
        `, '');
        equal(heredoc`

        `, '');
        equal(heredoc`



        `, '\n\n');
    });

    it('deals with tab character as 8 whitespaces', function () {
        equal(heredoc`
		foo
		bar
		piyo
        `, 'foo\nbar\npiyo');
        equal(heredoc`
		foo
			bar
		piyo
        `, 'foo\n	bar\npiyo');
        equal(heredoc`
			foo
			bar
		piyo
        `, '	foo\n	bar\npiyo');
        equal(heredoc`
		 foo
                bar
		piyo
        `, ' foo\nbar\npiyo');
        equal(heredoc`
		  foo
		    bar
			piyo
        `, 'foo\n  bar\n      piyo');
        equal(heredoc`
			foo
		    bar
		  piyo
        `, '      foo\n  bar\npiyo');
        equal(heredoc`
	  	foo
		    bar
  		  piyo
        `, 'foo\n  bar\n  piyo');
    });
});

