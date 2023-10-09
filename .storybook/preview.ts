import type { Preview } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withI18n, withRecoilRoot } from '../lib/helpers/test'
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
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [withRecoilRoot, withI18n],
}

export default preview
