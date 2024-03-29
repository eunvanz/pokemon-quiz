import { TestProvider } from '@/lib/helpers/test'
import mockMons from '@/mocks/mons'
import type { Meta, StoryObj } from '@storybook/react'
import GamePanelPage from './game-panel.page'

const meta = {
  title: 'pages/game-panel/GamePanelPage',
  component: GamePanelPage,
  args: {},
  render: () => (
    <TestProvider api={{ getAllMons: () => Promise.resolve(mockMons.allMons) }}>
      <GamePanelPage />
    </TestProvider>
  ),
} as Meta<typeof GamePanelPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
