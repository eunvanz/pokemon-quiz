import { useState } from 'react'
import { useIsomorphicLayoutEffect, useWindowSize } from 'usehooks-ts'

const useIsMobile = () => {
  const { width } = useWindowSize()

  const [isMobile, setIsMobile] = useState(width < 640)

  useIsomorphicLayoutEffect(() => {
    setIsMobile(width < 640)
  }, [width])

  return isMobile
}

export default useIsMobile
