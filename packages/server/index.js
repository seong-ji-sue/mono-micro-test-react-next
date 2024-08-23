import express from 'express';
import {testFunc} from '@test-mono/common';
import cors from 'cors';

const app = express();
const port = 3003;

app.use(cors({origin: '*', credentials: true}));

app.get('/', (req, res) => {
	res.send('Hello from backend!');
});

app.listen(port, () => {
	console.log(`Backend server is running at http://localhost:${port}`);
	console.log(testFunc());
});
