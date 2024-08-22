import React, {Suspense} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {createRoot} from 'react-dom/client';

const Application = React.lazy(() => import('remote_react_module/Admin'));
const SsrTest = React.lazy(() => import('remote_next_module/SsrTest'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<div>loading</div>}>
				<Application />
				<SsrTest />
			</Suspense>
		),
	},
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
