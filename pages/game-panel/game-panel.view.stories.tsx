import type { Meta, StoryObj } from '@storybook/react'
import GamePanel from './game-panel.view'

const meta = {
  title: 'pages/game-panel/GamePanelView',
  component: GamePanel,
  args: {
    achievedMons: [],
    answers: ['ditto', '메타몽'],
    combo: 4,
    maxCombo: 10,
    currentColumn: 2,
    currentMonImage:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png',
    duration: 1.5,
    nextMonImage:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
    score: 12345,
    stackedMonImages: [
      [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
      ],
      [],
      [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
      ],
      [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png',
      ],
      [],
      [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
      ],
    ],
    typingSpeed: {
      avg: 23,
      last: 13,
      max: 42,
      totalCount: 3,
    },
    accuracy: 55,
    generation: 0,
  },
} satisfies Meta<typeof GamePanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isGameOver: false,
  },
}
