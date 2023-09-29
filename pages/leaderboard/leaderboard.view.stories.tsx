import type { Meta, StoryObj } from '@storybook/react'
import LeaderboardView from './leaderboard.view'

const meta = {
  title: 'pages/leaderboard/LeaderboardView',
  component: LeaderboardView,
  args: {
    isLoading: false,
    isLoadingNextPage: false,
    hasNextPage: true,
    items: Array.from({ length: 100 }).map((_, idx) => ({
      id: idx,
      seq: idx + 10000,
      name: 'Other side Koda Auzuki Elemental Opepen Edition',
      score: 1241251,
      maxCombo: 124,
      gotcha: 4211,
      generation: idx % 10,
      country: 'South Korea',
    })),
  },
} satisfies Meta<typeof LeaderboardView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AfterGame: Story = {
  args: {
    score: 1231234,
  },
}
