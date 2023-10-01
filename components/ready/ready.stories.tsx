import type { Meta, StoryObj } from '@storybook/react'
import Ready from './ready'

const meta = {
  title: 'components/Ready',
  component: Ready,
  args: {},
} as Meta<typeof Ready>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
