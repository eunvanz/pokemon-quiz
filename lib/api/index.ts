import { Mon, Rank, RankDto, UserLocation } from '@/lib/types'
import requester from './requester'

const getAllMons = async () => {
  const { data } = await requester.get<Mon[]>('/mons')
  return data
}

const getUserLocation = async () => {
  const { data } = await requester.get<UserLocation>('/json', {
    baseURL: 'http://ip-api.com',
  })
  return data
}

const postRank = async (dto: RankDto) => {
  const { data } = await requester.post<Rank>('/rank', dto)
  return data
}

const getRankList = async (page: number) => {
  const { data } = await requester.get('/rank', {
    params: {
      page,
    },
  })
  return data
}

const api = {
  getAllMons,
  getUserLocation,
  postRank,
  getRankList,
}

export default api
