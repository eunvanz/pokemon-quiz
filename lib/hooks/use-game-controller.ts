import { useCallback, useEffect, useMemo, useState } from 'react'
import { random } from 'lodash-es'
import { Mon } from '../types'
import useAnswerMon from './use-answer-mon'
import useCombo from './use-combo'
import useMonImages from './use-mon-images'
import useScore from './use-score'
import useStage from './use-stage'

export interface GameController {
  duration: number
  onStack: VoidFunction
  onSuccess: VoidFunction
  resetGame: VoidFunction
  currentMonImage?: string
  nextMonImage?: string
  currentColumn: number
  stackedMonImages: string[][]
  achievedMonImages: string[]
  combo: number
  score: number
  answers: string[]
  onSkip: VoidFunction
  isGameOver: boolean
  answerMon?: Mon
  updateAnswerMon: (monImage: string) => void
  onNext: VoidFunction
  maxCombo: number
}

export const INITIAL_DURATION = 20
const MIN_DURATION = 2

const useGameController: () => GameController = () => {
  const [duration, setDuration] = useState(INITIAL_DURATION)

  const [currentColumn, setCurrentColumn] = useState(random(0, 5))

  const { stage } = useStage()

  const { combo, resetCombo, incrementCombo, maxCombo, resetMaxCombo } =
    useCombo()

  const { score, increaseScore, resetScore } = useScore()

  const [startTime, setStartTime] = useState(0)

  const {
    currentMonImage,
    nextMonImage,
    pushAchievedMonImage,
    pushStackedMonImage,
    achievedMonImages,
    resetMonImages,
    stackedMonImages,
    allMons,
    isGameOver,
  } = useMonImages()

  const { answerMon, setAnswerMon } = useAnswerMon()

  const answers = useMemo(() => {
    return (
      allMons?.find((mon) => mon.image === currentMonImage)?.names.split(',') ||
      []
    )
  }, [allMons, currentMonImage])

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
    if (allMons?.length && stage > 0) {
      const total = allMons.length
      const stageRatio = Math.min(stage / Math.min(total, 200), 1)
      const durationInterval = INITIAL_DURATION - MIN_DURATION
      const currentDuration = INITIAL_DURATION - durationInterval * stageRatio
      setDuration(currentDuration)
    }
  }, [allMons?.length, stage])

  const onStack = useCallback(() => {
    if (currentMonImage) {
      pushStackedMonImage(currentMonImage, currentColumn)
      resetCombo()
    }
  }, [currentMonImage, pushStackedMonImage, currentColumn, resetCombo])

  const onSuccess = useCallback(() => {
    if (currentMonImage) {
      pushAchievedMonImage(currentMonImage)
      const wastedTime = Date.now() - startTime
      increaseScore(wastedTime, combo)
      incrementCombo()
    }
  }, [
    currentMonImage,
    pushAchievedMonImage,
    startTime,
    increaseScore,
    combo,
    incrementCombo,
  ])

  const resetGame = useCallback(() => {
    resetMonImages()
    setDuration(INITIAL_DURATION)
    resetCombo()
    resetScore()
    resetMaxCombo()
  }, [resetMonImages, resetCombo, resetScore, resetMaxCombo])

  const onSkip = useCallback(() => {
    onStack()
  }, [onStack])

  useEffect(() => {
    changeCurrentColumn()
    changeDuration()
    setStartTime(Date.now())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonImage])

  const updateAnswerMon = useCallback(
    (monImage: string) => {
      const mon = allMons?.find((mon) => mon.image === monImage)
      setAnswerMon(mon)
    },
    [allMons, setAnswerMon],
  )

  const onNext = useCallback(() => {}, [])

  useEffect(() => {
    return () => {
      resetGame()
    }
  }, [resetGame])

  return {
    duration,
    currentColumn,
    currentMonImage,
    stackedMonImages,
    achievedMonImages,
    onStack,
    onSuccess,
    resetGame,
    score,
    combo,
    answers,
    onSkip,
    nextMonImage,
    isGameOver,
    answerMon,
    updateAnswerMon,
    onNext,
    maxCombo,
  }
}

export default useGameController
