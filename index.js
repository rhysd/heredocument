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
        if (line[i] === ' ') {
            count += 1;
        } else if (line[i] === '\t') {
            count += 8;
        } else {
            break;
        }
    }
    return count;
}

function getPadLength(lines) {
    let pad = 0;
    lines.forEach(line => {
        if (line.length === 0) {
            return; // Continue
        }
        pad = indentOf(line);
    });
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
            throw Error(`FATAL: Char is not whitespace: '${line[idx]}' at ${idx} in '${line}'`);
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
    const pad = getPadLength(lines);
    if (pad <= 0) {
        return lines.join('\n');
    }

    for (let i = 0; i < lines.length; ++i) {
        if (lines[i].length === 0) {
            continue;
        }
        const counts = charsToSlice(lines[i], pad);
        let line = lines[i].slice(counts[0]);
        if (counts[1] !== undefined) {
            line = ' '.repeat(counts[1]) + line;
        }
        lines[i] = line;
    }

    return lines.join('\n');
}

module.exports = heredoc;
