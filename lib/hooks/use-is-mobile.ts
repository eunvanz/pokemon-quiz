import { useState } from 'react'
import { useIsomorphicLayoutEffect, useWindowSize } from 'usehooks-ts'
import { checkIsSSR } from '../helpers/common'

const useIsMobile = () => {
  const { width } = useWindowSize()

  const [isMobile, setIsMobile] = useState(
    checkIsSSR() ? false : window.innerWidth < 640,
  )

  useIsomorphicLayoutEffect(() => {
    setIsMobile(width < 640)
  }, [width])

  return isMobile
}

export default useIsMobile
