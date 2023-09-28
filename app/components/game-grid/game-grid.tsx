'use client'

import { useMemo } from 'react'
import tw from 'twin.macro'

export interface GameGridProps {
  width: number
  gridItemSize: number
}

const GameGrid: React.FC<GameGridProps> = ({ width, gridItemSize }) => {
  const gridItemCss = useMemo(() => {
    return [
      tw`border-gray-200 border-solid border-0 border-t border-r h-full`,
      {
        [`&:nth-of-type(${gridItemSize}n + 1)`]: tw`border-l`,
        [`&:nth-of-type(n + ${
          gridItemSize ** 2 * 2 - gridItemSize + 1
        })`]: tw`border-b`,
      },
    ]
  }, [gridItemSize])

  return (
    <div
      css={[
        {
          display: 'grid',
          gridTemplateColumns: `repeat(${gridItemSize}, 1fr)`,
          width,
          height: width * 2,
        },
      ]}
      data-testid="game-grid-container"
    >
      {Array.from({ length: gridItemSize ** 2 * 2 }).map((_, idx) => (
        <div css={gridItemCss} key={idx} />
      ))}
    </div>
  )
}

export default GameGrid
