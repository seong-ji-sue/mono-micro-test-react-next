console.log('SERVER - FRONT_PORT: ----->' + process.env.FRONT_PORT);

const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const port = process.env.FRONT_PORT;
const app = express();

app.use(express.static(path.resolve(__dirname, 'dist')));

const sslOptions = {
  key: fs.readFileSync('./certificates/rootca.key'),
  cert: fs.readFileSync('./certificates/rootca.crt'),
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

https.createServer(sslOptions, app).listen(port);
