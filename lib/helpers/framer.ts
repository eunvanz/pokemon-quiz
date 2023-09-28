import { Variants } from 'framer-motion'

export const motionVariants: Variants = {
  vibe: {
    translateX: [0, -4, 0, 4, 0],
    transition: {
      repeat: 2,
      duration: 0.1,
    },
  },
}
