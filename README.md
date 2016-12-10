Here Document Using ES2015 Template String
==========================================

This package provides heredoc as tag of [ES2015 Template String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).
It trims white spaces in the template string and strips common indentation like `<<~` in Ruby.

```javascript
const heredoc = require('heredocument');

function showError(err) {
    const msg = heredoc`
        ${err.message}

          Expected: ${err.expected}
          Actual  : ${err.actual}
    `;

    assert.equal(msg, 'Error on blah blah\n\n  Expected: foo\n  Actual  : bar');

    console.log(msg);
}
```

Without this package, we need to care about indentation of the string.

```javascript
    const msg = `${err.message}

  Expected: ${err.expected}
  Actual  : ${err.actual}`;
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

For another situation, `oneline` tag is also exported as a member of package.

```javascript
const {oneline} = require('heredocument');

const msg = oneline`
    This message is too long. So we need to split the string literal such as
    "blah blah" + "blah blah". But with this 'oneline' tag, all newlines
    (including intepolated string) are removed and you can get oneline
    string.
`;

assert.equal(msg, `This message is too long. So we need to split the string literal such as "blah blah" + "blah blah". But with this 'oneline' tag, all newlines (including intepolated string) are removed and you can get oneline string.`);
// => OK
```

This package cares about tab (`\t`) character. By default, tab character is handled as 8 whitespaces.
If the indentation is split at the middle of tab character, it will be split into white spaces.

```javascript
const heredoc = require('heredocument');
assert.equal(heredoc`\tfoo\t  bar\t\tpiyo`, 'foo\n  bar      \npiyo');
```

And default newline is NL (`\n`).

These behaviors can be customized. There are three options; `tabSize`, `newline` and `oneline`.

```javascript
const heredoc = require('heredocument')({
    tabSize: 4,
    newline: '\n\r',
    oneline: true
});

assert.equal(
    heredoc`
    FOO
        BAR
		BAZ
    `,
    'FOO\n    BAR\n\tBAZ'
);
// => OK
```

- **tabSize** : The number of whitespaces for 1 tab character (`\t`). Default is `8`.
- **newline** : The newline character to split the string into lines. This package will maintain the newline before/after of trimming. Default value is `\n`.
- **oneline** : If this value is `true`, the string will be concat with `' '` and lose all newlines in the string. The default value is `false`.

## Development

```sh
$ git clone https://github.com/rhysd/heredocument.git && cd ./heredocument
$ npm install  # Install all dependencies
$ npm run lint # Run linter
$ npm test     # Run tests with mocha
```

## License

Distributed under [the MIT license](LICENSE).

