import { act, renderHook } from "@testing-library/react-hooks";
import { TestProvider } from "~/helpers/testHelpers";
import mockMons from "~/mocks/mons";
import useMonImages from "./useMonImages";

describe("useMonImages", () => {
  const mockApi = {
    getAllMons: () => Promise.resolve(mockMons.allMons),
  };

  const setup = () => {
    return renderHook(() => useMonImages(), {
      wrapper: ({ children }) => <TestProvider api={mockApi}>{children}</TestProvider>,
    });
  };

  describe("currentMonImage", () => {
    it("returns a mon image which is neither achieved nor stacked", async () => {
      const { result, waitFor } = setup();

      await waitFor(() => {
        expect(result.current.currentMonImage).toBeTruthy();
      });
      expect(
        result.current.achievedMonImages.includes(result.current.currentMonImage!),
      ).toBe(false);
      Array.from({ length: 6 }).forEach((_, index) => {
        expect(
          result.current.stackedMonImages[index].includes(
            result.current.currentMonImage!,
          ),
        ).toBe(false);
      });
    });
  });

  describe("pushStackedMonImage", () => {
    it("adds a mon image to [stackedMonImage] in passed column", async () => {
      const { result, waitFor } = setup();

      await waitFor(() => {
        expect(result.current.currentMonImage).toBeTruthy();
      });

      act(() => result.current.pushStackedMonImage("testMonImageUrl1", 1));

      expect(result.current.stackedMonImages[1][0]).toBe("testMonImageUrl1");

      act(() => result.current.pushStackedMonImage("testMonImageUrl2", 1));

      expect(result.current.stackedMonImages[1][1]).toBe("testMonImageUrl2");
    });
  });

  describe("pushAchievedMonImage", () => {
    it("adds a mon image to [pushedAchievedMonImage]", async () => {
      const { result, waitFor } = setup();

      await waitFor(() => {
        expect(result.current.currentMonImage).toBeTruthy();
      });

      act(() => result.current.pushAchievedMonImage("testMonImageUrl"));

      expect(result.current.achievedMonImages).toEqual(["testMonImageUrl"]);
    });
  });
});
