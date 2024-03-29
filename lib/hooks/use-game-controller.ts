import { useCallback, useEffect, useMemo, useState } from 'react'
import { random } from 'lodash-es'
import { Mon } from '../types'
import useAnswerMon from './use-answer-mon'
import useCombo from './use-combo'
import useMons from './use-mons'
import useScore from './use-score'
import useStage from './use-stage'
import { AnimationControls, useAnimation } from 'framer-motion'
import { useRouter } from 'next/navigation'
import useTypingSpeed, { TypingSpeed } from './use-typing-speed'
import useAccuracy from './use-accuracy'
import useGeneration from './use-generation'
import useGameMode from './use-game-mode'
import { GameMode } from '../store/game-mode-state'

export interface GameController {
  duration: number
  onStack: VoidFunction
  onSuccess: VoidFunction
  resetGame: VoidFunction
  currentMon?: Mon
  nextMonImage?: string
  currentColumn: number
  stackedMonImages: string[][]
  achievedMons: Mon[]
  combo: number
  score: number
  answers: string[]
  onSkip: VoidFunction
  isGameOver: boolean
  answerMon?: Mon
  updateAnswerMon: (monImage: string) => void
  onNext: VoidFunction
  maxCombo: number
  animation?: AnimationControls
  typingSpeed: TypingSpeed
  accuracy: number
  onFail: VoidFunction
  bonusScore?: number
  generation: number
  gameMode: GameMode
  setGameMode: (gameMode: GameMode) => void
}

export const INITIAL_DURATION = 20
const MIN_DURATION = 1.5

const useGameController: () => GameController = () => {
  const animation = useAnimation()

  const [duration, setDuration] = useState(INITIAL_DURATION)

  const [currentColumn, setCurrentColumn] = useState(random(0, 5))

  const { stage } = useStage()

  const { combo, resetCombo, incrementCombo, maxCombo, resetMaxCombo } =
    useCombo()

  const { score, increaseScore, resetScore, bonusScore } = useScore()

  const { typingSpeed, updateTypingSpeed, resetTypingSpeed } = useTypingSpeed()

  const { accuracy, updateAccuracy, resetAccuracy } = useAccuracy()

  const { generation } = useGeneration()

  const { gameMode, setGameMode } = useGameMode()

  const [startTime, setStartTime] = useState(0)

  const router = useRouter()

  const {
    currentMon,
    nextMonImage,
    pushAchievedMon,
    pushStackedMon,
    achievedMons,
    resetMons,
    stackedMonImages,
    generationMons,
    isGameOver,
  } = useMons()

  const { answerMon, setAnswerMon } = useAnswerMon()

  const answers = useMemo(() => {
    return (
      generationMons
        ?.find((mon) => mon.id === currentMon?.id)
        ?.names.split(',') || []
    )
  }, [generationMons, currentMon?.id])

  const changeCurrentColumn = useCallback(() => {
    const getDifferentColumn: () => number = () => {
      const nextColumn = random(0, 5)
      if (nextColumn === currentColumn) {
        return getDifferentColumn()
      }
      return nextColumn
    }
    setCurrentColumn(getDifferentColumn())
  }, [currentColumn])

  const changeDuration = useCallback(() => {
    if (generationMons?.length && stage > 0) {
      const total = generationMons.length
      const stageRatio = Math.min(stage / Math.min(total, 300), 1)
      const durationInterval = INITIAL_DURATION - MIN_DURATION
      const currentDuration = INITIAL_DURATION - durationInterval * stageRatio
      setDuration(currentDuration)
    }
  }, [generationMons?.length, stage])

  const onStack = useCallback(() => {
    animation.start('vibe')
    if (currentMon) {
      pushStackedMon(currentMon, currentColumn)
      resetCombo()
    }
  }, [animation, currentMon, pushStackedMon, currentColumn, resetCombo])

  const onSuccess = useCallback(() => {
    if (currentMon) {
      pushAchievedMon(currentMon)
      const wastedTime = Date.now() - startTime
      increaseScore(wastedTime, combo)
      incrementCombo()
      updateTypingSpeed({ wastedTime })
      updateAccuracy(true)
    }
  }, [
    currentMon,
    pushAchievedMon,
    startTime,
    increaseScore,
    combo,
    incrementCombo,
    updateTypingSpeed,
    updateAccuracy,
  ])

  const resetGame = useCallback(() => {
    resetMons()
    setDuration(INITIAL_DURATION)
    setAnswerMon(undefined)
    resetCombo()
    resetScore()
    resetMaxCombo()
    resetAccuracy()
    resetTypingSpeed()
  }, [
    resetMons,
    setAnswerMon,
    resetCombo,
    resetScore,
    resetMaxCombo,
    resetAccuracy,
    resetTypingSpeed,
  ])

  const onSkip = useCallback(() => {
    onStack()
  }, [onStack])

  const onFail = useCallback(() => {
    updateAccuracy(false)
  }, [updateAccuracy])

  useEffect(() => {
    changeCurrentColumn()
    changeDuration()
    setStartTime(Date.now())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMon])

  const updateAnswerMon = useCallback(
    (monImage: string) => {
      const mon = generationMons?.find((mon) => mon.image === monImage)
      setAnswerMon(mon)
    },
    [generationMons, setAnswerMon],
  )

  const onNext = useCallback(() => {
    router.replace('/leaderboard')
  }, [router])

  return {
    duration,
    currentColumn,
    currentMon,
    stackedMonImages,
    achievedMons,
    onStack,
    onSuccess,
    resetGame,
    score,
    bonusScore,
    combo,
    answers,
    onSkip,
    nextMonImage,
    isGameOver,
    answerMon,
    updateAnswerMon,
    onNext,
    maxCombo,
    animation,
    typingSpeed,
    accuracy,
    onFail,
    generation,
    gameMode,
    setGameMode,
  }
}

export default useGameController
