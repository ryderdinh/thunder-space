import { Link } from 'react-router-dom';

export default function NotFoundContent() {
	return (
		<article className='content'>
			<p>Damnit stranger,</p>
			<p>
				You got lost in the <strong>404</strong> galaxy.
			</p>
			<p>
				<Link to='/'>
					<button>Go back to⚡Space</button>
				</Link>
			</p>
		</article>
	);
}
