export interface HeredocOptions {
    tabSize?: number;
    inputNewline?: string;
    outputNewline?: string;
}

export interface Heredoc {
    (strings: string[], ...interpolations: string[]): string;
    (opts: HeredocOptions): Heredoc;
}

export function commonIndentFromLines(lines: string[], opts: HeredocOptions): number;

declare const heredoc: Heredoc;
export default heredoc;
