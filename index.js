const RE_EMPTY_LINE = /^\s*$/;
const DEFAULT_OPTIONS = {
    tabSize: 8,
    inputNewline: '\n'
};

function getTrimmedLines(strings, args, opts) {
    const input = [];
    strings.forEach((s, i) => {
        input.push(s);
        if (args.length > i) {
            input.push(args[i]);
        }
    });

    const lines = input.join('').split(opts.inputNewline);

    // Note: Trim first newline just after first '`'
    if (lines.length > 0 && lines[0].length === 0) {
        // Newline just after first ` it should be split to ''
        lines.shift();
    }

    const lastIndex = lines.length - 1;
    if (lines.length > 0 && RE_EMPTY_LINE.test(lines[lastIndex])) {
        lines[lastIndex] = '';
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
    lines.forEach(l => {
        if (l.length === 0) {
            return; // continue
        }
        if (pad < 0) {
            pad = indentOf(l, opts);
            return;
        }
        pad = Math.min(pad, indentOf(l, opts));
    });

    // pad < 0 means there are empty lines only
    return pad >= 0 ? pad : 0;
}

function charsToSlice(line, pad, opts) {
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
        return [idx];
    } else {
        // When the indent is broken in tab character, the tab character should be split into spaces
        return [idx, -pad];
    }
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
        const counts = charsToSlice(l, pad, this);
        let line = l.slice(counts[0]);
        if (counts[1] !== undefined) {
            line = ' '.repeat(counts[1]) + line;
        }
        lines[i] = line;
    }

    return lines.join(newline);
}

const exported = heredoc.bind(DEFAULT_OPTIONS);
exported.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
exported.commonIndentFromLines = commonIndentFromLines;

if (typeof module !== 'undefined') {
    exported.default = exported;
    module.exports = exported;
} else if (typeof window !== 'undefined') {
    window.heredoc = exported;
}
