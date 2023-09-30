import { useIntersectionObserver } from '@uidotdev/usehooks'
import Link from 'next/link'
import { useCallback, useEffect, useMemo } from 'react'
import classNames from 'classnames'

export interface RankItem {
  id: number
  seq: number
  name: string
  score: number
  maxCombo: number
  gotcha: number
  generation: number
  country: string
  avgSpeed: number
  maxSpeed: number
}

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
  const [ref, entry] = useIntersectionObserver<HTMLDivElement>()

  const ROW_CLASSNAMES = useMemo(() => {
    return [
      'w-1/12',
      'w-1/4',
      'w-1/6',
      'w-1/6 justify-end',
      'w-1/6 justify-end',
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
            'flex w-full flex-row p-2 h-20 gap-2 items-center hover:bg-gray-100',
            className,
          )}
        >
          {ROW_CLASSNAMES.map((className, idx) => {
            const records = [
              item.seq.toLocaleString(),
              item.name,
              item.country,
              item.generation === 0 ? 'All' : item.generation,
              item.score.toLocaleString(),
              item.gotcha.toLocaleString(),
              item.maxCombo.toLocaleString(),
              item.avgSpeed,
              item.maxSpeed,
            ]
            const additionalClassName = [
              'text-primary',
              'text-sm',
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
                  `flex ${className}`,
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
              'COUNTRY',
              'GENERATION',
              'SCORE',
              'GOTCHA',
              'MAX COMBO',
              'AVG SPEED',
              'MAX SPEED',
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
        <div ref={ref} className="w-full h-4" />
      )}
      {myRank && (
        <div className="sticky bottom-0 w-full border-t border-gray-400 bg-blue-100">
          <Row item={myRank} />
        </div>
      )}
    </div>
  )
}

RankTable.displayName = 'RankTable'

export default RankTable
