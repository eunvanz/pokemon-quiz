'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import tw from 'twin.macro'

export interface ReadyProps {
  onStart: VoidFunction
}

const Ready: React.FC<ReadyProps> = ({ onStart }) => {
  const [text, setText] = useState('READY')
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setText('START')
      setTimeout(() => {
        setIsVisible(false)
        onStart()
      }, 300)
    }, 1000)
  }, [onStart])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          css={tw`absolute h-screen w-full bg-white flex justify-center items-center z-10`}
          exit={{ opacity: 0 }}
        >
          <h1
            css={[
              tw`text-3xl sm:text-5xl`,
              text === 'START' ? tw`text-primary animate-ping` : undefined,
            ]}
          >
            {text}
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Ready
