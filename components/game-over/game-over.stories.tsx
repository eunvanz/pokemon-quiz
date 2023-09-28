import type { Meta, StoryObj } from '@storybook/react'
import GameOver from './game-over'

const meta = {
  title: 'components/GameOver',
  component: GameOver,
  args: {
    isVisible: true,
  },
} satisfies Meta<typeof GameOver>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isClear: false,
    hasWrongAnswers: true,
  },
}

export const Clear: Story = {
  args: {
    isClear: true,
    hasWrongAnswers: false,
  },
}
