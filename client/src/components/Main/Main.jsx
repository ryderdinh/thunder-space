import { useSelector } from 'react-redux';
import '../../App.css';

export default function Main({ children }) {
	const blur = useSelector(state => state?._popup.blur);

	return (
		<main className={blur ? 'onblur' : ''}>
			<div className='view-container'>{children}</div>
		</main>
	);
}
