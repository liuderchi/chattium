const express = require('express');
const path = require('path');
const http = require('http');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
