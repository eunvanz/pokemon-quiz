import type { Meta, StoryObj } from '@storybook/react'
import Select from './select'

const meta = {
  title: 'components/Select',
  component: Select,
  args: {
    options: [
      {
        label: 'Name',
        value: 'name',
      },
      {
        label: 'Country',
        value: 'country',
      },
    ],
    value: 'country',
  },
} as Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
