export const checkIsSSR = () => {
  return typeof window === 'undefined'
}
