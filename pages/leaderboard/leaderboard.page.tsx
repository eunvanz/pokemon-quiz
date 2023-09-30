import api from '@/lib/api'
import { getMergedPageData } from '@/lib/helpers/react-query'
import useGameController from '@/lib/hooks/use-game-controller'
import useMonImages from '@/lib/hooks/use-mon-images'
import useUserLocation from '@/lib/hooks/use-user-location'
import { Pageable, Rank } from '@/lib/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useInfiniteQuery, useMutation } from 'react-query'
import LeaderboardView from './leaderboard.view'

export default function LeaderBoardPage() {
  const userLocation = useUserLocation()
  const {
    score,
    achievedMonImages,
    maxCombo,
    typingSpeed,
    generation,
    accuracy,
  } = useGameController()

  const { resetMonImages } = useMonImages()

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

  const {
    data: rankListData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery<Pageable<Rank>>(
    'ranks',
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
      if (!isPostingRank) {
        await postRank({
          score,
          maxCombo,
          maxSpeed: typingSpeed.max,
          avgSpeed: typingSpeed.avg,
          accuracy,
          generation,
          gotcha: achievedMonImages.length,
          name,
          city: userLocation?.city,
          country: userLocation?.country,
          countryCode: userLocation?.countryCode,
          ip: userLocation?.query,
        })
      }
    },
    [
      accuracy,
      achievedMonImages.length,
      generation,
      isPostingRank,
      maxCombo,
      postRank,
      score,
      typingSpeed.avg,
      typingSpeed.max,
      userLocation?.city,
      userLocation?.country,
      userLocation?.countryCode,
      userLocation?.query,
    ],
  )

  const onSkipName = useCallback(() => {
    setIsRankListQueryEnabled(true)
  }, [])

  useEffect(() => {
    resetMonImages()
  }, [resetMonImages])

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
    />
  )
}
