import type { Meta, StoryObj } from '@storybook/react'
import Modal from './modal'

const meta = {
  title: 'components/Modal',
  component: Modal,
  args: {
    isOpen: true,
    title: 'Title',
    children:
      'Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.',
  },
} as Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const HasCancel: Story = {
  args: {
    hasCancel: true,
  },
}
