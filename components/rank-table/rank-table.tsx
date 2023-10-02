import { useIntersectionObserver } from 'usehooks-ts'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import classNames from 'classnames'
import { Rank } from '@/lib/types'
import AnimatedNumber from 'react-awesome-animated-number'

export interface RankItem extends Rank {}

export interface RankTableProps {
  items?: RankItem[]
  isLoading: boolean
  onLoadNextPage: VoidFunction
  isLoadingNextPage: boolean
  hasNextPage: boolean
  myRank?: RankItem
}

const RankTable: React.FC<RankTableProps> = ({
  items,
  onLoadNextPage,
  isLoadingNextPage,
  hasNextPage,
  myRank,
}) => {
  const endRef = useRef<HTMLDivElement | null>(null)

  const entry = useIntersectionObserver(endRef, {})

  const ROW_CLASSNAMES = useMemo(() => {
    return [
      'w-1/12',
      'w-1/4',
      'w-1/12 justify-end',
      'w-1/6 justify-end',
      'w-1/12 justify-end',
      'w-1/12 justify-end',
      'w-1/12 justify-end',
      'w-1/12 justify-end',
      'w-1/12 justify-end',
    ]
  }, [])

  useEffect(() => {
    if (entry?.isIntersecting && !isLoadingNextPage && hasNextPage) {
      onLoadNextPage()
    }
  }, [entry?.isIntersecting, hasNextPage, isLoadingNextPage, onLoadNextPage])

  const Row = useCallback(
    ({ item, className }: { item: RankItem; className?: string }) => {
      return (
        <div
          role="row"
          className={classNames(
            'flex w-full flex-row p-2 h-20 gap-2 items-center',
            className,
          )}
        >
          {ROW_CLASSNAMES.map((className, idx) => {
            const records = [
              item.seq.toLocaleString(),
              item.name,
              item.generation === 0 ? 'All' : item.generation,
              <div key="score" css={{ zIndex: -1 }}>
                <AnimatedNumber value={item.score} hasComma size={16} />
              </div>,
              item.gotcha.toLocaleString(),
              item.maxCombo.toLocaleString(),
              <>
                <div>{item.avgSpeed}</div>
                <div className="text-gray-400 text-xs">wpm</div>
              </>,
              <>
                <div>{item.maxSpeed}</div>
                <div className="text-gray-400 text-xs">wpm</div>
              </>,
              <>
                <div>{item.accuracy}</div>
                <div className="text-gray-400 text-xs">%</div>
              </>,
            ]
            const additionalClassName = [
              'text-primary',
              'text-sm',
              '',
              'text-primary',
              '',
              '',
              '',
              '',
            ]
            return (
              <div
                key={idx}
                className={[
                  `flex items-center ${className}`,
                  `${additionalClassName[idx]}`,
                ].join(' ')}
              >
                {records[idx]}
              </div>
            )
          })}
        </div>
      )
    },
    [ROW_CLASSNAMES],
  )

  return (
    <div role="table" className="w-full max-w-6xl mx-4">
      <div className="flex flex-col bg-white top-0 sticky gap-8 pt-4">
        <h1 className="text-4xl">
          <Link href="/" className="text-primary hover:text-blue-600">
            Pokédrops
          </Link>{' '}
          Leaderboard
        </h1>
        <div
          role="row"
          className="flex w-full flex-row p-2 border-b border-gray-400 text-secondary text-xs gap-2"
        >
          {ROW_CLASSNAMES.map((className, idx) => {
            const labels = [
              'RANK',
              'NAME',
              'GENERATION',
              'SCORE',
              'GOTCHA',
              'MAX COMBO',
              'AVG SPEED',
              'MAX SPEED',
              'ACCURACY',
            ]
            return (
              <div key={idx} className={`flex ${className}`}>
                {labels[idx]}
              </div>
            )
          })}
        </div>
      </div>
      {items?.map((item) => <Row key={item.id} item={item} />)}
      {hasNextPage && !isLoadingNextPage && (
        <div ref={endRef} className="w-full h-4" />
      )}
      {!!myRank && (
        <div className="sticky bottom-0 w-full border-t border-gray-400 bg-blue-100">
          <Row item={myRank} />
        </div>
      )}
    </div>
  )
}

RankTable.displayName = 'RankTable'

export default RankTable
