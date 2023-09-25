import React, { useCallback, useEffect, useRef, useState } from "react";
import tw from "twin.macro";
import { burstStar } from "~/helpers/mojs";
import { GameController } from "~/hooks/useGameController";
import Combo from "../Combo";
import GameOver from "../GameOver";
import GameOverNext from "../GameOverNext";
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
  onNext,
  maxCombo,
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

  const [isGameOverScreenVisible, setIsGameOverScreenVisible] = useState(false);

  useEffect(() => {
    if (isGameOver) {
      setIsGameOverScreenVisible(true);
    }
  }, [isGameOver]);

  return (
    <>
      <div css={tw`flex justify-center items-center w-full h-screen`}>
        <OverlaidGameGrid
          currentColumn={currentColumn}
          stackedMonImages={stackedMonImages}
          duration={duration}
          currentMonImage={currentMonImage}
          onStack={onStack}
          monImageRef={monImageRef}
          onClickMon={isGameOver ? updateAnswerMon : undefined}
        />
        <div css={tw`ml-4 flex flex-col justify-between gap-4`}>
          <div css={tw`flex flex-col gap-2`}>
            <Score label="Score" count={score} />
            <Score label="Max Combos" count={maxCombo > 1 ? maxCombo : 0} />
          </div>
          <Combo count={combo} />
          <div>
            <div css={tw`my-4`}>
              <TargetMon
                monImage={isGameOver ? answerMon?.image : currentMonImage}
                nextMonImage={nextMonImage}
                monNames={isGameOver ? answerMon?.names : undefined}
              />
            </div>
            {isGameOver ? (
              <GameOverNext onNext={onNext} />
            ) : (
              <MonNameInput
                correctAnswers={answers}
                onSkip={onSkip}
                onSubmit={handleOnSuccess}
              />
            )}
          </div>
        </div>
      </div>
      <GameOver
        isVisible={isGameOverScreenVisible}
        onHide={() => setIsGameOverScreenVisible(false)}
      />
    </>
  );
};

export default GamePanel;
