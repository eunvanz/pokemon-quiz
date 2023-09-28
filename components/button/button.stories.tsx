import type { Meta, StoryObj } from '@storybook/react'
import Button from './button'

const meta = {
   title: 'components/Button',
  component: Button,
  args: {
    children: 'Button Label',
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Contained: Story = {}

export const Outlined: Story = {
  args: {
    variant: 'outlined'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const Block: Story = {
  args: {
    isBlock: true
  }
}
