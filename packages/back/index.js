//packages/back/index.js
const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});

