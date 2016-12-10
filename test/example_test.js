const equal = require('assert').equal;
const heredoc = require('..');

describe('heredoc`...`', function () {
    it('formats tagged template string literal', function () {
        const i = 42;

        const s = heredoc`
            This is test for heredoc
                Answer is...

                ${i}

            end.
        `;

        const expected =
`This is test for heredoc
    Answer is...

    42

end.`;

        equal(s, expected);

        const java = heredoc`
             あなたとジャバ
            今すぐダウンロー
                   ド
        `;

        const expected_java =
` あなたとジャバ
今すぐダウンロー
       ド`;

        equal(java, expected_java);
    });
});
