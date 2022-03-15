export default function ViewMain({ children }) {
	return (
		<div className='view_main'>
			{/* <div className='background-texture'>
				<img src={require('assets/images/ellips5.svg').default} alt='' />
			</div> */}
			<div className='row'>{children}</div>
		</div>
	)
}
