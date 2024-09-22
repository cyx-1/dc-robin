// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "dc-robin" is now active!');

    // Register a new command that shows a WebView
    const disposable = vscode.commands.registerCommand('webviewHello.showHello', () => {
        console.log('hello');
        // Create and show a new WebView
        const panel = vscode.window.createWebviewPanel(
            'helloWebview', // Internal identifier for the WebView
            'Hello', // Title for the WebView panel
            vscode.ViewColumn.One, // Show it in the first column
            {
                enableScripts: true
            } // WebView options
        );

        // Set the content of the WebView
        panel.webview.html = getWebviewContent();

        // Handle messages from the WebView
        panel.webview.onDidReceiveMessage(message => {
            panel.webview.postMessage({ type: 'botMessage', text: `Response to: ${message.text}` });
        });
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                height: 100vh;
                background-color: #1e1e1e; /* Dark background */
                color: #d4d4d4; /* Light text for readability */
            }

            .chat-container {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding: 10px;
                overflow-y: auto;
                background-color: #252526; /* Dark gray background for chat container */
                border: 1px solid #3c3c3c; /* Slightly lighter border */
                margin: 20px;
                border-radius: 10px;
                color: #d4d4d4; /* Light text */
            }

            .chat-message {
                margin: 5px 0;
                max-width: 70%;
                padding: 10px;
                border-radius: 10px;
                position: relative;
                clear: both;
            }

            .chat-message.user {
                background-color: #007acc; /* Blue for user message */
                color: white; /* White text for contrast */
                align-self: flex-end;
                border-top-right-radius: 0;
            }

            .chat-message.bot {
                background-color: #3c3c3c; /* Dark gray for bot message */
                color: #d4d4d4; /* Light text */
                align-self: flex-start;
                border-top-left-radius: 0;
            }

            .chat-input-container {
                display: flex;
                padding: 10px;
                border-top: 1px solid #3c3c3c; /* Slightly lighter border */
                background-color: #252526; /* Dark background for input container */
            }

            .chat-input {
                flex-grow: 1;
                padding: 10px;
                border-radius: 5px;
                border: 1px solid #3c3c3c; /* Dark gray border */
                font-size: 16px;
                background-color: #1e1e1e; /* Darker background for input */
                color: #d4d4d4; /* Light text */
            }

            .chat-send-btn {
                margin-left: 10px;
                padding: 10px 15px;
                background-color: #007acc; /* Blue for button */
                color: white; /* White text for button */
                border: none;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
            }

            .chat-send-btn:hover {
                background-color: #005f9e; /* Darker blue for hover */
            }
        </style>
        <title>Chat Interface</title>
    </head>
    <body>
        <div class="chat-container" id="chat-container">
            <div class="chat-message bot">Hello! How can I assist you today?</div>
        </div>
        <div class="chat-input-container">
            <input id="chat-input" type="text" class="chat-input" placeholder="Type a message..." />
            <button id="chat-send-btn" class="chat-send-btn">Send</button>
        </div>

        <script>
            const chatContainer = document.getElementById('chat-container');
            const chatInput = document.getElementById('chat-input');
            const chatSendBtn = document.getElementById('chat-send-btn');

            // Function to send the message
            const sendMessage = () => {
                const message = chatInput.value.trim();
                if (message) {
                    addMessage('user', message);
                    chatInput.value = '';

                    // Send message to VS Code extension
                    vscode.postMessage({ type: 'userMessage', text: message });
                }
            };
            
            // Listen for click on send button
            chatSendBtn.addEventListener('click', sendMessage);

            // Listen for 'Enter' key press to send message
            chatInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault(); // Prevent default Enter behavior (e.g., form submission)
                    sendMessage();
                }
            });

            function addMessage(sender, text) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('chat-message', sender);
                messageDiv.innerHTML = text;
                messageDiv.classList.add('markdown-content'); // 
                chatContainer.appendChild(messageDiv);
                chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
            }

            // Handle messages from the extension
            window.addEventListener('message', event => {
                const message = event.data;
                if (message.type === 'botMessage') {
                    addMessage('bot', message.text);
                }
            });

            // Initialize VS Code API
            const vscode = acquireVsCodeApi();
        </script>
    </body>
    </html>
    `;
}


// This method is called when your extension is deactivated
export function deactivate() { }
