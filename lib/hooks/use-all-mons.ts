import { useMemo } from 'react'
import { GENERATIONS } from '@/lib/constants/rules'
import { useQuery } from 'react-query'
import api from '../api'
import { Mon } from '../types'
import useGeneration from './use-generation'

const useAllMons = () => {
  const { data: allMons, isLoading: isAllMonsLoading } = useQuery<Mon[]>(
    ['allMons'],
    api.getAllMons,
    {
      cacheTime: 10 * 60 * 1000,
      staleTime: 10 * 60 * 1000,
    },
  )

  const { generation } = useGeneration()

  const generationMons = useMemo(() => {
    if (generation) {
      if (generation === 1) {
        return allMons?.filter((mon) => mon.id <= GENERATIONS[1])
      } else {
        return allMons?.filter(
          (mon) =>
            mon.id >
              GENERATIONS[(generation - 1) as keyof typeof GENERATIONS] &&
            mon.id <= GENERATIONS[generation as keyof typeof GENERATIONS],
        )
      }
    } else {
      return allMons
    }
  }, [allMons, generation])

  return {
    generationMons,
    allMons,
    isAllMonsLoading,
  }
}

export default useAllMons
