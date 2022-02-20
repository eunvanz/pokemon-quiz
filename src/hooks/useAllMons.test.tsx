import { renderHook } from "@testing-library/react-hooks";
import api from "~/api";
import { TestProvider } from "~/helpers/testHelpers";
import mockMons from "~/mocks/mons";
import useAllMons from "./useAllMons";
import * as useGeneration from "./useGeneration";

describe("useAllMons", () => {
  const mockApi: Partial<typeof api> = {
    getAllMons: () => Promise.resolve(mockMons.allMons),
  };

  const setup = () => {
    return renderHook(() => useAllMons(), {
      wrapper: ({ children }) => <TestProvider api={mockApi}>{children}</TestProvider>,
    });
  };

  describe("generationMons", () => {
    describe("when generation is above 0", () => {
      it("returns mons of certain generation", async () => {
        jest.spyOn(useGeneration, "default").mockImplementation(() => ({
          generation: 2,
          setGeneration: jest.fn(),
        }));

        const { result, waitFor } = setup();

        await waitFor(() => {
          expect(result.current.generationMons).toEqual(
            mockMons.allMons.filter((mon) => mon.id > 151 && mon.id <= 251),
          );
        });
      });
    });

    describe("when generation is 0", () => {
      it("returns all mons", async () => {
        jest.spyOn(useGeneration, "default").mockImplementation(() => ({
          generation: 0,
          setGeneration: jest.fn(),
        }));

        const { result, waitFor } = setup();

        await waitFor(() => {
          expect(result.current.generationMons).toEqual(mockMons.allMons);
        });
      });
    });
  });
});
