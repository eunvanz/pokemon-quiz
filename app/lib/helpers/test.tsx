import CommonProvider from '@/app/components/common-provider'
import { PropsWithChildren } from 'react'
import api from '../api'

export interface TestProviderProps {
  api?: Partial<typeof api>
}

export const TestProvider: React.FC<PropsWithChildren<TestProviderProps>> = ({
  children,
  api = {},
}) => <CommonProvider api={api}>{children}</CommonProvider>
