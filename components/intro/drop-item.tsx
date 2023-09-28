import { motion } from 'framer-motion'
import { random } from 'lodash-es'
import { useCallback, useState } from 'react'

export interface DropItemProps {
  src: string
}

const DropItem = ({ src }: DropItemProps) => {
  const [delay, setDelay] = useState(100_000)

  const size = random(100, 300)

  const left = random(0, window.innerWidth - size)

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
        translateY: `${window.innerHeight + size + 100}px`,
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
