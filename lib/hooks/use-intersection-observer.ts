import { RefObject, useEffect, useState } from 'react'

interface Args extends IntersectionObserverInit {
  isFreezeOnceVisible?: boolean
}

export default function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 1.0,
    root = null,
    rootMargin = '0px',
    isFreezeOnceVisible = false,
  }: Args,
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const isFrozen = entry?.isIntersecting && isFreezeOnceVisible

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef?.current // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || isFrozen || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
    // eslint-disable-next-line
  }, [elementRef, JSON.stringify(threshold), root, rootMargin, isFrozen])

  return entry
}
