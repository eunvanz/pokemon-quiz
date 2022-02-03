import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import AnimatedText from "./AnimatedText";

export default {
  title: "components/AnimatedText",
  component: AnimatedText,
  args: {
    text: "0",
    size: 20,
  },
} as ComponentMeta<typeof AnimatedText>;

const Template: ComponentStory<typeof AnimatedText> = (args) => (
  <AnimatedText {...args} />
);

export const Default = createStoryComponent(Template);
