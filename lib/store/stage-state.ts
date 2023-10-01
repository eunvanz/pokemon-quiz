import { flatten } from 'lodash-es'
import { selector } from 'recoil'
import achievedMonImagesState from './achieved-mons-state'
import stackedMonImagesState from './stacked-mons-state'

const stageState = selector<number>({
  key: 'stage',
  get: ({ get }) => {
    return (
      flatten(get(stackedMonImagesState)).length +
      get(achievedMonImagesState).length +
      1
    )
  },
})

export default stageState
