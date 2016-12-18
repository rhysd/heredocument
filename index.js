const RE_EMPTY_LINE = /^\s*$/;
const DEFAULT_OPTIONS = {
    tabSize: 8,
    inputNewline: '\n',
    newlineAtEnd: true
};

function getTrimmedLines(strings, args, opts) {
    const input = [];
    for (let i = 0; i < strings.length; ++i) {
        input.push(strings[i]);
        if (args.length > i) {
            input.push(args[i]);
        }
    }

    const lines = input.join('').split(opts.inputNewline);

    // Note: Trim first newline just after first '`'
    if (lines.length > 0 && lines[0].length === 0) {
        // Newline just after first ` it should be split to ''
        lines.shift();
    }

    const lastIndex = lines.length - 1;
    if (lines.length > 0 && RE_EMPTY_LINE.test(lines[lastIndex])) {
        if (opts.newlineAtEnd) {
            lines[lastIndex] = '';
        } else {
            // When EOL at the end of string should not be added,
            // it means that simply remove the empty line at the end
            // of string.
            lines.pop();
        }
    }

    return lines;
}

function indentOf(line, opts) {
    let count = 0;
    for (let i = 0; i < line.length; ++i) {
        const c = line[i];
        if (c === ' ') {
            count += 1;
        } else if (c === '\t') {
            count += opts.tabSize;
        } else {
            break;
        }
    }
    return count;
}

function commonIndentFromLines(lines, opts) {
    let pad = -1;
    for (const l of lines) {
        if (l.length === 0) {
            continue;
        }
        if (pad < 0) {
            pad = indentOf(l, opts);
            continue;
        }
        pad = Math.min(pad, indentOf(l, opts));
    }

    // pad < 0 means there are empty lines only
    return pad >= 0 ? pad : 0;
}

function trimCommonIndent(pad, line, opts) {
    let idx = 0;
    while (pad > 0) {
        if (line[idx] === ' ') {
            pad -= 1;
        } else if (line[idx] === '\t') {
            pad -= opts.tabSize;
        } else {
            throw Error(`FATAL: Char is not whitespace: '${line[idx]}' at ${idx} in '${line}' (pad: ${pad})`);
        }
        ++idx;
    }

    if (pad === 0) {
        return line.slice(idx);
    }

    return ' '.repeat(-pad) + line.slice(idx);
}

function heredoc(strings, ...args) {
    if (!Array.isArray(strings)) {
        // When setting up options
        // e.g.
        //   const heredoc = require('heredocument')({
        //      tabSize: 4
        //   });
        return heredoc.bind(Object.assign({}, DEFAULT_OPTIONS, strings));
    }

    const lines = getTrimmedLines(strings, args, this);
    if (lines.length === 0) {
        return '';
    }

    const newline = this.outputNewline !== undefined ? this.outputNewline : this.inputNewline;
    const pad = commonIndentFromLines(lines, this);
    if (pad <= 0) {
        return lines.join(newline);
    }

    for (let i = 0; i < lines.length; ++i) {
        const l = lines[i];
        if (l.length === 0) {
            continue;
        }

        lines[i] = trimCommonIndent(pad, l, this);
    }

    return lines.join(newline);
}

const exported = heredoc.bind(DEFAULT_OPTIONS);
exported.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
exported.commonIndentFromLines = commonIndentFromLines;

if (typeof module !== 'undefined') {
    exported.default = exported;
    module.exports = exported;
}
if (typeof window !== 'undefined') {
    window.Heredoc = exported;
}
