'use client'

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { AnimatePresence } from 'framer-motion'
import { shuffle } from 'lodash-es'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import tw from 'twin.macro'
import { GENERATIONS } from '@/lib/constants/rules'
import { Generation, Mon } from '@/lib/types'
import Button from '../button'
import 'swiper/swiper.min.css'
import RainItem from '../rain-item'

export interface SelectGenerationProps {
  onStart: (generation: Generation) => void
  onNavigateToLeaderBoard: VoidFunction
  mons: Mon[]
  onChangeGeneration: (generation: Generation) => void
}

const SelectGeneration: React.FC<SelectGenerationProps> = ({
  onStart,
  onNavigateToLeaderBoard,
  mons,
  onChangeGeneration,
}) => {
  const swiperRef = useRef<SwiperCore>()

  const [generation, setGeneration] = useState<Generation>(0)

  const generationMons = useMemo(() => {
    if (generation === 0) {
      return mons
    } else {
      return mons.slice(
        generation === 1 ? 0 : GENERATIONS[(generation - 1) as Generation] + 1,
        GENERATIONS[generation],
      )
    }
  }, [mons, generation])

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        swiperRef.current?.slidePrev()
      } else if (e.key === 'ArrowRight') {
        swiperRef.current?.slideNext()
      } else if (e.key === 'Enter') {
        onStart(generation)
      }
    },
    [onStart, generation],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [handleKeydown])

  useEffect(() => {
    onChangeGeneration(generation)
  }, [generation, onChangeGeneration])

  const generationTexts = [
    'All Generations',
    '1st Generation',
    '2nd Generation',
    '3rd Generation',
    '4th Generation',
    '5th Generation',
    '6th Generation',
    '7th Generation',
    '8th Generation',
    '9th Generation',
  ]

  return (
    <div
      css={tw`relative flex flex-col h-screen w-full justify-center overflow-hidden p-4`}
    >
      <div css={tw`sm:text-2xl text-xl text-center text-primary animate-pulse`}>
        CHOOSE A GENERATION TO CHALLENGE
      </div>
      <div>
        <Swiper
          css={tw`text-center sm:text-4xl text-2xl my-20`}
          navigation
          onSlideChange={(e) => {
            const activeIndex = e.activeIndex - 1
            if (activeIndex === -1) {
              setGeneration((generationTexts.length - 1) as Generation)
            } else if (activeIndex === generationTexts.length) {
              setGeneration(0)
            } else {
              setGeneration(activeIndex as Generation)
            }
          }}
          loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
        >
          {generationTexts.map((text) => (
            <SwiperSlide key={text}>{text}</SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div css={tw`flex justify-between sm:w-1/2 w-full mx-auto`}>
        <Button
          isBlock
          css={tw`mr-1`}
          variant="outlined"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          Previous (Left)
        </Button>
        <Button
          isBlock
          css={tw`ml-1`}
          variant="outlined"
          onClick={() => swiperRef.current?.slideNext()}
        >
          Next (Right)
        </Button>
      </div>
      <div css={tw`mx-auto sm:w-1/2 w-full mt-4`}>
        <Button isBlock onClick={() => onStart(generation)}>
          Start (Enter)
        </Button>
      </div>
      <div css={tw`mx-auto sm:w-1/2 w-full mt-4`}>
        <Button
          isBlock
          color="secondary"
          onClick={() => onNavigateToLeaderBoard()}
        >
          Leaderboard
        </Button>
      </div>
      <AnimatePresence>
        <Fragment key={generation}>
          {shuffle(generationMons)
            .slice(0, 50)
            .map((mon, idx) => {
              const src = mon.image
              return <RainItem key={`${src}_${idx}`} src={src} />
            })}
        </Fragment>
      </AnimatePresence>
    </div>
  )
}

SelectGeneration.displayName = 'SelectGeneration'

export default SelectGeneration
