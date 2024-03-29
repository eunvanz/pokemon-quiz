import useIsMobile from '@/lib/hooks/use-is-mobile'
import { motion } from 'framer-motion'
import { random } from 'lodash-es'
import { useCallback, useState } from 'react'

export interface RainItemProps {
  src: string
  zIndexRange?: [number, number]
}

const RainItem = ({ src, zIndexRange = [-10, 3] }: RainItemProps) => {
  const [delay, setDelay] = useState(100_000)

  const isMobile = useIsMobile()

  const size = random(isMobile ? 50 : 100, isMobile ? 100 : 200)

  const left = random(0, window.innerWidth - size / 2)

  const zIndex = random(...zIndexRange)

  const handleOnImageLoad = useCallback(() => {
    setDelay(random(0, 2_000))
  }, [])

  return (
    <motion.div
      initial={{
        position: 'fixed',
        left,
        top: -size,
        translateY: '-50px',
        width: size,
        height: size,
        zIndex,
      }}
      animate={{
        translateY: `${window.innerHeight + size + 100}px`,
        transitionEnd: {
          display: 'none',
        },
      }}
      transition={{
        ease: 'easeIn',
        duration: 1.5,
        delay: delay / 1000,
        opacity: { duration: 0.5 },
      }}
      exit={{ opacity: 0 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        width={size}
        height={size}
        onLoad={handleOnImageLoad}
        alt="mon image"
      />
    </motion.div>
  )
}

export default RainItem
