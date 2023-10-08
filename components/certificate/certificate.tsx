import { Mon, Rank } from '@/lib/types'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Fragment, PropsWithChildren, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import RainItem from '../rain-item'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import Country from '../country'
import i18n from '@/lib/i18n'

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
    <div className="w-full max-w-sm">
      <h1 className="text-xl sm:text-4xl text-center text-black">
        <Link href="/" className="text-primary hover:text-blue-600">
          Pokédrops
        </Link>{' '}
        Certificate
      </h1>
      <div
        className="flex flex-col gap-2 justify-center mt-4 cursor-pointer text-sm sm:text-base"
        onClick={() => setDropCount((count) => ++count)}
      >
        <div className="text-center text-secondary mb-4">
          {i18n.t('certificate.certifies')}:
        </div>
        <Row label={i18n.t('common.name')}>{rank.name}</Row>
        <Row label={i18n.t('common.country')}>
          <Country country={rank.country} countryCode={rank.countryCode} />
        </Row>
        <Row label={i18n.t('common.rank')}>{rank.seq}</Row>
        <Row label={i18n.t('common.score')}>{rank.score.toLocaleString()}</Row>
        <Row label={i18n.t('common.generation')}>
          {rank.generation === 0 ? 'All' : rank.generation}
        </Row>
        <Row label={i18n.t('common.gotcha')}>{rank.gotcha}</Row>
        <Row label={i18n.t('common.maxCombo')}>{rank.maxCombo}</Row>
        <Row label={i18n.t('common.avgSpeed')}>
          {rank.avgSpeed}
          <span className="text-secondary text-xs">wpm</span>
        </Row>
        <Row label={i18n.t('common.maxSpeed')}>
          {rank.maxSpeed}
          <span className="text-secondary text-xs">wpm</span>
        </Row>
        <Row label={i18n.t('common.accuracy')}>
          {rank.accuracy}
          <span className="text-secondary text-xs">%</span>
        </Row>
      </div>
      {createPortal(
        <AnimatePresence>
          <Fragment key={dropCount}>
            {gotchaMons.map((mon, idx) => (
              <RainItem key={idx} src={mon.image} zIndexRange={[10, 60]} />
            ))}
          </Fragment>
        </AnimatePresence>,
        document.body,
      )}
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
