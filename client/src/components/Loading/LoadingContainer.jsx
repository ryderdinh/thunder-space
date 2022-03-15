import ThreeDot from './ThreeDot';

export default function LoadingContainer() {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50px',
		height: 'auto'
	};
	return (
		<div className='loading-container' style={style}>
			<ThreeDot />
		</div>
	);
}
