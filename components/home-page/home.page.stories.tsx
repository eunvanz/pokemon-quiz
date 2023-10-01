import type { Meta, StoryObj } from '@storybook/react'
import { TestProvider } from '../../lib/helpers/test'
import mockMons from '../../mocks/mons'
import Home from './home.page'

const meta = {
  title: 'pages/HomePage',
  component: Home,
  args: {},
  render: () => (
    <TestProvider api={{ getAllMons: () => Promise.resolve(mockMons.allMons) }}>
      <Home />
    </TestProvider>
  ),
} as Meta<typeof Home>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
