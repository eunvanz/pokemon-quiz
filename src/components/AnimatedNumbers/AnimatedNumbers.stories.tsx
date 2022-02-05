import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import AnimatedNumbers from "./AnimatedNumbers";

export default {
  title: "components/AnimatedNumbers",
  component: AnimatedNumbers,
  args: {
    number: 123456,
    size: 18,
    hasComma: true,
  },
} as ComponentMeta<typeof AnimatedNumbers>;

const Template: ComponentStory<typeof AnimatedNumbers> = (args) => (
  <AnimatedNumbers {...args} />
);

export const Default = createStoryComponent(Template);
