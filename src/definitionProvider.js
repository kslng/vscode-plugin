const vscode = require('vscode');
const { lookupSymbol } = require('./symbolTable');

class KSLDefintionProvider {
	provideDefinition(document, position) {
		const line = document.lineAt(position.line).text;

		const match = /[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)*/g;
		let found = null;

		for (const m of line.matchAll(match)) {
			const start = m.index;
			const end = start + m[0].length;
			if (position.character >= start && position.character <= end) {
				found = m[0];
				break;
			}
		}

		if (!found) return null;

		const symbol = lookupSymbol(found);
		if (!symbol) return null;

		const location = new vscode.Location(
			vscode.Uri.file(symbol.filePath),
			new vscode.Position(symbol.line, symbol.character)
		);

		return location;
	}
}

module.exports = { KSLDefintionProvider };
