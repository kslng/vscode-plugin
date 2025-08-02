const vscode = require('vscode');
const { KSLDefintionProvider } = require('./src/definitionProvider');
const { indexSymbols } = require('./src/symbolIndexer');

function activate(context) {
	context.subscriptions.push(
		vscode.languages.registerDefinitionProvider(
			{ language: "ksl" },
			new KSLDefintionProvider()
		)
	);

	// Index on Open
	vscode.workspace.onDidOpenTextDocument(doc => {
		if (doc.languageId === "ksl") {
			indexSymbols(doc);
		}
	});

	// Index on Save
	vscode.workspace.onDidSaveTextDocument(doc => {
		if (doc.languageId === "ksl") {
			indexSymbols(doc);
		}
	});

	// Index Already Open Files on Startup
	for (const doc of vscode.workspace.textDocuments) {
		if (doc.languageId === "ksl") {
			indexSymbols(doc);
		}
	}
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
