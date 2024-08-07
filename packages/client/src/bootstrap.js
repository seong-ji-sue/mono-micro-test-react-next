import React, {Suspense} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {createRoot} from 'react-dom/client';

const Application = React.lazy(() => import('app/Admin'));

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
