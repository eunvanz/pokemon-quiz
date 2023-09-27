import { useNavigate } from "react-router";
import Main from "~/components/Main";
import useAllMons from "~/hooks/useAllMons";

const MainContainer = () => {
  const navigate = useNavigate();

  const { allMons, isAllMonsLoading } = useAllMons();

  return (
    <Main
      onStart={() => navigate("/game-panel")}
      mons={allMons}
      onNavigateToLeaderBoard={() => navigate("/leader-board")}
      isLoading={isAllMonsLoading}
    />
  );
};

export default MainContainer;
