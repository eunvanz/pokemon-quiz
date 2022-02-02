import { renderHook } from "@testing-library/react-hooks";
import useGameController from "./useGameController";

describe("useGameController", () => {
  const setup = () => {
    return renderHook(() => useGameController());
  };

  describe("onStack", () => {
    it.todo(
      "stacks [currentMonImage] to [stackedMonImages] at [currentColumn]",
      () => {},
    );
  });
});
