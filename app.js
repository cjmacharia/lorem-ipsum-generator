const http = require('http');
const router = require('./router.js');

const port = 8080;
http.createServer((request, response) => {
	router.header(request, response);
}).listen(port);
