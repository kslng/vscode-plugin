const { tokenize } = require('./lexer');
const { addSymbol, clearSymbols } = require('./symbolTable');

function indexSymbols(document) {
	clearSymbols(document.uri.fsPath);

	const text = document.getText();
	const symbols = tokenize(text);

	symbols.forEach(symbol => {
		console.log(symbol);
		addSymbol({
			name: symbol.name,
			qualifiedName: symbol.qualifiedName,
			filePath: document.uri.fsPath,
			line: symbol.line,
			character: symbol.character
		});
	});
}

module.exports = { indexSymbols };
