import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './404.css';

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
				<span className='particle' key={index}>
					{val}
				</span>
			))}
			<article className='content'>
				<p>Damnit stranger,</p>
				<p>
					You got lost in the <strong>404</strong> galaxy.
				</p>
				<p>
					<Link to='/'>
						<button>Go back to ⚡ Space</button>
					</Link>
				</p>
			</article>
		</div>
	);
}
