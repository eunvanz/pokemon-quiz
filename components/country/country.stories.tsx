import type { Meta, StoryObj } from '@storybook/react'
import Country from './country'

const meta = {
  title: 'components/Country',
  component: Country,
  args: {
    country: 'Korea (South)',
    countryCode: 'KR',
  },
} as Meta<typeof Country>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
