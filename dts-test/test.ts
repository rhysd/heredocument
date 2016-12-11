import heredoc from '..';

console.log(heredoc`
     あなたと JAVA
    今すぐダウンロー
           ド
`);

const oneline = heredoc({
    outputNewline: ' ',
});

console.log(oneline`
    foo
    bar
    piyo
`);
