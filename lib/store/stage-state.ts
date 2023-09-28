import { flatten } from 'lodash-es'
import { selector } from 'recoil'
import achievedMonImagesState from './achieved-mon-images-state'
import stackedMonImagesState from './stacked-mon-images-state'

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
