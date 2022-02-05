import tw from "twin.macro";
import { GameController } from "~/hooks/useGameController";
import Combo from "../Combo";
import MonNameInput from "../MonNameInput/MonNameInput";
import OverlaidGameGrid, { OverlaidGameGridProps } from "../OverlaidGameGrid";
import Score from "../Score";
import TargetMon from "../TargetMon";

export interface GamePanelProps extends GameController {}

const GamePanel: React.FC<GamePanelProps> = ({
  currentMonImage,
  currentColumn,
  duration,
  stackedMonImages,
  onStack,
  score,
  combo,
  answers,
  onSkip,
  onSuccess,
  nextMonImage,
}) => {
  return (
    <div css={tw`flex`}>
      <OverlaidGameGrid
        currentColumn={currentColumn}
        stackedMonImages={stackedMonImages}
        duration={duration}
        currentMonImage={currentMonImage}
        onStack={onStack}
      />
      <div css={tw`ml-4`}>
        <Score count={score} />
        <Combo count={combo} />
        <TargetMon monImage={currentMonImage} nextMonImage={nextMonImage} />
        <MonNameInput correctAnswers={answers} onSkip={onSkip} onSubmit={onSuccess} />
      </div>
    </div>
  );
};

export default GamePanel;
