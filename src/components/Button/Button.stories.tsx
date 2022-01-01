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

export const Primary = createStoryComponent(Template);

export const Secondary = createStoryComponent(Template, {
  color: "secondary",
});

export const Disabled = createStoryComponent(Template, {
  disabled: true,
});
