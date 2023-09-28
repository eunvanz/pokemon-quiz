import mockMons from '@/mocks/mons'
import type { Meta, StoryObj } from '@storybook/react'
import HomeView from './page.view'

const meta = {
  title: 'pages/HomeView',
  component: HomeView,
  args: {
    mons: mockMons.allMons,
    isLoading: false,
  },
} satisfies Meta<typeof HomeView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
