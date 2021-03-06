export interface HeredocOptions {
    tabSize?: number;
    inputNewline?: string;
    outputNewline?: string;
    newlineAtEnd?: boolean;
}

export interface Heredoc {
    (strings: TemplateStringsArray, ...interpolations: string[]): string;
    (opts: HeredocOptions): Heredoc;
}

export function commonIndentFromLines(lines: string[], opts: HeredocOptions): number;

declare const heredoc: Heredoc;
export default heredoc;
