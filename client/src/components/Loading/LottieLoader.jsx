import Lottie from 'react-lottie-player';
import { useEffect, useState } from 'react';

export default function LottieLoader({ type }) {
	const [animationData, setAnimationData] = useState();

	useEffect(() => {
		switch (type) {
			case 'sound':
				import('assets/lottie/sound-loader.json').then(setAnimationData);
				break;
			default:
				break;
		}
	}, [type]);

	return (
		<Lottie
			loop
			play
			animationData={animationData}
			style={{ width: 50, height: 50, transition: '0.3s linear' }}
		/>
	);
}
