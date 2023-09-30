'use client'

import { AnimatePresence, motion } from 'framer-motion'
import AnimatedNumber from 'react-awesome-animated-number'
import tw from 'twin.macro'

export interface ScoreProps {
  label: string
  count: number
  unit?: string
  diff?: number
}

const Score: React.FC<ScoreProps> = ({ label, count, unit, diff }) => {
  return (
    <div css={tw`text-xl flex justify-between w-full`}>
      <div css={tw`mt-0.5 mr-1`}>{label}</div>
      <div css={tw`relative text-blue-600`}>
        <AnimatePresence>
          <AnimatedNumber hasComma value={count} size={28} />
          {unit && <span className="ml-1 text-black">{unit}</span>}
          {diff && (
            <motion.span
              css={tw`text-xl text-blue-600 absolute right-0 tracking-widest`}
              key={diff}
              initial={{
                y: -20,
              }}
              animate={{
                y: -50,
                opacity: 0,
              }}
              transition={{
                ease: 'linear',
                duration: 0.5,
              }}
            >
              +{diff.toLocaleString()}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Score
