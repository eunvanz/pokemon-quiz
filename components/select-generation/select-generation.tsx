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
import { GameMode } from '@/lib/store/game-mode-state'
import useI18n from '@/lib/hooks/use-i18n'
import Select from '../select'

export interface SelectGenerationProps {
  onStart: (gameMode: GameMode) => void
  onNavigateToLeaderBoard: VoidFunction
  mons: Mon[]
  onChangeGeneration: (generation: Generation) => void
  locale: string
  onChangeLocale: (locale: string) => void
}

const SelectGeneration: React.FC<SelectGenerationProps> = ({
  onStart,
  onNavigateToLeaderBoard,
  mons,
  onChangeGeneration,
  locale,
  onChangeLocale,
}) => {
  const i18n = useI18n()

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
      if (e.code === 'ArrowLeft') {
        swiperRef.current?.slidePrev()
      } else if (e.code === 'ArrowRight') {
        swiperRef.current?.slideNext()
      } else if (e.code === 'Enter') {
        onStart('normal')
      } else if (e.code === 'Space') {
        onStart('practice')
      }
    },
    [onStart],
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
    i18n.t('selectGeneration.allGenerations'),
    i18n.t('selectGeneration.1stGeneration'),
    i18n.t('selectGeneration.2ndGeneration'),
    i18n.t('selectGeneration.3rdGeneration'),
    i18n.t('selectGeneration.4thGeneration'),
    i18n.t('selectGeneration.5thGeneration'),
    i18n.t('selectGeneration.6thGeneration'),
    i18n.t('selectGeneration.7thGeneration'),
    i18n.t('selectGeneration.8thGeneration'),
    i18n.t('selectGeneration.9thGeneration'),
  ]

  return (
    <div
      css={tw`relative flex flex-col h-screen w-full justify-center overflow-hidden p-4`}
    >
      <div css={tw`sm:text-2xl text-xl text-center text-primary animate-pulse`}>
        {i18n.t('selectGeneration.chooseGeneration')}
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
          {i18n.t('selectGeneration.previous')} (Left)
        </Button>
        <Button
          isBlock
          css={tw`ml-1`}
          variant="outlined"
          onClick={() => swiperRef.current?.slideNext()}
        >
          {i18n.t('selectGeneration.next')} (Right)
        </Button>
      </div>
      <div css={tw`mx-auto sm:w-1/2 w-full mt-4`}>
        <Button isBlock onClick={() => onStart('normal')}>
          {i18n.t('selectGeneration.start')} (Enter)
        </Button>
      </div>
      <div css={tw`mx-auto sm:w-1/2 w-full mt-4`}>
        <Button isBlock variant="outlined" onClick={() => onStart('practice')}>
          {i18n.t('selectGeneration.practice')} (Space bar)
        </Button>
      </div>
      <div css={tw`mx-auto sm:w-1/2 w-full mt-4`}>
        <Button
          isBlock
          color="secondary"
          onClick={() => onNavigateToLeaderBoard()}
        >
          {i18n.t('selectGeneration.leaderboard')}
        </Button>
      </div>
      <div className="fixed top-4 right-4 w-60 sm:w-80">
        <Select
          options={[
            {
              label: 'Language: English',
              value: 'en',
            },
            {
              label: '언어: 한국어',
              value: 'ko',
            },
            {
              label: '言語: 日本語',
              value: 'ja',
            },
            {
              label: '言語: 中国言',
              value: 'zh',
            },
            {
              label: 'langue: Français',
              value: 'fr',
            },
            {
              label: 'idioma: Español',
              value: 'es',
            },
            {
              label: 'linguagem: Português',
              value: 'pt',
            },
          ]}
          value={locale}
          onChange={onChangeLocale}
        />
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
