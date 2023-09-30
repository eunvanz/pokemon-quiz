import type { Preview } from '@storybook/react'
import '../pages/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
}

export default preview
