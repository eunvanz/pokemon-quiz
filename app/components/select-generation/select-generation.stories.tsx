import type { Meta, StoryObj } from '@storybook/react'
import SelectGeneration from './select-generation'
import mockMons from '@/app/mocks/mons'

const meta = {
  title: 'components/SelectGeneration',
  component: SelectGeneration,
  args: {
    mons: mockMons.allMons,
  },
} satisfies Meta<typeof SelectGeneration>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}