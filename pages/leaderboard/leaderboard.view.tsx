import NameInputModal, {
  NameInputModalProps,
} from '@/components/name-input-modal'
import RankTable, { RankTableProps } from '@/components/rank-table'
import { useState } from 'react'

export interface LeaderboardViewProps
  extends RankTableProps,
    Omit<
      NameInputModalProps,
      'isOpen' | 'onSkip' | 'onSubmit' | 'score' | 'onClose'
    > {
  score?: number
  onSkipName: NameInputModalProps['onSkip']
  onSubmitName: NameInputModalProps['onSubmit']
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
}) => {
  const [isNameInputModalOpen, setIsNameInputModalOpen] = useState(
    score ? score > MIN_SCORE : false,
  )
  return (
    <div className="flex w-full justify-center">
      <RankTable
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        isLoadingNextPage={isLoadingNextPage}
        onLoadNextPage={onLoadNextPage}
        items={items}
        myRank={myRank}
      />
      {!!score && (
        <NameInputModal
          isOpen={isNameInputModalOpen}
          onClose={() => setIsNameInputModalOpen(false)}
          onSkip={onSkipName}
          onSubmit={onSubmitName}
          score={score}
        />
      )}
    </div>
  )
}

LeaderboardView.displayName = 'LeaderboardView'

export default LeaderboardView
