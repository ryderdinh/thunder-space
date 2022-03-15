import 'assets/css/404.css';
import NotFoundContent from 'components/404/NotFoundContent';
import Particle from 'components/404/Particle';
import React, { useEffect, useState } from 'react';

export default function NotFound() {
	const [arrGalaxy, setArrGalaxy] = useState([]);

	const random = arr => {
		return arr[Math.floor(Math.random() * arr.length)];
	};

	useEffect(() => {
		document.title = 'Not found';

		for (let i = 0; i < 80; i++) {
			setArrGalaxy([...arrGalaxy, random([4, 0])]);
		}
	}, [arrGalaxy]);

	return (
		<div className='not-found'>
			{arrGalaxy.map((val, index) => (
				<Particle key={index} val={val} />
			))}
			<NotFoundContent />
		</div>
	);
}
