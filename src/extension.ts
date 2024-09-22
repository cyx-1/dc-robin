// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { marked } from 'marked';
import * as path from 'path';
import * as fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "dc-robin" is now active!');

    // Register a new command that shows a WebView
    const disposable = vscode.commands.registerCommand('dc-robin.showChat', () => {
        // Create and show a new WebView
        const panel = vscode.window.createWebviewPanel(
            'dc-robin.showChatView', // Internal identifier for the WebView
            'DC Robin', // Title for the WebView panel
            vscode.ViewColumn.One, // Show it in the first column
            {
                enableScripts: true,
                retainContextWhenHidden: true
            } // WebView options
        );
        let count = 0;
        // Set the content of the WebView
        // Read HTML file and set it as WebView content
        const htmlPath = path.join(context.extensionPath, 'src', 'webviewContent.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        panel.webview.html = htmlContent;

        // Handle messages from the WebView
        panel.webview.onDidReceiveMessage(message => {
            const timestamp: number = Date.now();
            const formattedDate: string = new Date(timestamp).toLocaleString();
            const markdown = `##### ${formattedDate} Please ask me anything, or pick from menu below:
| Test1     | Test2 | Test3      |
|-----------|-------|------------|
| Data 1    | 23    | location   |`;

            const html = marked(markdown);
            count++;

            panel.webview.postMessage({ type: 'botMessage', text: `${html} <br>${count}` });
        });
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
