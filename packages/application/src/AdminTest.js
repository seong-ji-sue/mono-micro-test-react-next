import React, {useEffect, useState} from 'react';

function AdminTest() {
	const [title, setTitle] = useState('');

	useEffect(() => {
		setTitle('Admin 컴포넌트');
	}, []);

	return <div>{title}</div>;
}

export default AdminTest;
