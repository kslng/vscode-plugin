/**
 * @typedef {Object} SymbolInfo
 * @property {string} name
 * @property {string} qualifiedName
 * @property {string} filePath
 * @property {number} line
 * @property {number} character
 */

/** @type {Map<string, SymbolInfo>} */
const symbolTable = new Map();

function addSymbol(symbol) {
	symbolTable.set(symbol.name, symbol);
}

function lookupSymbol(name) {
	return symbolTable.get(name);
}

function clearSymbols(path) {
	for (const [key, val] of symbolTable.entries()) {
		if (val.filePath === path) {
			symbolTable.delete(key);
		}
	}
}

module.exports = {
	addSymbol,
	lookupSymbol,
	clearSymbols
};
