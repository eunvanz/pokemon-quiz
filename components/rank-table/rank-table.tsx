import { useIntersectionObserver } from '@uidotdev/usehooks'
import Link from 'next/link'
import { useEffect } from 'react'
import tw from 'twin.macro'

export interface RankItem {
  id: number
  seq: number
  name: string
  score: number
  maxCombo: number
  gotcha: number
  generation: number
  country: string
}

export interface RankTableProps {
  items?: RankItem[]
  isLoading: boolean
  onLoadNextPage: VoidFunction
  isLoadingNextPage: boolean
  hasNextPage: boolean
}

const RankTable: React.FC<RankTableProps> = ({
  items,
  onLoadNextPage,
  isLoadingNextPage,
  hasNextPage,
}) => {
  const [ref, entry] = useIntersectionObserver<HTMLDivElement>()

  useEffect(() => {
    if (entry?.isIntersecting && !isLoadingNextPage && hasNextPage) {
      onLoadNextPage()
    }
  }, [entry?.isIntersecting, hasNextPage, isLoadingNextPage, onLoadNextPage])

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
          <div className="flex w-1/12">RANK</div>
          <div className="flex w-1/4">NAME</div>
          <div className="flex w-1/6">COUNTRY</div>
          <div className="flex w-1/6 justify-end">GENERATION</div>
          <div className="flex w-1/6 justify-end">SCORE</div>
          <div className="flex w-1/12 justify-end">GOTCHA</div>
          <div className="flex w-1/12 justify-end">MAX COMBO</div>
        </div>
      </div>
      {items?.map((item) => (
        <div
          key={item.id}
          role="row"
          className="flex w-full flex-row p-2 h-20 gap-2 items-center hover:bg-gray-100"
        >
          <div className="flex w-1/12 text-sm text-primary">
            {item.seq.toLocaleString()}
          </div>
          <div className="flex w-1/4 text-sm">{item.name}</div>
          <div className="flex w-1/6 text-sm">{item.country}</div>
          <div className="flex w-1/6 justify-end">
            {item.generation === 0 ? 'All' : item.generation}
          </div>
          <div className="flex w-1/6 justify-end text-primary">
            {item.score.toLocaleString()}
          </div>
          <div className="flex w-1/12 justify-end">
            {item.gotcha.toLocaleString()}
          </div>
          <div className="flex w-1/12 justify-end">
            {item.maxCombo.toLocaleString()}
          </div>
        </div>
      ))}
      {hasNextPage && !isLoadingNextPage && (
        <div ref={ref} className="w-full h-4" />
      )}
    </div>
  )
}

RankTable.displayName = 'RankTable'

export default RankTable
