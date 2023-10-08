'use client'

import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { random, shuffle } from 'lodash-es'
import tw from 'twin.macro'
import { Mon } from '@/lib/types'
import dynamic from 'next/dynamic'
import { DropItemProps } from './drop-item'
import i18n from '@/lib/i18n'

export interface IntroProps {
  mons?: Mon[]
  onEnter: VoidFunction
  isLoading: boolean
}

const Intro: React.FC<IntroProps> = ({ mons = [], onEnter, isLoading }) => {
  const [dropCount, setDropCount] = useState(0)

  const start = useCallback(() => {
    !isLoading && onEnter()
  }, [isLoading, onEnter])

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        start()
      }
    },
    [start],
  )

  const dropMon = useCallback(() => {
    const mon = shuffle(mons)[0]
    if (mon) {
      return <DynamicDropItem src={mon.image} />
    }
  }, [mons])

  const wordsDelays = useMemo(() => {
    return Array.from({ length: 9 }).map(() => random(0.1, 2.0))
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    const timer = setInterval(() => setDropCount((count) => ++count), 2000)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
      clearInterval(timer)
    }
  }, [handleKeydown])

  return (
    <div
      css={tw`relative h-screen w-full flex justify-center items-center bg-primary flex-col gap-10 overflow-hidden p-4`}
      onClick={start}
    >
      <h1 css={tw`flex sm:text-8xl text-4xl text-white font-bold`}>
        <DropWord delay={wordsDelays[0]}>P</DropWord>
        <DropWord delay={wordsDelays[1]}>o</DropWord>
        <DropWord delay={wordsDelays[2]}>k</DropWord>
        <DropWord delay={wordsDelays[3]}>é</DropWord>
        <DropWord delay={wordsDelays[4]}>d</DropWord>
        <DropWord delay={wordsDelays[5]}>r</DropWord>
        <DropWord delay={wordsDelays[6]}>o</DropWord>
        <DropWord delay={wordsDelays[7]}>p</DropWord>
        <DropWord delay={wordsDelays[8]}>s</DropWord>
      </h1>
      <h2 css={tw`sm:text-2xl text-white animate-pulse text-center`}>
        {isLoading ? i18n.t('intro.loading') : i18n.t('intro.pressEnter')}
      </h2>
      <Fragment key={dropCount}>{dropMon()}</Fragment>
    </div>
  )
}

interface DropWordProps {
  delay: number
  children: string
}

const DropWord = ({ delay, children }: DropWordProps) => {
  return (
    <motion.div
      initial={{
        y: '-60vh',
      }}
      animate={{
        y: 0,
      }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 200,
        duration: 0.5,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

Intro.displayName = 'Intro'

export default Intro

const DynamicDropItem = dynamic<DropItemProps>(() => import('./drop-item'), {
  ssr: false,
})
