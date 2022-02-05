import GamePanel from "~/components/GamePanel";
import useGameController from "~/hooks/useGameController";

const GamePanelContainer = () => {
  const props = useGameController();

  return <GamePanel {...props} />;
};

export default GamePanelContainer;
