import type { Meta, StoryObj } from '@storybook/react'
import NameInputModal from './name-input-modal'

const meta = {
  title: 'components/NameInputModal',
  component: NameInputModal,
  args: {
    isOpen: true,
    score: 9128571,
  },
} satisfies Meta<typeof NameInputModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
