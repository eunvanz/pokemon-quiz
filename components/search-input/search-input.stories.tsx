import type { Meta, StoryObj } from '@storybook/react'
import SearchInput from './search-input'

const meta = {
  title: 'components/SearchInput',
  component: SearchInput,
  args: {},
} as Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
