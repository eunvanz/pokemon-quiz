'use client'

import { AnimatePresence, motion } from 'framer-motion'
import tw from 'twin.macro'
import Button from '../button'

export interface GameOverProps {
  isVisible: boolean
  onHide: VoidFunction
  isClear: boolean
  hasWrongAnswers: boolean
  onCheckRank: VoidFunction
}

const GameOver: React.FC<GameOverProps> = ({
  isVisible,
  isClear,
  onHide,
  hasWrongAnswers,
  onCheckRank,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition: {
              opacity: {
                delay: 0.3,
              },
            },
          }}
          css={tw`absolute flex justify-center items-center w-full h-full flex-col z-10 top-0`}
        >
          <motion.h1
            initial={{
              y: -100,
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: 100,
              transition: {
                y: {
                  delay: 0.3,
                },
              },
            }}
            css={tw`text-blue-600 text-3xl sm:text-6xl z-10`}
          >
            {isClear ? 'GAME CLEAR' : 'GAME OVER'}
          </motion.h1>
          <motion.div
            css={tw`mt-3 z-10`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                opacity: {
                  delay: 0.3,
                },
              },
            }}
            exit={{
              opacity: 0,
            }}
          >
            <Button
              variant="outlined"
              onClick={hasWrongAnswers ? onHide : onCheckRank}
            >
              {hasWrongAnswers ? 'Check the wrong answers' : 'Check your rank'}
            </Button>
          </motion.div>
          <div css={tw`absolute bg-white w-full h-full opacity-80 z-0`} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GameOver
