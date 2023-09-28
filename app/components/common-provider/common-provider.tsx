import api from '@/app/lib/api'
import { ApiProvider } from '@/app/lib/api/api-context'
import { queryClient } from '@/app/lib/helpers/react-query'
import { PropsWithChildren } from 'react'
import { QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

export interface CommonProviderProps {
  api?: Partial<typeof api>
}

const CommonProvider: React.FC<PropsWithChildren<CommonProviderProps>> = ({
  api: apiProp = api,
  children,
}) => (
  <ApiProvider api={apiProp}>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RecoilRoot>
  </ApiProvider>
)

export default CommonProvider
