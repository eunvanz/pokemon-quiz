import CertificateModal from '@/components/certificate-modal'
import NameInputModal, {
  NameInputModalProps,
} from '@/components/name-input-modal'
import RankTable, { RankTableProps } from '@/components/rank-table'
import { Mon } from '@/lib/types'
import { useEffect, useState } from 'react'

export interface LeaderboardViewProps
  extends RankTableProps,
    Omit<
      NameInputModalProps,
      'isOpen' | 'onSkip' | 'onSubmit' | 'score' | 'onClose'
    > {
  score?: number
  onSkipName: NameInputModalProps['onSkip']
  onSubmitName: NameInputModalProps['onSubmit']
  allMons?: Mon[]
}

const MIN_SCORE = 0

const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  score,
  hasNextPage,
  isLoading,
  isLoadingNextPage,
  onLoadNextPage,
  onSkipName,
  onSubmitName,
  items,
  myRank,
  allMons,
  defaultName,
}) => {
  const [isNameInputModalOpen, setIsNameInputModalOpen] = useState(
    score ? score > MIN_SCORE : false,
  )

  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false)

  useEffect(() => {
    if (myRank) {
      setIsCertificateModalOpen(true)
    }
  }, [myRank])

  return (
    <div className="flex w-full justify-center">
      <RankTable
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        isLoadingNextPage={isLoadingNextPage}
        onLoadNextPage={onLoadNextPage}
        items={items}
        myRank={myRank}
        allMons={allMons}
      />
      {!!score && (
        <NameInputModal
          isOpen={isNameInputModalOpen}
          onClose={() => setIsNameInputModalOpen(false)}
          onSkip={onSkipName}
          onSubmit={onSubmitName}
          score={score}
          defaultName={defaultName}
        />
      )}
      {myRank && allMons && (
        <CertificateModal
          isOpen={isCertificateModalOpen}
          rank={myRank}
          allMons={allMons}
          onClose={() => setIsCertificateModalOpen(false)}
        />
      )}
    </div>
  )
}

LeaderboardView.displayName = 'LeaderboardView'

export default LeaderboardView
