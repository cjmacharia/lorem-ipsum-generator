const fs = require('fs');

const generateLetters = (count, value, fileContents) => {
	const result = value.slice(0, count);
	const content = fileContents.replace('{{lorem}}', result);
	return content;
};

const generateWords = (count, value, fileContents) => {
	const array = value.slice(0, count);
	const result = array.join().replace(/,/g, '');
	return fileContents.replace('{{lorem}}', result);
};

const generateParagraph = (count, value, fileContents) => {
	for (let i = 0; i < count; i++) {
		if (count > value.length) {
			value.push(value[i]);
		}
	}

	const paragraph = value.slice(0, count);
	const result = paragraph.join();
	return fileContents.replace('{{lorem}}', result);
};
const view = (templateName, values, request, response) => {
	const fileContents = fs.readFileSync('./views/' + templateName + '.html', { encoding: 'utf-8' });
	response.write(fileContents);
};
module.exports.view = view;
module.exports.generateLetters = generateLetters;
module.exports.generateWords = generateWords;
module.exports.generateParagraph = generateParagraph;
