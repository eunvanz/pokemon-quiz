'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SelectGeneration, { SelectGenerationProps } from '../select-generation'
import Intro from '../intro'
import CommonProvider from '../common-provider'

export interface HomeViewProps extends Omit<SelectGenerationProps, 'mons'> {
  mons?: SelectGenerationProps['mons']
  isLoading: boolean
}

const HomeView: React.FC<HomeViewProps> = ({
  mons,
  isLoading,
  ...restProps
}) => {
  const [isIntroVisible, setIsIntroVisible] = useState(true)

  return (
    <CommonProvider>
      <AnimatePresence>
        {isIntroVisible ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, position: 'absolute', width: '100%' }}
          >
            <Intro
              mons={mons}
              onEnter={() => setIsIntroVisible(false)}
              isLoading={isLoading}
            />
          </motion.div>
        ) : (
          <motion.div
            key="select-generation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SelectGeneration mons={mons!} {...restProps} />
          </motion.div>
        )}
      </AnimatePresence>
    </CommonProvider>
  )
}

export default HomeView
