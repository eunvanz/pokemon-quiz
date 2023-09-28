import { useContext } from 'react'
import { ApiContext } from '../api/api-context'

const useApi = () => {
  const api = useContext(ApiContext)
  return api
}

export default useApi
