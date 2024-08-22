import React, {useState} from 'react';

function SsrTest(props) {
	const [asd, setAsd] = useState('SsrTest');
	return <div>{asd} 컴포넌트</div>;
}

export default SsrTest;
