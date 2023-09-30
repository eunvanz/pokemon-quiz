'use client'

import { GameController } from '@/lib/hooks/use-game-controller'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import tw from 'twin.macro'
import Combo from '@/components/combo'
import GameOver from '@/components/game-over'
import GameOverNext from '@/components/game-over-next'
import MonNameInput from '@/components/mon-name-input'
import OverlaidGameGrid from '@/components/overlaid-game-grid'
import Ready from '@/components/ready'
import Score from '@/components/score'
import TargetMon from '@/components/target-mon'
import { burstStar } from '@/lib/helpers/mojs'
import { motion } from 'framer-motion'
import { motionVariants } from '@/lib/helpers/framer'

export interface GamePanelProps extends GameController {}

const GamePanel: React.FC<GamePanelProps> = ({
  currentMonImage,
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
  achievedMonImages,
  animation,
  typingSpeed,
  accuracy,
  onFail,
}) => {
  const monImageRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [isStarted, setIsStarted] = useState(false)

  const handleOnSuccess = useCallback(() => {
    const $monImg = monImageRef.current
    if ($monImg) {
      const clientRect = $monImg.getClientRects()[0]
      burstStar({
        top: clientRect.top + clientRect.height / 2,
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

  useEffect(() => {
    if (isGameOver) {
      setIsGameOverScreenVisible(true)
    }
  }, [isGameOver])

  useEffect(() => {
    if (!currentMonImage && achievedMonImages.length > 0) {
      setIsGameOverScreenVisible(true)
    }
  }, [achievedMonImages.length, currentMonImage])

  return (
    <>
      <Ready
        onStart={() => {
          setIsStarted(true)
          inputRef.current?.focus()
        }}
      />
      <motion.div
        css={tw`flex justify-center items-center w-full h-screen p-4`}
        onClick={() => inputRef.current?.focus()}
        animate={animation}
        variants={motionVariants}
      >
        <OverlaidGameGrid
          currentColumn={currentColumn}
          stackedMonImages={stackedMonImages}
          duration={duration}
          currentMonImage={isStarted ? currentMonImage : undefined}
          onStack={onStack}
          onClickMon={isGameOver ? updateAnswerMon : undefined}
        />
        <div css={tw`ml-4 flex flex-col justify-between gap-4`}>
          <div css={tw`flex flex-col gap-2`}>
            <Score label="Score" count={score} />
            <Score label="Gotcha" count={achievedMonImages.length} />
            <Score label="Max Combo" count={maxCombo > 1 ? maxCombo : 0} />
            <Score label="Avg. Speed" count={typingSpeed.avg} unit="wpm" />
            <Score label="Max Speed" count={typingSpeed.max} unit="wpm" />
            <Score label="Last Speed" count={typingSpeed.last} unit="wpm" />
            <Score label="Accuracy" count={accuracy} unit="%" />
          </div>
          <Combo count={combo} />
          <div>
            <div css={tw`my-4`}>
              <TargetMon
                ref={monImageRef}
                monImage={isGameOver ? answerMon?.image : currentMonImage}
                nextMonImage={nextMonImage}
                monNames={isGameOver ? answerMon?.names : undefined}
              />
            </div>
            {isGameOver ? (
              <GameOverNext onNext={onNext} />
            ) : (
              <MonNameInput
                ref={inputRef}
                correctAnswers={answers}
                onSkip={onSkip}
                onSubmit={handleOnSuccess}
                onFail={onFail}
              />
            )}
          </div>
        </div>
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
