import mockMons from '@/app/mocks/mons'
import type { Meta, StoryObj } from '@storybook/react'
import Main from './main'

const meta = {
  title: 'components/Main',
  component: Main,
  args: {
    mons: mockMons.allMons,
    isLoading: false,
  },
} satisfies Meta<typeof Main>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
