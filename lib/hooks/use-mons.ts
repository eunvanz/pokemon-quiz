import { useCallback, useEffect, useMemo } from 'react'
import { flatten, shuffle } from 'lodash-es'
import { useRecoilState } from 'recoil'
import useAllMons from './use-all-mons'
import stackedMonsState from '../store/stacked-mons-state'
import currentMonState from '../store/current-mon-state'
import achievedMonsState from '../store/achieved-mons-state'
import { Mon } from '../types'

const useMons = () => {
  const { generationMons } = useAllMons()

  const [stackedMons, setStackedMons] = useRecoilState(stackedMonsState)

  const [achievedMons, setAchievedMons] = useRecoilState(achievedMonsState)

  const [currentMon, setCurrentMon] = useRecoilState(currentMonState)

  const stackedMonImages = useMemo(() => {
    return stackedMons.map((mons) => mons.map((mon) => mon.image))
  }, [stackedMons])

  const flattenStackedMons = useMemo(() => {
    return flatten(stackedMons)
  }, [stackedMons])

  const flattenStackedMonImages = useMemo(() => {
    return flattenStackedMons.map((mon) => mon.image)
  }, [flattenStackedMons])

  const shuffledMons = useMemo(() => {
    return shuffle(generationMons)
  }, [generationMons])

  const nextMonImage = useMemo(() => {
    return shuffledMons[
      flattenStackedMonImages.length + achievedMons.length + 1
    ]?.image
  }, [shuffledMons, flattenStackedMonImages, achievedMons])

  const isGameOver = useMemo(() => {
    return (
      stackedMonImages.some((array) => array.length === 12) || !nextMonImage
    )
  }, [nextMonImage, stackedMonImages])

  const pushStackedMon = useCallback(
    (mon: Mon, columnIndex: number) => {
      const newStackedMons = [...stackedMons]
      const oldColumnArray = stackedMons[columnIndex]
      const newColumnArray = [...oldColumnArray, mon]
      newStackedMons[columnIndex] = newColumnArray
      setStackedMons(newStackedMons)
    },
    [setStackedMons, stackedMons],
  )

  const pushAchievedMon = useCallback(
    (monParam: Mon) => {
      setAchievedMons((oldAchievedMons) => [
        ...oldAchievedMons,
        generationMons?.find((mon) => mon.id === monParam.id) as Mon,
      ])
    },
    [generationMons, setAchievedMons],
  )

  const resetMons = useCallback(() => {
    setStackedMons([[], [], [], [], [], []])
    setAchievedMons([])
    setCurrentMon(undefined)
  }, [setAchievedMons, setCurrentMon, setStackedMons])

  useEffect(() => {
    if (
      !isGameOver &&
      flattenStackedMonImages.length + achievedMons.length < shuffledMons.length
    ) {
      setCurrentMon(
        shuffledMons[flattenStackedMonImages.length + achievedMons.length],
      )
    } else {
      setCurrentMon(undefined)
    }
  }, [
    shuffledMons,
    flattenStackedMonImages,
    isGameOver,
    setCurrentMon,
    achievedMons.length,
  ])

  return {
    nextMonImage,
    currentMon,
    stackedMonImages,
    achievedMons,
    pushAchievedMon,
    pushStackedMon,
    resetMons,
    generationMons,
    isGameOver,
    flattenStackedMons,
  }
}

export default useMons
