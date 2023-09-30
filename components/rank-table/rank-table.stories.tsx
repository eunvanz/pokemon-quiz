import type { Meta, StoryObj } from '@storybook/react'
import RankTable from './rank-table'

const meta = {
  title: 'components/RankTable',
  component: RankTable,
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
      avgSpeed: 30,
      maxSpeed: 40,
    })),
  },
} satisfies Meta<typeof RankTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
