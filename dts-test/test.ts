import heredoc from '..';

console.log(heredoc`
     あなたと JAVA
    今すぐダウンロー
           ド
`);

const oneline = heredoc({
    outputNewline: ' ',
    newlineAtEnd: false,
});

console.log(oneline`
    foo
    bar
    piyo
`);
