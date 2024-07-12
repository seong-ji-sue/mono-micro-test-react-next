import React, {Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import {testFunc} from '@test-mono/common';
import FrontTest from './FrontTest';

const App = () => {
	const handleClick = async () => {
		try {
			const response = await fetch('http://localhost:3001/');
			const message = await response.text();
			alert(message);
			alert(testFunc());
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	return (
		<div>
			<button onClick={handleClick}>Send Request to Back</button>
			<FrontTest />
		</div>
	);
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
