import { QueryClient } from 'react-query'
import { Pageable } from '../types'

export const queryClient = new QueryClient()

export const getMergedPageData = <T>(data: Pageable<T>[]) => {
  return data.reduce((prev: T[], item) => [...prev, ...item.items], [])
}
