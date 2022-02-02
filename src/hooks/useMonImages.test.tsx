import { renderHook } from "@testing-library/react-hooks";
import { TestProvider } from "~/helpers/testHelpers";
import useMonImages from "./useMonImages";

describe("useMonImages", () => {
  const setup = () => {
    return renderHook(() => useMonImages(), {
      wrapper: ({ children }) => <TestProvider>{children}</TestProvider>,
    });
  };
});
