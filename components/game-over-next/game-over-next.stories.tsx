import type { Meta, StoryObj } from '@storybook/react'
import GameOverNext from './game-over-next'

const meta = {
  title: 'components/GameOverNext',
  component: GameOverNext,
  args: {},
} as Meta<typeof GameOverNext>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
