function tokenize(text) {
	const tokens = [];
	const lines = text.split('\n');

	let namespace = "";

	for (let lineNum = 0; lineNum < lines.length; lineNum++) {
		let line = lines[lineNum].trim();

		// Skip empty or commented lines
		if (!line || line.startsWith('//')) continue;

		// Match Namespace
		if (line.startsWith('namespace "')) {
			const new_ns = line.slice('namespace "'.length).split('"')[0].trim();
			namespace = new_ns;
			continue;
		}

		// Match Function
		if (line.startsWith('function ')) {
			const name = line.slice('function '.length).split('(')[0].trim();
			tokens.push({
				name,
				qualifiedName: [namespace, name].join("."),
				line: lineNum,
				character: lines[lineNum].indexOf(name)
			});
			continue;
		}
	}

	return tokens;
}

module.exports = { tokenize };
