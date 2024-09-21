// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dc-robin" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// const disposable = vscode.commands.registerCommand('dc-robin.helloWorld', () => {
	// The code you place here will be executed every time your command is executed
	// Display a message box to the user
	// console.log('hello world 2');
	// vscode.window.showInformationMessage('Hello World from DC Robin!');
	// });

	// Register a new command that shows a WebView
	const disposable = vscode.commands.registerCommand('dc-robin.showHello', () => {
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

		// Create a new icon in the activity bar (side bar)
		//const myViewProvider = new MyViewProvider(context.extensionUri);
		//context.subscriptions.push(
		//vscode.window.registerWebviewViewProvider(MyViewProvider.viewType, myViewProvider));
	});

	context.subscriptions.push(disposable);
}

class MyViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'webviewHello.view';

	constructor(private readonly extensionUri: vscode.Uri) { }

	resolveWebviewView(webviewView: vscode.WebviewView) {
		// Set WebView content
		webviewView.webview.options = { enableScripts: true };
		webviewView.webview.html = getWebviewContent();
	}
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
                background-color: #000; /* Black background for high contrast */
                color: #fff; /* White text for high contrast */
            }

            .chat-container {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding: 10px;
                overflow-y: auto;
                background-color: #000; /* Black background */
                border: 2px solid #fff; /* White border for contrast */
                margin: 20px;
                border-radius: 10px;
                color: #fff; /* Ensure text remains white */
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
                background-color: #00ff00; /* Bright green for user message */
                color: black; /* Black text for user message */
                align-self: flex-end;
                border-top-right-radius: 0;
            }

            .chat-message.bot {
                background-color: #ff00ff; /* Bright magenta for bot message */
                color: black; /* Black text for bot message */
                align-self: flex-start;
                border-top-left-radius: 0;
            }

            .chat-input-container {
                display: flex;
                padding: 10px;
                border-top: 2px solid #fff; /* White border for contrast */
                background-color: #000; /* Black background */
            }

            .chat-input {
                flex-grow: 1;
                padding: 10px;
                border-radius: 5px;
                border: 2px solid #fff; /* White border */
                font-size: 16px;
                background-color: #000; /* Black background */
                color: #fff; /* White text */
            }

            .chat-send-btn {
                margin-left: 10px;
                padding: 10px 15px;
                background-color: #00ff00; /* Bright green for button */
                color: black; /* Black text on button */
                border: none;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
            }

            .chat-send-btn:hover {
                background-color: #007b00; /* Slightly darker green for hover effect */
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

            chatSendBtn.addEventListener('click', () => {
                const message = chatInput.value.trim();
                if (message) {
                    addMessage('user', message);
                    chatInput.value = '';
                    
                    // Simulate a bot response after a short delay
                    setTimeout(() => {
                        addMessage('bot', 'This is a response from the bot!');
                    }, 1000);
                }
            });

            function addMessage(sender, text) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('chat-message', sender);
                messageDiv.textContent = text;
                chatContainer.appendChild(messageDiv);
                chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
            }
        </script>
    </body>
    </html>
    `;
}


// This method is called when your extension is deactivated
export function deactivate() { }
