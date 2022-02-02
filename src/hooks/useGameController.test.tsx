import { act, renderHook } from "@testing-library/react-hooks";
import { TestProvider } from "~/helpers/testHelpers";
import mockMons from "~/mocks/mons";
import useGameController, { INITIAL_DURATION } from "./useGameController";
import * as useMonImages from "./useMonImages";

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

describe("useGameController", () => {
  const setup = () => {
    return renderHook(() => useGameController(), {
      wrapper: ({ children }) => <TestProvider>{children}</TestProvider>,
    });
  };

  describe("onStack", () => {
    it("stacks [currentMonImage] to [stackedMonImages] at [currentColumn]", () => {
      generateMockUseMonImages();

      const { result } = setup();

      act(result.current.onStack);

      expect(pushStackedMonImage).toBeCalledWith("currentMonImage", 1);
    });
  });

  describe("onSuccess", () => {
    it("pushes [currentMonImage] to [achievedMonImages]", () => {
      generateMockUseMonImages();

      const { result } = setup();

      act(result.current.onSuccess);

      expect(pushAchievedMonImage).toBeCalledWith("currentMonImage");
    });
  });

  describe("resetGame", () => {
    it("resets game state", () => {
      generateMockUseMonImages();

      const { result } = setup();

      act(result.current.resetGame);

      expect(resetMonImages).toBeCalledTimes(1);
      expect(result.current.duration).toBe(INITIAL_DURATION);
    });
  });
});
