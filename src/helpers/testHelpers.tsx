import { Story } from "@storybook/react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClientProvider } from "react-query";
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

export const TestProvider: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
