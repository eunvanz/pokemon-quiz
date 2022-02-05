import { act, renderHook } from "@testing-library/react-hooks";
import { TestProvider } from "~/helpers/testHelpers";
import mockMons from "~/mocks/mons";
import * as useCombo from "./useCombo";
import useGameController, { INITIAL_DURATION } from "./useGameController";
import * as useMonImages from "./useMonImages";
import * as useScore from "./useScore";

jest.mock("lodash-es", () => ({
  ...jest.requireActual("lodash-es"),
  random: () => 1,
}));

const pushAchievedMonImage = jest.fn();
const pushStackedMonImage = jest.fn();
const resetMonImages = jest.fn();
const generateMockUseMonImages = (
  impl?: Partial<ReturnType<typeof useMonImages.default>>,
) => {
  jest.spyOn(useMonImages, "default").mockImplementation(() => ({
    currentMonImage: "currentMonImage",
    nextMonImage: "nextMonImage",
    achievedMonImages: [],
    isMonImagesLoading: false,
    pushAchievedMonImage,
    pushStackedMonImage,
    resetMonImages,
    stackedMonImages: [[], [], [], [], [], []],
    allMons: mockMons.allMons,
    ...impl,
  }));
};

const resetCombo = jest.fn();
const incrementCombo = jest.fn();
const generateMockUseCombo = (impl?: Partial<ReturnType<typeof useCombo.default>>) => {
  jest.spyOn(useCombo, "default").mockImplementation(() => ({
    combo: 0,
    resetCombo,
    incrementCombo,
    ...impl,
  }));
};

const resetScore = jest.fn();
const increaseScore = jest.fn();
const generateMockUseScore = (impl?: Partial<ReturnType<typeof useCombo.default>>) => {
  jest.spyOn(useScore, "default").mockImplementation(() => ({
    score: 0,
    resetScore,
    increaseScore,
    ...impl,
  }));
};

describe("useGameController", () => {
  const setup = () => {
    return renderHook(() => useGameController(), {
      wrapper: ({ children }) => <TestProvider>{children}</TestProvider>,
    });
  };

  describe("onStack", () => {
    it("stacks [currentMonImage] to [stackedMonImages] at [currentColumn], resets combo", () => {
      generateMockUseMonImages();
      generateMockUseCombo();

      const { result } = setup();

      act(result.current.onStack);

      expect(pushStackedMonImage).toBeCalledWith("currentMonImage", 1);
      expect(resetCombo).toBeCalledTimes(1);
    });
  });

  describe("onSuccess", () => {
    it("pushes [currentMonImage] to [achievedMonImages], increments combo, increases score", () => {
      generateMockUseMonImages();
      generateMockUseCombo();
      generateMockUseScore();

      const { result } = setup();

      act(result.current.onSuccess);

      expect(pushAchievedMonImage).toBeCalledWith("currentMonImage");
      expect(incrementCombo).toBeCalledTimes(1);
      expect(increaseScore).toBeCalledTimes(1);
    });
  });

  describe("resetGame", () => {
    it("resets game state", () => {
      generateMockUseMonImages();
      generateMockUseCombo();
      generateMockUseScore();

      const { result } = setup();

      act(result.current.resetGame);

      expect(resetMonImages).toBeCalledTimes(1);
      expect(result.current.duration).toBe(INITIAL_DURATION);
      expect(resetCombo).toBeCalledTimes(1);
      expect(resetScore).toBeCalledTimes(1);
    });
  });

  describe("onSkip", () => {
    it("stacks as [onStack], sets duration as 0", () => {
      generateMockUseMonImages();
      generateMockUseCombo();

      const { result } = setup();

      act(result.current.onStack);

      expect(pushStackedMonImage).toBeCalledWith("currentMonImage", 1);
      expect(resetCombo).toBeCalledTimes(1);
      expect(result.current.duration).toBe(0);
    });
  });
});
