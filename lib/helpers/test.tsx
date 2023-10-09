import CommonProvider from '@/components/common-provider'
import { StoryFn } from '@storybook/react'
import { PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import { I18nextProvider } from 'react-i18next'
import api from '../api'
import i18n from '../i18n'

export interface TestProviderProps {
  api?: Partial<typeof api>
}

export const TestProvider: React.FC<PropsWithChildren<TestProviderProps>> = ({
  children,
  api = {},
}) => <CommonProvider api={api}>{children}</CommonProvider>

export const withRecoilRoot = (Story: StoryFn) => (
  <RecoilRoot>
    <Story />
  </RecoilRoot>
)

export const withI18n = (Story: StoryFn) => (
  <I18nextProvider i18n={i18n}>
    <Story />
  </I18nextProvider>
)
