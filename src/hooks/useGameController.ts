import { useCallback, useEffect, useMemo, useState } from "react";
import { random } from "lodash-es";
import { Mon } from "~/types";
import useAnswerMon from "./useAnswerMon";
import useCombo from "./useCombo";
import useMonImages from "./useMonImages";
import useScore from "./useScore";
import useStage from "./useStage";

export interface GameController {
  duration: number;
  onStack: VoidFunction;
  onSuccess: VoidFunction;
  isLoading: boolean;
  resetGame: VoidFunction;
  currentMonImage?: string;
  nextMonImage?: string;
  currentColumn: number;
  stackedMonImages: string[][];
  achievedMonImages: string[];
  combo: number;
  score: number;
  answers: string[];
  onSkip: VoidFunction;
  isGameOver: boolean;
  answerMon?: Mon;
  updateAnswerMon: (monImage: string) => void;
  onNext: VoidFunction;
}

export const INITIAL_DURATION = 20;
const MIN_DURATION = 5;

const useGameController: () => GameController = () => {
  const [duration, setDuration] = useState(INITIAL_DURATION);

  const [currentColumn, setCurrentColumn] = useState(random(0, 5));

  const { stage } = useStage();

  const { combo, resetCombo, incrementCombo } = useCombo();

  const { score, increaseScore, resetScore } = useScore();

  const [startTime, setStartTime] = useState(0);

  const {
    currentMonImage,
    nextMonImage,
    isMonImagesLoading,
    pushAchievedMonImage,
    pushStackedMonImage,
    achievedMonImages,
    resetMonImages,
    stackedMonImages,
    allMons,
    isGameOver,
  } = useMonImages();

  const { answerMon, setAnswerMon } = useAnswerMon();

  const answers = useMemo(() => {
    return allMons?.find((mon) => mon.image === currentMonImage)?.names.split(",") || [];
  }, [allMons, currentMonImage]);

  const changeCurrentColumn = useCallback(() => {
    const getDifferentColumn: () => number = () => {
      const nextColumn = random(0, 5);
      if (nextColumn === currentColumn) {
        return getDifferentColumn();
      }
      return nextColumn;
    };
    setCurrentColumn(getDifferentColumn());
  }, [currentColumn]);

  const changeDuration = useCallback(() => {
    if (allMons?.length && stage > 0) {
      const total = allMons.length;
      const stageRatio = stage / total;
      const durationInterval = INITIAL_DURATION - MIN_DURATION;
      const currentDuration = INITIAL_DURATION - durationInterval * stageRatio;
      setDuration(currentDuration);
    }
  }, [allMons?.length, stage]);

  const onStack = useCallback(() => {
    if (currentMonImage) {
      pushStackedMonImage(currentMonImage, currentColumn);
      resetCombo();
    }
  }, [currentMonImage, currentColumn]);

  const onSuccess = useCallback(() => {
    if (currentMonImage) {
      pushAchievedMonImage(currentMonImage);
      const wastedTime = Date.now() - startTime;
      increaseScore(wastedTime, combo);
      incrementCombo();
    }
  }, [currentMonImage, combo, startTime]);

  const resetGame = useCallback(() => {
    resetMonImages();
    setDuration(INITIAL_DURATION);
    resetCombo();
    resetScore();
  }, []);

  const onSkip = useCallback(() => {
    onStack();
  }, [onStack]);

  useEffect(() => {
    changeCurrentColumn();
    changeDuration();
    setStartTime(Date.now());
  }, [currentMonImage]);

  const updateAnswerMon = useCallback(
    (monImage: string) => {
      const mon = allMons?.find((mon) => mon.image === monImage);
      setAnswerMon(mon);
    },
    [allMons],
  );

  const onNext = useCallback(() => {}, []);

  return {
    duration,
    currentColumn,
    currentMonImage,
    stackedMonImages,
    achievedMonImages,
    onStack,
    onSuccess,
    isLoading: isMonImagesLoading,
    resetGame,
    score,
    combo,
    answers,
    onSkip,
    nextMonImage,
    isGameOver,
    answerMon,
    updateAnswerMon,
    onNext,
  };
};

export default useGameController;
