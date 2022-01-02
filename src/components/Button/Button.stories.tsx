import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Button, { ButtonProps } from "./Button";

export default {
  title: "components/Button",
  component: Button,
  args: {
    children: "Button Label",
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => (
  <Button {...args} />
);

export const Contained = createStoryComponent(Template);

export const Outlined = createStoryComponent(Template, {
  variant: "outlined",
});

export const Disabled = createStoryComponent(Template, {
  disabled: true,
});
