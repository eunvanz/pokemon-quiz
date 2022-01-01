import { Story } from "@storybook/react";

export function createStoryComponent<T>(Template: Story<T>, args?: Partial<T>) {
  const component = Template.bind({});
  if (args) {
    component.args = args;
  }
  return component;
}
