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
}

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
}

const transition = { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96], delay: 0 }
const variant3 = (delay) => ({
  initial: { scale: 0.8, opacity: 0 },
  enter: { scale: 1, opacity: 1, transition: { ...transition, delay } },
  exit: {
    scale: 0.7,
    opacity: 0,
    transition: { duration: 1, ...transition }
  }
})

const variant4 = (delay) => ({
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { ...transition, delay } },
  exit: {
    opacity: 0,
    transition: { duration: 1, ...transition }
  }
})

export default function variantGlobal(type, value) {
  switch (type) {
    case 1:
      return {
        ...variant1,
        visible: {
          ...variant1.visible,
          transition: {
            ...variant1.visible.transition,
            delay: variant1.visible.transition.delay + value
          }
        },
        exit: {
          ...variant1.exit,
          transition: {
            ...variant1.exit.transition,
            delay: variant1.exit.transition.delay + value
          }
        }
      }
    case 2:
      return {
        ...variant2,
        visible: {
          ...variant2.visible,
          transition: {
            ...variant2.visible.transition,
            delay: variant2.visible.transition.delay + value
          }
        },
        exit: {
          ...variant2.exit,
          transition: {
            ...variant2.exit.transition
          }
        }
      }

    case 3:
      return variant3(value)

    case 4:
      return variant4(value)

    default:
      break
  }
  return
}
