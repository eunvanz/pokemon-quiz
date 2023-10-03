import useIsMobile from '@/lib/hooks/use-is-mobile'
import { motion } from 'framer-motion'
import { random } from 'lodash-es'
import { useCallback, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'

export interface DropItemProps {
  src: string
}

const DropItem = ({ src }: DropItemProps) => {
  const isMobile = useIsMobile()

  const windowSize = useWindowSize()

  const [delay, setDelay] = useState(100_000)

  const size = random(isMobile ? 50 : 100, isMobile ? 100 : 300)

  const left = random(0, window.innerWidth - size / 2 - 16)

  const handleOnImageLoad = useCallback(() => {
    setDelay(random(0, 500))
  }, [])

  return (
    <motion.div
      initial={{
        position: 'absolute',
        left,
        top: -size,
        translateY: '-50px',
        width: size,
        height: size,
        zIndex: 10,
      }}
      animate={{
        translateY: `${windowSize.height + size + 100}px`,
        transitionEnd: {
          display: 'none',
        },
      }}
      transition={{
        ease: 'easeIn',
        duration: 1,
        delay: delay / 1000,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        width={size}
        height={size}
        onLoad={handleOnImageLoad}
        alt="drop item"
      />
    </motion.div>
  )
}

export default DropItem
