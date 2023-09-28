import type { Meta, StoryObj } from '@storybook/react'
import GameGrid from './game-grid'

const meta = {
  title: 'components/GameGrid',
  component: GameGrid,
  args: {
    width: 300,
    gridItemSize: 6,
  },
} satisfies Meta<typeof GameGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
