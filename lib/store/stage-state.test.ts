import { snapshot_UNSTABLE } from 'recoil'
import achievedMonImagesAtom from './achieved-mons-state'
import stackedMonImagesAtom from './stacked-mon-images-state'
import stageState from './stage-state'

describe('stageAtom', () => {
  it('has current stage value', () => {
    const testSnapshot = snapshot_UNSTABLE(({ set }) => {
      set(achievedMonImagesAtom, ['mon1', 'mon2'])
      set(stackedMonImagesAtom, [
        ['mon3', 'mon4'],
        [],
        ['mon5'],
        [],
        ['mon6'],
        [],
      ])
    })

    expect(testSnapshot.getLoadable(stageState).valueOrThrow()).toBe(7)
  })
})
