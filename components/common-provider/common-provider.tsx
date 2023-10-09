'use client'

import api from '@/lib/api'
import { ApiProvider } from '@/lib/api/api-context'
import { queryClient } from '@/lib/helpers/react-query'
import { PropsWithChildren } from 'react'
import { QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/lib/i18n'

export interface CommonProviderProps {
  api?: Partial<typeof api>
}

const CommonProvider: React.FC<PropsWithChildren<CommonProviderProps>> = ({
  api: apiProp = api,
  children,
}) => (
  <ApiProvider api={apiProp}>
    <I18nextProvider i18n={i18n}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </RecoilRoot>
    </I18nextProvider>
  </ApiProvider>
)

export default CommonProvider
