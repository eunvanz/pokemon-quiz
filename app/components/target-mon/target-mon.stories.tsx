import type { Meta, StoryObj } from '@storybook/react'
import TargetMon from './target-mon'

const meta = {
  title: 'components/TargetMon',
  component: TargetMon,
  args: {
    monImage:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png',
    nextMonImage:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
  },
} satisfies Meta<typeof TargetMon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithNames: Story = {
  args: {
    monNames:
      'メタモン,Metamon,메타몽,百變怪,Métamorph,Ditto,Ditto,Ditto,Ditto,メタモン,百变怪',
  },
}
