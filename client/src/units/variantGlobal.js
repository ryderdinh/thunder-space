const variant1 = {
	hidden: {
		opacity: 0,
		y: '-30px'
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: 'spring', delay: 0.3 }
	},
	exit: {
		opacity: 0,
		y: '-30px',
		transition: { ease: 'easeInOut', delay: 0 }
	}
};

const variant2 = {
	hidden: {
		opacity: 0,
		y: '-30px'
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: 'spring', delay: 0.5 }
	},
	exit: {
		opacity: 0,
		y: '-30px',
		transition: { ease: 'easeInOut' }
	}
};

export default function variantGlobal({ type, addValue }) {
	switch (type) {
		case 1:
			return {
				...variant1,
				visible: {
					...variant1.visible,
					transition: {
						...variant1.visible.transition,
						delay: variant1.visible.transition.delay + addValue
					}
				},
				exit: {
					...variant1.exit,
					transition: {
						...variant1.exit.transition,
						delay: variant1.exit.transition.delay + addValue
					}
				}
			};
		case 2:
			return {
				...variant2,
				visible: {
					...variant2.visible,
					transition: {
						...variant2.visible.transition,
						delay: variant2.visible.transition.delay + addValue
					}
				},
				exit: {
					...variant2.exit,
					transition: {
						...variant2.exit.transition
					}
				}
			};
		default:
			break;
	}
	return;
}
