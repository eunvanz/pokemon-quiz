import { Story } from "@storybook/react";
import { render, RenderOptions } from "@testing-library/react";

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
