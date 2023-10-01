import api from '@/lib/api'
import useAllMons from '@/lib/hooks/use-all-mons'
import { Rank } from '@/lib/types'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/navigation'
import CertificateView from './certificate.view'

export interface CertificatePageProps {
  rank: Rank
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { rankId } = ctx.params as { rankId: string }
  const rank = await api.getRank(Number(rankId))
  return {
    props: {
      rank,
    },
  }
}

const CertificatePage: React.FC<CertificatePageProps> = ({ rank }) => {
  const router = useRouter()

  const { allMons, isAllMonsLoading } = useAllMons()

  return isAllMonsLoading ? null : (
    <CertificateView
      allMons={allMons!}
      rank={rank!}
      onNavigateToMain={() => router.push('/')}
    />
  )
}

export default CertificatePage
