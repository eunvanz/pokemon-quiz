import mockMons from '@/mocks/mons'
import mockRanks from '@/mocks/ranks'
import type { Meta, StoryObj } from '@storybook/react'
import Certificate from './certificate'

const meta = {
  title: 'components/Certificate',
  component: Certificate,
  args: {
    rank: mockRanks.rank,
    allMons: mockMons.allMons,
  },
} satisfies Meta<typeof Certificate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
