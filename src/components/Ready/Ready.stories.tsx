import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Ready from "./Ready";

export default {
  title: "components/Ready",
  component: Ready,
  args: {},
} as ComponentMeta<typeof Ready>;

const Template: ComponentStory<typeof Ready> = (args) => <Ready {...args} />;

export const Default = createStoryComponent(Template);
