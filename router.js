const qs = require('querystring');
const fs = require('fs');
const renderer = require('./renderer.js');
const loremIpsum = require('./ipsum.js');

const header = (request, response) => {
	if (request.url === '/') {
		if (request.method === 'GET') {
			response.writeHead(200, { 'content-Type': 'text/html' });
			renderer.view('header', {}, request, response);
			renderer.view('index', {}, request, response);
			response.end();
		} else {
			let requestBody = '';
			// data has been recieved.
			request.on('data', (data) => {
				requestBody += data;
			});
			// The whole response has been received.
			request.on('end', () => {
				// method parses a URL query string into a collection of key and value pairs.
				const formData = qs.parse(requestBody);
				const count = formData.number;
				let fileContents = fs.readFileSync('./views/index.html', { encoding: 'utf-8' });
				if (formData.number <= 0) {
					fileContents = 'you have to input a number that is greater than 0 !!!! <br> <button type = "button" class="btn btn-default"> <a href="/">Please go back</a> </button>';
				} else if (formData.selected === 'Choose the type') {
					fileContents = 'Please select one value from the drop downs !!!  <br> <button type = "button" class="btn btn-default"> <a href="/">Please go back</a> </button>';
				} else {
					if (formData.selected === '1') {
						fileContents = renderer.generateLetters(count, loremIpsum.letters, fileContents);
					}
					if (formData.selected === '2') {
						fileContents = renderer.generateWords(count, loremIpsum.words, fileContents);
					}
					if (formData.selected === '3') {
						fileContents = renderer.generateParagraph(count, loremIpsum.paragraph, fileContents);
					}
				}
				response.writeHead(200, { 'content-Type': 'text/html' });
				renderer.view('header', {}, request, response);
				response.write(fileContents);
				response.end();
			});
		}
	}
};
module.exports.header = header;
