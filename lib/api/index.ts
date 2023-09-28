import { Mon, UserLocation } from '@/lib/types'
import requester from './requester'

const getAllMons = async () => {
  const { data } = await requester.get<Mon[]>('mons')
  return data
}

const getUserLocation = async () => {
  const { data } = await requester.get<UserLocation>('/json', {
    baseURL: 'http://ip-api.com',
  })
  return data
}

const api = {
  getAllMons,
  getUserLocation,
}

export default api
