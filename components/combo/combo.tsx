'use client'

import useI18n from '@/lib/hooks/use-i18n'
import { AnimatePresence, motion } from 'framer-motion'
import tw from 'twin.macro'

export interface ComboProps {
  count?: number
}

const Combo: React.FC<ComboProps> = ({ count }) => {
  const i18n = useI18n()

  return !!count && count > 1 ? (
    <div>
      <AnimatePresence>
        <motion.span
          css={tw`sm:text-3xl text-blue-600 absolute`}
          key={count}
          initial={{
            scale: 3,
          }}
          animate={{
            scale: 1,
            opacity: 0,
          }}
          transition={{
            ease: 'linear',
            duration: 0.2,
          }}
        >
          {count}
        </motion.span>
      </AnimatePresence>
      <span css={tw`sm:text-3xl text-blue-600`}>{count}</span>
      <span css={tw`sm:text-lg`}>{i18n.t('common.combos')}</span>
    </div>
  ) : (
    <div css={tw`h-6 sm:h-9`} />
  )
}

export default Combo
