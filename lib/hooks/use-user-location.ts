import { useEffect } from 'react'
import { useQuery } from 'react-query'
import api from '../api'
import { checkIsSSR } from '../helpers/common'
import { UserLocation } from '../types'

const useUserLocation = () => {
  const { data } = useQuery<UserLocation>('location', api.getUserLocation, {
    staleTime: Infinity,
    cacheTime: Infinity,
    initialData:
      !checkIsSSR() && !!localStorage.getItem('location')
        ? JSON.parse(localStorage.getItem('location')!)
        : undefined,
    enabled: !checkIsSSR() && !localStorage.getItem('location'),
  })

  useEffect(() => {
    if (data) {
      localStorage.setItem('location', JSON.stringify(data))
    }
  }, [data])

  return data
}

export default useUserLocation
