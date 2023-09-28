import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.API_HOST,
})
instance.defaults.timeout = 30_000

export default instance
