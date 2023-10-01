import mockMons from '@/mocks/mons'
import type { Meta, StoryObj } from '@storybook/react'
import HomeView from './home.view'

const meta = {
  title: 'pages/HomeView',
  component: HomeView,
  args: {
    mons: mockMons.allMons,
    isLoading: false,
  },
} as Meta<typeof HomeView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
