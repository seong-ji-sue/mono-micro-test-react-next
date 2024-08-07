import React, {Suspense} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import {testFunc} from '@test-mono/common';
const Application = React.lazy(() => import('app/Admin'));

// const App = () => {
// 	// const handleClick = async () => {
// 	// 	try {
// 	// 		const response = await fetch('http://localhost:3001/');
// 	// 		const message = await response.text();
// 	// 		alert(message);
// 	// 		alert(testFunc());
// 	// 	} catch (error) {
// 	// 		console.error('Error fetching data:', error);
// 	// 	}
// 	// };
//
// 	return (
// 		<div>
// 			<button onClick={handleClick}>Send Request to Back</button>
// 			<div>
// 				Admin 컴포넌트
// 				<Suspense fallback={<div>loading</div>}>
// 					<Application />
// 				</Suspense>
// 			</div>
// 		</div>
// 	);
// };

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<div>loading</div>}>
				<Application />
			</Suspense>
		),
	},
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
