import type { Meta, StoryObj } from '@storybook/react'
import { TestProvider } from './lib/helpers/test'
import mockMons from './mocks/mons'
import Home from './page'

const meta = {
  title: 'pages/Home',
  component: Home,
  args: {},
  render: () => (
    <TestProvider api={{ getAllMons: () => Promise.resolve(mockMons.allMons) }}>
      <Home />
    </TestProvider>
  ),
} satisfies Meta<typeof Home>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
