import CommonProvider from '@/components/common-provider'
import { StoryFn } from '@storybook/react'
import { PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import api from '../api'

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
