import { useCallback, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import typingSpeedRecordsState from '../store/typing-speed-records-state'

export interface TypingSpeed {
  last: number
  totalCount: number
  max: number
  avg: number
}

const useTypingSpeed = () => {
  const [typingSpeedRecords, setTypingSpeedRecords] = useRecoilState(
    typingSpeedRecordsState,
  )

  const typingSpeed: TypingSpeed = useMemo(() => {
    return {
      last: [...typingSpeedRecords].pop() || 0,
      totalCount: typingSpeedRecords.length,
      max: typingSpeedRecords.length ? Math.max(...typingSpeedRecords) : 0,
      avg: typingSpeedRecords.length
        ? Number(
            (
              typingSpeedRecords.reduce((prev, curr) => prev + curr, 0) /
              typingSpeedRecords.length
            ).toFixed(1),
          )
        : 0,
    }
  }, [typingSpeedRecords])

  const updateTypingSpeed = useCallback(
    ({ wastedTime }: { wastedTime: number }) => {
      setTypingSpeedRecords((oldTypingSpeedRecords) => {
        const speed = Number(((60 * 1000) / wastedTime).toFixed(1))
        return [...oldTypingSpeedRecords, speed]
      })
    },
    [setTypingSpeedRecords],
  )

  const resetTypingSpeed = useCallback(() => {
    setTypingSpeedRecords([])
  }, [setTypingSpeedRecords])

  return { updateTypingSpeed, typingSpeed, resetTypingSpeed }
}

export default useTypingSpeed
