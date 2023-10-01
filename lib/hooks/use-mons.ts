import { useCallback, useEffect, useMemo } from 'react'
import { flatten, shuffle } from 'lodash-es'
import { useRecoilState } from 'recoil'
import useAllMons from './use-all-mons'
import stackedMonImagesState from '../store/stacked-mon-images-state'
import currentMonState from '../store/current-mon-state'
import achievedMonsState from '../store/achieved-mons-state'
import { Mon } from '../types'

const useMons = () => {
  const { allMons } = useAllMons()

  const [stackedMonImages, setStackedMonImages] = useRecoilState(
    stackedMonImagesState,
  )

  const [achievedMons, setAchievedMons] = useRecoilState(achievedMonsState)

  const [currentMon, setCurrentMon] = useRecoilState(currentMonState)

  const flattenStackedMonImages = useMemo(() => {
    return flatten(stackedMonImages)
  }, [stackedMonImages])

  const shuffledMons = useMemo(() => {
    return shuffle(allMons)
  }, [allMons])

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

  const pushStackedMonImage = useCallback(
    (monImage: string, columnIndex: number) => {
      const newStackedMonImages = [...stackedMonImages]
      const oldColumnArray = stackedMonImages[columnIndex]
      const newColumnArray = [...oldColumnArray, monImage]
      newStackedMonImages[columnIndex] = newColumnArray
      setStackedMonImages(newStackedMonImages)
    },
    [setStackedMonImages, stackedMonImages],
  )

  const pushAchievedMon = useCallback(
    (monParam: Mon) => {
      setAchievedMons((oldAchievedMons) => [
        ...oldAchievedMons,
        allMons.find((mon) => mon.id === monParam.id) as Mon,
      ])
    },
    [allMons, setAchievedMons],
  )

  const resetMons = useCallback(() => {
    setStackedMonImages([[], [], [], [], [], []])
    setAchievedMons([])
    setCurrentMon(undefined)
  }, [setAchievedMons, setCurrentMon, setStackedMonImages])

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
    pushStackedMonImage,
    resetMons,
    allMons,
    isGameOver,
  }
}

export default useMons
