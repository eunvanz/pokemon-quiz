import { Story } from "@storybook/react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter, MemoryRouterProps } from "react-router";
import { CommonProvider } from "~/App";
import api from "~/api";

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
  api?: Partial<typeof api>;
  routerProps?: MemoryRouterProps;
}

export const TestProvider: React.FC<TestProviderProps> = ({
  children,
  api = {},
  routerProps,
}) => (
  <CommonProvider api={api} router={MemoryRouter} routerProps={routerProps}>
    {children}
  </CommonProvider>
);
