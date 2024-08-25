import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext): void {
    vscode.workspace.onWillSaveTextDocument(event => {
        const document = event.document;
        if (document.languageId === 'dockerfile') {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const formattedText = formatDockerfile(document.getText());
                editor.edit(editBuilder => {
                    const entireRange = new vscode.Range(
                        document.positionAt(0),
                        document.positionAt(document.getText().length)
                    );
                    editBuilder.replace(entireRange, formattedText);
                });
            }
        }
    });
}


export function formatDockerfile(content: string): string {
    const lines: string[] = content.split('\n');
    const formattedLines: string[] = [];
    let insideMultilineInstruction = false;

    lines.forEach((line, index) => {
        const trimmedLine: string = line.trim();
        const isInstruction: boolean = /^(FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b/i.test(trimmedLine);

        if (trimmedLine.endsWith('\\')) {
            if (!insideMultilineInstruction) {
                insideMultilineInstruction = true;
                formattedLines.push(trimmedLine);  
            } else {
                formattedLines.push(line);  
            }
        } else if (insideMultilineInstruction) {
            formattedLines.push(line); 
            insideMultilineInstruction = false;
        } else {
            if (isInstruction) {
                formattedLines.push(formatInstruction(trimmedLine));
                if (index < lines.length - 1 && lines[index + 1].trim() !== '') {
                    formattedLines.push('');  
                }
            } else if (trimmedLine.startsWith('#')) {
                formattedLines.push(trimmedLine);
            } else if (trimmedLine === '') {
                formattedLines.push('');
            } else {
                formattedLines.push(line);
            }
        }
    });

    return formattedLines.join('\n').trim() + '\n'; // Add newline at the end for consistency
}


export function formatInstruction(line: string): string {
    const instructionMatch: RegExpMatchArray | null = line.match(/^(FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b/i);
    if (instructionMatch) {
        const instruction: string = instructionMatch[0].toUpperCase();
        const remainder: string = line.slice(instruction.length).trim();

        if (/^(ENV|ARG|LABEL)\b/i.test(instruction)) {
            return `${instruction} ${formatKeyValuePairs(remainder)}`;
        }

        return `${instruction} ${remainder}`;
    }
    return line;
}


export function formatKeyValuePairs(content: string): string {
    if (!content.includes('=')) {
        return content.trim(); 
    }

    const [key, ...valueParts] = content.split('=');
    const value = valueParts.join('=').trim(); 

    if (!key || !value) {
        return `${key.trim()}=${value}`.trim();
    }

    return `${key.trim()}=${value}`.trim();
}


export function deactivate(): void {}
