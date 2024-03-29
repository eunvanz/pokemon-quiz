import type { Meta, StoryObj } from '@storybook/react'
import Intro from './intro'
import mockMons from '@/mocks/mons'

const meta = {
  title: 'components/Intro',
  component: Intro,
  args: {
    mons: mockMons.allMons,
  },
} as Meta<typeof Intro>

export default meta
type Story = StoryObj<typeof meta>

export const Loaded: Story = {
  args: {
    isLoading: false,
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
