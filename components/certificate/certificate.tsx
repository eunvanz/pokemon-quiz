import { Mon, Rank } from '@/lib/types'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Fragment, PropsWithChildren, useMemo, useState } from 'react'
import RainItem from '../rain-item'

export interface CertificateProps {
  rank: Rank
  allMons: Mon[]
}

const Certificate: React.FC<CertificateProps> = ({ rank, allMons }) => {
  const [dropCount, setDropCount] = useState(0)

  const gotchaMons = useMemo(() => {
    return allMons.filter((mon) => rank.gotchaMons.includes(mon.id))
  }, [allMons, rank.gotchaMons])

  return (
    <div
      className="w-full max-w-sm"
      onClick={() => setDropCount((count) => ++count)}
    >
      <h1 className="text-4xl text-center">
        <Link href="/" className="text-primary">
          Pokédrops
        </Link>{' '}
        Certificate
      </h1>
      <div className="flex flex-col gap-2 justify-center mt-4">
        <div className="text-center text-secondary mb-4">
          Pokédrops certifies that you have:
        </div>
        <Row label="Name">{rank.name}</Row>
        <Row label="Country">{rank.country}</Row>
        <Row label="Rank">{rank.seq}</Row>
        <Row label="Score">{rank.score.toLocaleString()}</Row>
        <Row label="Generation">
          {rank.generation === 0 ? 'All' : rank.generation}
        </Row>
        <Row label="Gotcha">{rank.gotcha}</Row>
        <Row label="Max Combo">{rank.maxCombo}</Row>
        <Row label="Avg. Speed">
          {rank.avgSpeed}
          <span className="text-secondary text-xs">wpm</span>
        </Row>
        <Row label="Max Speed">
          {rank.maxSpeed}
          <span className="text-secondary text-xs">wpm</span>
        </Row>
        <Row label="Accuracy">
          {rank.accuracy}
          <span className="text-secondary text-xs">%</span>
        </Row>
      </div>
      <AnimatePresence>
        <Fragment key={dropCount}>
          {gotchaMons.map((mon, idx) => (
            <RainItem key={idx} src={mon.image} />
          ))}
        </Fragment>
      </AnimatePresence>
    </div>
  )
}

interface RowProps {
  label: string
}

const Row: React.FC<PropsWithChildren<RowProps>> = ({ label, children }) => {
  return (
    <div className="flex flex-row justify-between">
      <div>{label}</div>
      <div className="text-primary">{children}</div>
    </div>
  )
}

export default Certificate
