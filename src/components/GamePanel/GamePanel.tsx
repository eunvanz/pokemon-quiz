import { useCallback, useRef } from "react";
import tw from "twin.macro";
import { burstStar } from "~/helpers/mojs";
import { GameController } from "~/hooks/useGameController";
import Combo from "../Combo";
import MonNameInput from "../MonNameInput/MonNameInput";
import OverlaidGameGrid from "../OverlaidGameGrid";
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
  isGameOver,
  answerMon,
  updateAnswerMon,
}) => {
  const monImageRef = useRef<HTMLImageElement | null>(null);

  const handleOnSuccess = useCallback(() => {
    const $monImg = monImageRef.current;
    if ($monImg) {
      const clientRect = $monImg.getClientRects()[0];
      burstStar({
        top: clientRect.top,
        left: clientRect.left,
        color: ["#F59E0B", "#3B82F6", "#DB2777", "#7C3AED"],
        count: 8,
        radius: { 10: 30 },
        degree: 360,
        opacity: { 1: 0 },
      });
    }
    onSuccess();
  }, [onSuccess]);

  return (
    <div css={tw`flex`}>
      <OverlaidGameGrid
        currentColumn={currentColumn}
        stackedMonImages={stackedMonImages}
        duration={duration}
        currentMonImage={currentMonImage}
        onStack={onStack}
        monImageRef={monImageRef}
        onClickMon={isGameOver ? updateAnswerMon : undefined}
      />
      <div css={tw`ml-4 flex flex-col justify-between`}>
        <div>
          <Score count={score} />
          <Combo count={combo} />
        </div>
        <div>
          <div css={tw`my-4`}>
            <TargetMon
              monImage={isGameOver ? answerMon?.image : currentMonImage}
              nextMonImage={nextMonImage}
              monNames={isGameOver ? answerMon?.names : undefined}
            />
          </div>
          <MonNameInput
            correctAnswers={answers}
            onSkip={onSkip}
            onSubmit={handleOnSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default GamePanel;
