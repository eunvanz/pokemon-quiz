import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import mockMons from "~/mocks/mons";
import SelectGeneration from "./SelectGeneration";

export default {
  title: "components/SelectGeneration",
  component: SelectGeneration,
  args: {
    mons: mockMons.allMons,
  },
} as ComponentMeta<typeof SelectGeneration>;

const Template: ComponentStory<typeof SelectGeneration> = (args) => (
  <SelectGeneration {...args} />
);

export const Default = createStoryComponent(Template);
