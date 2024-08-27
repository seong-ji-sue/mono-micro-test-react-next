import {loadRemote} from '@module-federation/runtime';
import {lazy, useEffect, useState} from 'react';

const NextComponent =
	typeof window !== 'undefined'
		? lazy(() => loadRemote('remote_next_module/main'))
		: () => null;

const AdminComponent =
	typeof window !== 'undefined'
		? lazy(() => loadRemote('remote_react_module/Admin'))
		: () => null;

export default function Home() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<NextComponent />
			<AdminComponent />
		</div>
	);
}
