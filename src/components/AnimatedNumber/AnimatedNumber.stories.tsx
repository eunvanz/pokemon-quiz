import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import AnimatedNumber from "./AnimatedNumber";

export default {
  title: "components/AnimatedNumber",
  component: AnimatedNumber,
  args: {
    number: 3,
    size: 18,
  },
} as ComponentMeta<typeof AnimatedNumber>;

const Template: ComponentStory<typeof AnimatedNumber> = (args) => (
  <AnimatedNumber {...args} />
);

export const Default = createStoryComponent(Template);
