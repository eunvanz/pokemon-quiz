import type { Meta, StoryObj } from '@storybook/react'
import Score from './score'

const meta = {
  title: 'components/Score',
  component: Score,
  args: {
    label: 'Score',
    count: 1234567,
  },
} satisfies Meta<typeof Score>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    diff: 200,
  },
}

export const HasUnit: Story = {
  args: {
    unit: 'wpm',
  },
}
