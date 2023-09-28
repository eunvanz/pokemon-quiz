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
}) => {
  const monImageRef = useRef<HTMLImageElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [isStarted, setIsStarted] = useState(false)

  const handleOnSuccess = useCallback(() => {
    onSuccess()
  }, [onSuccess])

  const [isGameOverScreenVisible, setIsGameOverScreenVisible] = useState(false)

  useEffect(() => {
    if (isGameOver) {
      setIsGameOverScreenVisible(true)
    }
  }, [isGameOver])

  return (
    <>
      <Ready
        onStart={() => {
          setIsStarted(true)
          inputRef.current?.focus()
        }}
      />
      <div
        css={tw`flex justify-center items-center w-full h-screen p-4`}
        onClick={() => inputRef.current?.focus()}
      >
        <OverlaidGameGrid
          currentColumn={currentColumn}
          stackedMonImages={stackedMonImages}
          duration={duration}
          currentMonImage={isStarted ? currentMonImage : undefined}
          onStack={onStack}
          monImageRef={monImageRef}
          onClickMon={isGameOver ? updateAnswerMon : undefined}
        />
        <div css={tw`ml-4 flex flex-col justify-between gap-4`}>
          <div css={tw`flex flex-col gap-2`}>
            <Score label="Score" count={score} />
            <Score label="Gotcha" count={achievedMonImages.length} />
            <Score label="Max Combos" count={maxCombo > 1 ? maxCombo : 0} />
          </div>
          <Combo count={combo} />
          <div>
            <div css={tw`my-4`}>
              <TargetMon
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
              />
            )}
          </div>
        </div>
      </div>
      <GameOver
        isVisible={isGameOverScreenVisible}
        onHide={() => setIsGameOverScreenVisible(false)}
      />
    </>
  )
}

export default GamePanel
