'use client'

import { GameController } from '@/lib/hooks/use-game-controller'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import tw from 'twin.macro'
import Combo from '@/components/combo'
import GameOver from '@/components/game-over'
import GameOverNext from '@/components/game-over-next'
import MonNameInput from '@/components/mon-name-input'
import OverlaidGameGrid from '@/components/overlaid-game-grid'
import Ready from '@/components/ready'
import Score from '@/components/score'
import TargetMon from '@/components/target-mon'
import { motion } from 'framer-motion'
import { motionVariants } from '@/lib/helpers/framer'
import { checkIsSSR } from '@/lib/helpers/common'
import useIsMobile from '@/lib/hooks/use-is-mobile'
import useI18n from '@/lib/hooks/use-i18n'

export interface GamePanelProps extends GameController {}

const GamePanel: React.FC<GamePanelProps> = ({
  currentMon,
  currentColumn,
  duration,
  stackedMonImages,
  onStack,
  score,
  combo,
  answers,
  onSkip,
  onSuccess,
  nextMonImage,
  isGameOver,
  answerMon,
  updateAnswerMon,
  onNext,
  maxCombo,
  achievedMons,
  animation,
  typingSpeed,
  accuracy,
  onFail,
  bonusScore,
  gameMode,
}) => {
  const i18n = useI18n()

  const monImageRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isMobile = useIsMobile()

  const [isStarted, setIsStarted] = useState(false)

  const handleOnSuccess = useCallback(async () => {
    const $monImg = monImageRef.current
    if (!checkIsSSR() && $monImg) {
      const clientRect = $monImg.getClientRects()[0]
      const { burstStar } = await import('@/lib/helpers/mojs')
      burstStar({
        top: clientRect.top + clientRect.height / 2 + window.scrollY,
        left: clientRect.left + clientRect.width / 2,
        color: ['#F59E0B', '#3B82F6', '#DB2777', '#7C3AED'],
        count: 16,
        radius: { [clientRect.width / 3]: clientRect.width },
        degree: 360,
        opacity: { 1: 0 },
        itemRadius: 8,
      })
    }
    onSuccess()
  }, [onSuccess])

  const [isGameOverScreenVisible, setIsGameOverScreenVisible] = useState(false)

  const monNames = useMemo(() => {
    if (isGameOver) {
      return answerMon?.names
    } else if (gameMode === 'practice') {
      return currentMon?.names
    } else {
      return undefined
    }
  }, [answerMon?.names, currentMon?.names, gameMode, isGameOver])

  useEffect(() => {
    if (isGameOver) {
      setIsGameOverScreenVisible(true)
    }
  }, [isGameOver])

  const currentMonImage = currentMon?.image

  useEffect(() => {
    if (!currentMonImage && achievedMons.length > 0) {
      setIsGameOverScreenVisible(true)
    }
  }, [achievedMons.length, currentMonImage])

  const targetMon = useMemo(() => {
    return (
      <TargetMon
        ref={monImageRef}
        mon={isGameOver ? answerMon : currentMon}
        nextMonImage={nextMonImage}
        monNames={monNames}
      />
    )
  }, [answerMon, currentMon, isGameOver, monNames, nextMonImage])

  const monNameInput = useMemo(() => {
    return isGameOver ? (
      <GameOverNext onNext={onNext} />
    ) : (
      <MonNameInput
        ref={inputRef}
        correctAnswers={answers}
        onSkip={onSkip}
        onSubmit={handleOnSuccess}
        onFail={onFail}
      />
    )
  }, [answers, handleOnSuccess, isGameOver, onFail, onNext, onSkip])

  return (
    <>
      <Ready
        onStart={() => {
          setIsStarted(true)
          inputRef.current?.focus()
        }}
      />
      <motion.div
        css={tw`flex flex-col justify-center items-center w-full h-screen p-4 gap-4`}
        onClick={() => inputRef.current?.focus()}
        animate={animation}
        variants={motionVariants}
      >
        <div className="flex justify-center items-center w-full">
          <OverlaidGameGrid
            currentColumn={currentColumn}
            stackedMonImages={stackedMonImages}
            duration={duration}
            currentMonImage={isStarted ? currentMonImage : undefined}
            onStack={onStack}
            onClickMon={isGameOver ? updateAnswerMon : undefined}
          />
          <div className="ml-4 flex flex-col justify-between gap-2 sm:gap-4 w-full max-w-sm">
            <div css={tw`flex flex-col gap-1 sm:gap-2`}>
              <Score
                label={i18n.t('common.score')}
                count={score}
                diff={bonusScore}
              />
              <Score
                label={i18n.t('common.gotcha')}
                count={achievedMons.length}
              />
              <Score
                label={i18n.t('common.maxCombo')}
                count={maxCombo > 1 ? maxCombo : 0}
              />
              <Score
                label={i18n.t('common.avgSpeed')}
                count={typingSpeed.avg}
                unit="wpm"
              />
              <Score
                label={i18n.t('common.maxSpeed')}
                count={typingSpeed.max}
                unit="wpm"
              />
              <Score
                label={i18n.t('common.lastSpeed')}
                count={typingSpeed.last}
                unit="wpm"
              />
              <Score
                label={i18n.t('common.accuracy')}
                count={accuracy}
                unit="%"
              />
            </div>
            <Combo count={combo} />
            <div>
              <div css={tw`my-1 sm:my-4`}>{targetMon}</div>
              {!isMobile && monNameInput}
            </div>
          </div>
        </div>
        {isMobile && monNameInput}
      </motion.div>
      <GameOver
        isVisible={isGameOverScreenVisible}
        onHide={() => setIsGameOverScreenVisible(false)}
        onCheckRank={onNext}
        hasWrongAnswers={stackedMonImages.length > 0}
        isClear={!nextMonImage}
      />
    </>
  )
}

export default GamePanel
