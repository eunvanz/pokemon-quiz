import { useCallback, useEffect, useMemo, useState } from 'react'
import api from '@/lib/api'
import { getMergedPageData } from '@/lib/helpers/react-query'
import useAllMons from '@/lib/hooks/use-all-mons'
import useGameController from '@/lib/hooks/use-game-controller'
import useMons from '@/lib/hooks/use-mons'
import { Pageable, Rank } from '@/lib/types'
import { useInfiniteQuery, useMutation } from 'react-query'
import { useLocalStorage } from 'usehooks-ts'
import LeaderboardView from './leaderboard.view'

export default function LeaderBoardPage() {
  const {
    score,
    achievedMons,
    maxCombo,
    typingSpeed,
    generation,
    accuracy,
    resetGame,
  } = useGameController()

  const [defaultName, setDefaultName] = useLocalStorage('name', '')

  const { flattenStackedMons } = useMons()

  const { allMons } = useAllMons()

  const [myRank, setMyRank] = useState<Rank | undefined>(undefined)
  const [isRankListQueryEnabled, setIsRankListQueryEnabled] = useState(
    score === 0,
  )

  const { mutateAsync: postRank, isLoading: isPostingRank } = useMutation(
    api.postRank,
    {
      onSuccess: (data) => {
        setMyRank(data)
        setIsRankListQueryEnabled(true)
      },
    },
  )

  const { mutateAsync: patchMonCount } = useMutation(api.patchMonCount)

  const {
    data: rankListData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery<Pageable<Rank>>(
    ['ranks'],
    ({ pageParam = 1 }) => api.getRankList(pageParam),
    {
      getNextPageParam: ({ meta: { totalPages, currentPage } }) =>
        totalPages <= currentPage ? undefined : currentPage + 1,
      enabled: isRankListQueryEnabled,
    },
  )

  const items = useMemo(() => {
    return rankListData ? getMergedPageData(rankListData.pages) : undefined
  }, [rankListData])

  const onSubmitName = useCallback(
    async (name: string) => {
      setDefaultName(name)
      if (!isPostingRank) {
        await postRank({
          score,
          maxCombo,
          maxSpeed: typingSpeed.max,
          avgSpeed: typingSpeed.avg,
          accuracy,
          generation,
          gotcha: achievedMons.length,
          name,
          gotchaMons: achievedMons.map((mon) => mon.id),
        })
      }
    },
    [
      accuracy,
      achievedMons,
      generation,
      isPostingRank,
      maxCombo,
      postRank,
      score,
      setDefaultName,
      typingSpeed.avg,
      typingSpeed.max,
    ],
  )

  const onSkipName = useCallback(() => {
    setIsRankListQueryEnabled(true)
  }, [])

  useEffect(() => {
    if (score) {
      patchMonCount({
        result: [
          ...achievedMons.map((mon) => ({ id: mon.id, isGotten: true })),
          ...flattenStackedMons.map((mon) => ({ id: mon.id, isGotten: false })),
        ],
      })
    }
    return () => {
      resetGame()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LeaderboardView
      onSubmitName={onSubmitName}
      myRank={myRank}
      items={items}
      hasNextPage={hasNextPage || false}
      isLoading={isLoading}
      isLoadingNextPage={isFetchingNextPage}
      onLoadNextPage={fetchNextPage}
      onSkipName={onSkipName}
      score={score}
      allMons={allMons}
      defaultName={defaultName}
    />
  )
}
