// XXX: Should \n\r and \r and \n always
// TODO: Customizable tab size

const RE_EMPTY_LINE = /^\s*$/;

function getTrimmedLines(strings, args) {
    const input = [];
    strings.forEach((s, i) => {
        input.push(s);
        if (args.length > i) {
            input.push(args[i]);
        }
    });

    const lines = input.join('').split('\n');

    // Note: Trim first/last lines
    if (lines.length > 0 && RE_EMPTY_LINE.test(lines[0])) {
        lines.shift();
    }
    if (lines.length > 0 && RE_EMPTY_LINE.test(lines[lines.length - 1])) {
        lines.pop();
    }

    return lines;
}

function indentOf(line) {
    let count = 0;
    for (let i = 0; i < line.length; ++i) {
        const c = line[i];
        if (c === ' ') {
            count += 1;
        } else if (c === '\t') {
            count += 8;
        } else {
            break;
        }
    }
    return count;
}

// Precondition: lines.length > 0
function getPadLength(lines) {
    let pad = indentOf(lines[0]);
    for (let i = 1; i < lines.length; ++i) {
        const l = lines[i];
        if (l.length === 0) {
            continue;
        }
        pad = Math.min(pad, indentOf(l));
    }
    return pad;
}

function charsToSlice(line, pad) {
    let idx = 0;
    while (pad > 0) {
        if (line[idx] === ' ') {
            pad -= 1;
        } else if (line[idx] === '\t') {
            pad -= 8;
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
    const lines = getTrimmedLines(strings, args);
    if (lines.length === 0) {
        return '';
    }

    const pad = getPadLength(lines);
    if (pad <= 0) {
        return lines.join('\n');
    }

    for (let i = 0; i < lines.length; ++i) {
        const l = lines[i];
        if (l.length === 0) {
            continue;
        }
        const counts = charsToSlice(l, pad);
        let line = l.slice(counts[0]);
        if (counts[1] !== undefined) {
            line = ' '.repeat(counts[1]) + line;
        }
        lines[i] = line;
    }

    return lines.join('\n');
}

module.exports = heredoc;
