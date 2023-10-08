'use client'

import { forwardRef, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { uniq } from 'lodash-es'
import tw from 'twin.macro'
import { Mon } from '@/lib/types'
import AnimatedNumber from 'react-awesome-animated-number'
import useIsMobile from '@/lib/hooks/use-is-mobile'
import i18n from '@/lib/i18n'

export interface TargetMonProps {
  mon?: Mon
  nextMonImage?: string
  monNames?: string
}

const TargetMon = forwardRef<HTMLDivElement, TargetMonProps>(
  ({ mon, nextMonImage, monNames }, ref) => {
    const isMobile = useIsMobile()

    const splitMonNames = useMemo(() => {
      return uniq(monNames?.split(','))
    }, [monNames])

    const monImage = mon?.image

    const gotchaRate = useMemo(() => {
      if (!mon) return undefined
      return Number(((mon.gottenCnt * 100) / mon.shownCnt).toFixed(1))
    }, [mon])

    const hasGotchaRate = useMemo(() => {
      return !!gotchaRate && !isNaN(gotchaRate)
    }, [gotchaRate])

    return (
      <div css={tw`flex`}>
        <div css={tw`flex flex-col justify-center items-center`}>
          <div
            ref={ref}
            css={tw`w-20 h-20 sm:w-40 sm:h-40 overflow-hidden relative`}
          >
            {/* for caching */}
            {nextMonImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={nextMonImage}
                alt="cache"
                width="100%"
                height="100%"
                css={tw`hidden`}
              />
            )}
            {monImage && (
              <AnimatePresence>
                <motion.img
                  initial={{
                    y: -200,
                    position: 'absolute',
                  }}
                  animate={{
                    y: 0,
                  }}
                  exit={{
                    y: 200,
                    position: 'absolute',
                  }}
                  key={monImage}
                  src={monImage}
                  alt="target"
                  width="100%"
                />
              </AnimatePresence>
            )}
          </div>
          {mon && (
            <div className="text-xs sm:text-sm">
              {isMobile ? i18n.t('common.gotcha') : i18n.t('common.gotchaRate')}
              :{' '}
              <span className="text-primary">
                <AnimatedNumber value={hasGotchaRate ? gotchaRate || 0 : 0} />
              </span>
              %
            </div>
          )}
        </div>
        <div css={tw`relative ml-4 text-xs sm:text-base`}>
          <AnimatePresence key={mon?.id}>
            <motion.div
              initial={{
                opacity: 0,
                position: 'absolute',
              }}
              animate={{
                opacity: 1,
                position: 'relative',
              }}
              exit={{
                opacity: 0,
                position: 'absolute',
              }}
            >
              {splitMonNames &&
                splitMonNames.map((name) => <div key={name}>{name}</div>)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    )
  },
)

TargetMon.displayName = 'TargetMon'

export default TargetMon
