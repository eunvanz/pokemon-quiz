import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import SelectGeneration from "./SelectGeneration";

export default {
  title: "components/SelectGeneration",
  component: SelectGeneration,
  args: {},
} as ComponentMeta<typeof SelectGeneration>;

const Template: ComponentStory<typeof SelectGeneration> = (args) => (
  <SelectGeneration {...args} />
);

export const Default = createStoryComponent(Template);
