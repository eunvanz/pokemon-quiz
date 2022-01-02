import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import MonNameInput from "./MonNameInput";

export default {
  title: "components/MonNameInput",
  component: MonNameInput,
  args: {
    correctAnswer: "ditto",
  },
} as ComponentMeta<typeof MonNameInput>;

const Template: ComponentStory<typeof MonNameInput> = (args) => (
  <MonNameInput {...args} />
);

export const Default = createStoryComponent(Template);
