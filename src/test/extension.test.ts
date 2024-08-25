import * as assert from 'assert';
import * as myExtension from '../extension';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');
    test('Format Dockerfile', async () => {
        const document = await vscode.workspace.openTextDocument({ language: 'dockerfile', content: `FROM ubuntu:18.04\nRUN apt-get update && apt-get install -y \\\n    curl \\\n    wget \\\n    git\n` });

        const editor = await vscode.window.showTextDocument(document);
        const formattedText = myExtension.formatDockerfile(document.getText());

        await editor.edit(editBuilder => {
            const entireRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(document.getText().length)
            );
            editBuilder.replace(entireRange, formattedText);
        });

        console.log('Actual Output:', document.getText());

        const expectedOutput = `FROM ubuntu:18.04\n\nRUN apt-get update && apt-get install -y \\\n    curl \\\n    wget \\\n    git\n`;

        assert.strictEqual(document.getText(), expectedOutput, 'The Dockerfile should be correctly formatted');
    });

});
