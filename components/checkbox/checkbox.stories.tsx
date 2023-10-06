import type { Meta, StoryObj } from '@storybook/react'
import Checkbox from './checkbox'

const meta = {
  title: 'components/Checkbox',
  component: Checkbox,
  args: {
    children: 'Checkbox',
    id: 'checkbox',
  },
} as Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
