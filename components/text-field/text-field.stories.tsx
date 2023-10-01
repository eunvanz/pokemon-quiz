import type { Meta, StoryObj } from '@storybook/react'
import TextField from './text-field'

const meta = {
  title: 'components/TextField',
  component: TextField,
  args: {
    placeholder: 'Placeholder',
  },
} as Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Block: Story = {
  args: {
    isBlock: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Error: Story = {
  args: {
    hasError: true,
    errorMessage: 'It`s wrong answer',
  },
}
