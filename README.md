Here Document Using ES2015 Template String
==========================================
[![Build Status](https://travis-ci.org/rhysd/heredocument.svg?branch=master)](https://travis-ci.org/rhysd/heredocument)
[![Coverage Status](https://coveralls.io/repos/github/rhysd/heredocument/badge.svg?branch=master)](https://coveralls.io/github/rhysd/heredocument?branch=master)

This package provides heredoc as tag of [ES2015 Template String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).
It trims white spaces in the template string and strips common indentation like `<<~` in Ruby.
This package has no dependency.

```javascript
const heredoc = require('heredocument');

function showError(err) {
    const msg = heredoc`
        Error: ${err.message}

          Expected: ${err.expected}
          Actual  : ${err.actual}
    `;

    assert.equal(msg, 'Error: blah blah\n\n  Expected: foo\n  Actual  : bar\n');

    console.log(msg);
}
```

Without this package, we need to care about indentation of the string.

```javascript
    const msg = `Error: ${err.message}

  Expected: ${err.expected}
  Actual  : ${err.actual}
`;
```

## Installation

Available via [npm](https://www.npmjs.com).

```
$ npm install heredocument
```

- commonjs

```javascript
const heredoc = require('heredocument');
```

- ES6 Modules

```javascript
import heredoc from 'heredocument';
```

- Browser

```html
<script src="/path/to/heredocument/index.js"></script>
<script>
  const heredoc = window.Heredoc;
</script>
```

## Usage

By default, a heredoc tag for template strings is exported. Almost all cases, you can use it out of box.

```javascript
const heredoc = require('heredocument');
console.log(`
    foo
        bar
        piyo
`);
```

This package cares about tab (`\t`) character. By default, tab character is handled as 8 whitespaces.
If the indentation is split at the middle of tab character, it will be split into white spaces.

```javascript
const heredoc = require('heredocument');
assert.equal(heredoc`\tfoo\t  bar\t\tpiyo`, 'foo\n  bar      \npiyo');
```

And default newline is NL (`\n`).

These behaviors can be customized. There are two options; `tabSize`, `inputNewline` and `outputNewline`.

```javascript
const heredoc = require('heredocument')({
    tabSize: 4,
    inputNewline: '\n\r',
    outputNewline: '\n\r',
});

assert.equal(
    heredoc`
    FOO
        BAR
		BAZ
    `,
    'FOO\n    BAR\n\tBAZ\n'
);
// => OK
```

- **tabSize** : The number of whitespaces for 1 tab character (`\t`). Default is `8`.
- **inputNewline** : The newline character to split the string into lines. Default value is `\n`.
- **outputNewline** : The newline character used in output string. If not specified, value of `inputNewline` is used. Default value is `\n`.
- **newlineAtEnd** : EOL should be added at the end of string or not. If `true`, newline will be added at the end. Default value is `true`.

For example, below `oneline` tag replaces all newlines in input hence it can create single line string from multiline template string.

```javascript
const heredoc = require('heredocument');
const oneline = heredoc({
    inputNewline: '\n',
    outputNewline: ' ',
    newlineAtEnd: false
});

const msg = oneline`
    This message is too long. So we need to split the string literal such as
    "blah blah" + "blah blah". But with this 'oneline' tag, all newlines
    (including intepolated string) are removed and you can get oneline
    string.
`;

assert.equal(msg, `This message is too long. So we need to split the string literal such as "blah blah" + "blah blah". But with this 'oneline' tag, all newlines (including intepolated string) are removed and you can get oneline string.`);
// => OK
```

## Development

```sh
$ git clone https://github.com/rhysd/heredocument.git && cd ./heredocument
$ npm install  # Install all dependencies
$ npm run lint # Run linter
$ npm test     # Run tests with mocha
```

## License

Distributed under [the MIT license](LICENSE).

