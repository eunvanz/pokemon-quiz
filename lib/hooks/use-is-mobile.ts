import { useEffect, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  const { width } = useWindowSize()

  useEffect(() => {
    setIsMobile(width < 640)
  }, [width])

  return isMobile
}

export default useIsMobile
