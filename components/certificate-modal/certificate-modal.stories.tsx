import mockMons from '@/mocks/mons'
import mockRanks from '@/mocks/ranks'
import type { Meta, StoryObj } from '@storybook/react'
import CertificateModal from './certificate-modal'

const meta = {
  title: 'components/CertificateModal',
  component: CertificateModal,
  args: {
    allMons: mockMons.allMons,
    rank: mockRanks.rank,
    isOpen: true,
  },
} as Meta<typeof CertificateModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
