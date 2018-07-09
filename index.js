const http = require('http');

const requestHandler = (request, response) => {
  console.log(request.url);
  response.end('Hello from NodeJS Server!');
};

const port = process.env.PORT || 3000;

const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
