import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import TextField from "./TextField";

export default {
  title: "components/TextField",
  component: TextField,
  args: {
    placeholder: "Placeholder",
  },
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

export const Default = createStoryComponent(Template);

export const Disabled = createStoryComponent(Template, {
  disabled: true,
});

export const Error = createStoryComponent(Template, {
  hasError: true,
  errorMessage: "It's wrong answer",
});
