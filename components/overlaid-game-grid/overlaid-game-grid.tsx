'use client'

import {
  forwardRef,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import {
  AnimatePresence,
  AnimationControls,
  motion,
  useMotionValue,
} from 'framer-motion'
import tw from 'twin.macro'
import GameGrid from '../game-grid'
import {
  getPositionFrom2DArray,
  getStackedSizeFromStackedMonImages,
} from './overlaid-game-grid.helpers'
import { useWindowSize } from 'usehooks-ts'
import useIsMobile from '@/lib/hooks/use-is-mobile'

export interface OverlaidGameGridProps {
  currentMonImage?: string
  currentColumn?: number
  duration?: number
  stackedMonImages: string[][]
  onStack: VoidFunction
  monImageRef?: RefObject<HTMLImageElement>
  onClickMon?: (monImage: string) => void
  animation?: AnimationControls
}

const OverlaidGameGrid: React.FC<OverlaidGameGridProps> = ({
  currentMonImage,
  currentColumn,
  duration = 0,
  stackedMonImages,
  onStack,
  monImageRef,
  onClickMon,
}) => {
  const isMobile = useIsMobile()

  const windowSize = useWindowSize()

  const WIDTH = isMobile ? (windowSize.width * 2) / 5 - 16 : 300
  const GRID_ITEM_SIZE = 6
  const CELL_SIZE = WIDTH / GRID_ITEM_SIZE
  const HEIGHT = WIDTH * 2
  const TOTAL_GRID_COUNT = GRID_ITEM_SIZE ** 2 * 2

  const vibrationTimeout = useRef<number | null>()

  const stack = useCallback(() => {
    onStack()
  }, [onStack])

  const stackedSize = useMemo(() => {
    if (currentColumn !== undefined) {
      return getStackedSizeFromStackedMonImages(stackedMonImages, currentColumn)
    }
    return 0
  }, [currentColumn, stackedMonImages])

  useEffect(() => {
    if (currentMonImage && duration) {
      vibrationTimeout.current = window.setTimeout(
        stack,
        duration * 1000 -
          ((duration * 1000) / (GRID_ITEM_SIZE * 2)) * (stackedSize + 1) +
          100,
      )
      return () => {
        vibrationTimeout.current && clearTimeout(vibrationTimeout.current)
      }
    }
  }, [currentMonImage, duration, stackedSize, stack])

  return (
    <div css={tw`relative`}>
      <div css={[tw`absolute flex h-full w-full`, { width: WIDTH }]}>
        {Array.from({ length: GRID_ITEM_SIZE }).map((_, idx) => (
          <div key={idx} css={tw`h-full flex-1`}>
            <AnimatePresence>
              {currentMonImage && currentColumn === idx && (
                <MonImg
                  key={currentMonImage}
                  src={currentMonImage}
                  duration={duration}
                  penalty={getStackedSizeFromStackedMonImages(
                    stackedMonImages,
                    idx,
                  )}
                  cellSize={CELL_SIZE}
                  gridItemSize={GRID_ITEM_SIZE}
                  height={HEIGHT}
                  ref={monImageRef}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div
        css={[tw`absolute grid grid-cols-6 h-full w-full`, { width: WIDTH }]}
      >
        {Array.from({ length: TOTAL_GRID_COUNT }).map((_, idx) => {
          const { x, y } = getPositionFrom2DArray(
            GRID_ITEM_SIZE,
            TOTAL_GRID_COUNT - idx - 1,
          )
          const monImage = stackedMonImages[x]?.[y]

          return (
            <div key={idx} css={{ height: CELL_SIZE }}>
              {monImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  css={onClickMon ? tw`cursor-pointer` : undefined}
                  src={monImage}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  alt="mon image"
                  onClick={() => onClickMon?.(monImage)}
                />
              )}
            </div>
          )
        })}
      </div>
      <GameGrid gridItemSize={GRID_ITEM_SIZE} width={WIDTH} />
    </div>
  )
}

interface MonImgProps {
  src: string
  duration: number
  penalty: number
  height: number
  gridItemSize: number
  cellSize: number
}

const MonImg = forwardRef<HTMLImageElement, MonImgProps>(
  ({ src, duration, penalty, height, gridItemSize, cellSize }, ref) => {
    const MOVE_UNIT = height / (gridItemSize * 2)
    const monImgRef = useRef<HTMLImageElement | null>(null)
    const intervalRef = useRef<number | null>(null)

    const y = useMotionValue(0)

    useEffect(() => {
      const $monImg = monImgRef.current
      if ($monImg) {
        const interval = (duration * 1000) / (gridItemSize * 2)
        let repeat = 0
        intervalRef.current = window.setInterval(() => {
          repeat++
          y.set(MOVE_UNIT * repeat)
          if (
            repeat + 1 + penalty === gridItemSize * 2 &&
            intervalRef.current !== null
          ) {
            intervalRef.current && clearInterval(intervalRef.current)
          }
        }, interval)
      }
      return () => {
        intervalRef.current !== null && clearInterval(intervalRef.current)
      }
    }, [src, duration, y, penalty, gridItemSize, MOVE_UNIT])

    return (
      <div ref={monImgRef}>
        <motion.img
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          style={{ y }}
          transition={{
            ease: 'linear',
            duration: 0.2,
          }}
          css={tw`absolute transition-transform`}
          width={cellSize}
          src={src}
          alt="mon image"
          ref={ref}
        />
      </div>
    )
  },
)

OverlaidGameGrid.displayName = 'OverLaidGameGrid'
MonImg.displayName = 'MonImg'

export default OverlaidGameGrid
