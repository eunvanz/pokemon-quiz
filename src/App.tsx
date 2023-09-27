import { QueryClientProvider } from "react-query";
import {
  BrowserRouter,
  MemoryRouter,
  MemoryRouterProps,
  Route,
  Routes,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import api from "./api";
import { ApiProvider } from "./api/apiContext";
import GamePanelContainer from "./containers/GamePanelContainer";
import MainContainer from "./containers/MainContainer/MainContainer";
import { queryClient } from "./helpers/reactQuery";

export interface CommonProviderProps {
  api?: Partial<typeof api>;
  router?: typeof MemoryRouter;
  routerProps?: MemoryRouterProps;
}

export const CommonProvider: React.FC<CommonProviderProps> = ({
  api: apiProp = api,
  router: Router = BrowserRouter,
  routerProps,
  children,
}) => (
  <ApiProvider api={apiProp}>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Router {...routerProps}>{children}</Router>
      </QueryClientProvider>
    </RecoilRoot>
  </ApiProvider>
);

function App() {
  return (
    <CommonProvider>
      <Routes>
        <Route path="/game-panel" element={<GamePanelContainer />} />
        <Route path="/" element={<MainContainer />} />
      </Routes>
    </CommonProvider>
  );
}

export default App;
