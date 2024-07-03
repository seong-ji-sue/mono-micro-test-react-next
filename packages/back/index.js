import cors from 'cors';
import express from 'express';

const app = express();
const port = 3001;

app.use(cors({origin: '*', credentials: true}));

app.get('/', (req, res) => {
	res.send('프론트 요청을 정상적으로 받았다!');
});

app.listen(port, () => {
	console.log(`Backend server is running at http://localhost:${port}`);
});
