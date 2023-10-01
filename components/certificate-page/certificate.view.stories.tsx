import mockMons from '@/mocks/mons'
import mockRanks from '@/mocks/ranks'
import type { Meta, StoryObj } from '@storybook/react'
import CertificateView from './certificate.view'

const meta = {
  title: 'pages/certificate/CertificateView',
  component: CertificateView,
  args: {
    allMons: mockMons.allMons,
    rank: mockRanks.rank,
  },
} as Meta<typeof CertificateView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
