import { Story } from "@storybook/react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClientProvider } from "react-query";
import api from "~/api";
import { ApiProvider } from "~/api/apiContext";
import { queryClient } from "./reactQuery";

/**
 * render storybook component in test code
 * @param StoryComponent
 * @param props
 * @returns
 */
export const renderStory = <T,>(
  StoryComponent: Story<Partial<T>>,
  props?: Partial<T>,
  renderOptions?: RenderOptions,
) => {
  return render(<StoryComponent {...props} />, renderOptions);
};

export interface TestProviderProps {
  api: Partial<typeof api>;
}

export const TestProvider: React.FC<TestProviderProps> = ({ children, api }) => (
  <ApiProvider api={api}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </ApiProvider>
);
