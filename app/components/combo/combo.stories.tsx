import type { Meta, StoryObj } from '@storybook/react'
import Combo from './combo'

const meta = {
  title: 'components/Combo',
  component: Combo,
  args: {
    count: 2
  }
} satisfies Meta<typeof Combo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
