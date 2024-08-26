import Link from 'next/link';
import {useRouter} from 'next/router';

export default function Home() {
	//TODO::NextRouter was not mounted
	const router = useRouter();

	const pageMove = () => {
		router.push('/test');
	};

	return (
		<div>
			ssr 프로젝트 입니다
			<button onClick={pageMove}>페이지 이동</button>
		</div>
	);
}
