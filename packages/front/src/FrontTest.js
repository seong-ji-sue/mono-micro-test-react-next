import React, {Suspense} from 'react';
const Admin = React.lazy(() => import('admin/Admin'));

function FrontTest() {
	return (
		<div>
			Admin 컴포넌트
			<Suspense fallback={<div>loading</div>}>
				<Admin />
			</Suspense>
		</div>
	);
}

export default FrontTest;
