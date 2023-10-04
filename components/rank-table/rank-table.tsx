import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useIsMobile from '@/lib/hooks/use-is-mobile'
import { Rank } from '@/lib/types'
import classNames from 'classnames'
import Link from 'next/link'
import AnimatedNumber from 'react-awesome-animated-number'
import { useIntersectionObserver } from 'usehooks-ts'
import CertificateModal from '../certificate-modal'
import useAllMons from '@/lib/hooks/use-all-mons'

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

  const [selectedRank, setSelectedRank] = useState<Rank | undefined>(undefined)
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false)

  const { allMons } = useAllMons()

  const isMobile = useIsMobile()

  const entry = useIntersectionObserver(endRef, {
    rootMargin: '0px 0px 20%',
  })

  const ROW_CLASSNAMES = useMemo(() => {
    return [
      'w-1/12',
      isMobile ? 'w-1/6' : 'w-1/4',
      'w-1/6 justify-end',
      'w-1/12 justify-end',
      'w-1/12 justify-end',
      'w-1/12 justify-end',
      'w-1/12 justify-end',
      'w-1/12 justify-end',
      'w-1/12 justify-end',
    ]
  }, [isMobile])

  const openCertificateModal = useCallback((rank: Rank) => {
    setSelectedRank(rank)
    setIsCertificateModalOpen(true)
  }, [])

  const closeCertificateModal = useCallback(() => {
    setIsCertificateModalOpen(false)
  }, [])

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      onLoadNextPage()
    }
  }, [entry?.isIntersecting, hasNextPage, onLoadNextPage])

  const Row = useCallback(
    ({ item, className }: { item: RankItem; className?: string }) => {
      return isMobile ? (
        <div
          className={classNames(
            'flex w-full gap-2 flex-row items-start text-sm py-4 border-b border-gray-300',
            className,
          )}
          onClick={() => openCertificateModal(item)}
        >
          <div className="text-primary w-14">{item.seq.toLocaleString()}</div>
          <div className="flex flex-col gap-2 w-full">
            <div>{item.name}</div>
            <div className="flex flex-row justify-between">
              <div className="text-secondary">Score</div>
              <div className="text-primary" css={{ zIndex: -1 }}>
                <AnimatedNumber value={item.score} hasComma size={16} />
              </div>
            </div>
            <div className="flex flex-row gap-8">
              <div className="flex flex-row justify-between w-full">
                <div className="text-secondary">Generation</div>
                <div>{item.generation === 0 ? 'All' : item.generation}</div>
              </div>
              <div className="flex flex-row justify-between w-full">
                <div className="text-secondary">Gotcha</div>
                <div>{item.gotcha.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex flex-row gap-8">
              <div className="flex flex-row justify-between w-full">
                <div className="text-secondary">Max Combo</div>
                <div>{item.maxCombo.toLocaleString()}</div>
              </div>
              <div className="flex flex-row justify-between w-full">
                <div className="text-secondary">Accuracy</div>
                <div>
                  {item.accuracy}
                  <span className="text-gray-400 text-xs">%</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-8">
              <div className="flex flex-row justify-between w-full">
                <div className="text-secondary">Avg Spd</div>
                <div>
                  {item.avgSpeed.toLocaleString()}
                  <span className="text-gray-400 text-xs">wpm</span>
                </div>
              </div>
              <div className="flex flex-row justify-between w-full">
                <div className="text-secondary">Max Spd</div>
                <div>
                  {item.maxSpeed.toLocaleString()}
                  <span className="text-gray-400 text-xs">wpm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          role="row"
          className={classNames(
            'flex flex-row p-2 h-20 gap-2 items-center hover:bg-gray-100 cursor-pointer',
            className,
          )}
          onClick={() => openCertificateModal(item)}
        >
          {ROW_CLASSNAMES.map((className, idx) => {
            const records = [
              item.seq.toLocaleString(),
              item.name,
              <div key="score">
                <AnimatedNumber value={item.score} hasComma size={16} />
              </div>,
              item.generation === 0 ? 'All' : item.generation,
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
              'text-primary',
              '',
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
    [ROW_CLASSNAMES, isMobile, openCertificateModal],
  )

  return (
    <div role="table" className="w-full max-w-6xl mx-4">
      <div className="flex flex-col bg-white top-0 sticky gap-8 pt-4 pb-4 sm:pb-0 z-10">
        <h1 className="text-2xl sm:text-4xl">
          <Link href="/" className="text-primary hover:text-blue-600">
            Pokédrops
          </Link>{' '}
          Leaderboard
        </h1>
        {!isMobile && (
          <div
            role="row"
            className="flex w-full flex-row p-2 border-b border-gray-400 text-secondary text-xs gap-2"
          >
            {ROW_CLASSNAMES.map((className, idx) => {
              const labels = [
                'RANK',
                'NAME',
                'SCORE',
                'GENERATION',
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
        )}
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
      {!!allMons && (
        <CertificateModal
          isOpen={isCertificateModalOpen}
          onClose={closeCertificateModal}
          allMons={allMons}
          rank={selectedRank!}
        />
      )}
    </div>
  )
}

RankTable.displayName = 'RankTable'

export default RankTable
