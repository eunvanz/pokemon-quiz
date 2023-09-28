import type { Meta, StoryObj } from '@storybook/react'
import MonNameInput from './mon-name-input'

const meta = {
  title: 'components/MonNameInput',
  component: MonNameInput,
  args: {
    correctAnswers: ['ditto', '메타몽'],
  },
} satisfies Meta<typeof MonNameInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
