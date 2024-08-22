import React, {useEffect, useState} from 'react';
import {testFunc} from '@test-mono/common';

function AdminTest() {
	const [title, setTitle] = useState('');

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

	useEffect(() => {
		setTitle('Admin 컴포넌트');
	}, []);

	return (
		<div>
			{title}
			<button onClick={handleClick}>Send Request to Back</button>
		</div>
	);
}

export default AdminTest;
