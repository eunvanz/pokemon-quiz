import { useMemo } from 'react'
import { GENERATIONS } from '@/lib/constants/rules'
import useGeneration from './use-generation'
import mockMons from '@/mocks/mons'

const useAllMons = () => {
  const allMons = mockMons.allMons

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
    allMons: generationMons,
  }
}

export default useAllMons
