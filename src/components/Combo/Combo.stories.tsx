import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Combo from "./Combo";

export default {
  title: "components/Combo",
  component: Combo,
  args: {
    count: 2,
  },
} as ComponentMeta<typeof Combo>;

const Template: ComponentStory<typeof Combo> = (args) => <Combo {...args} />;

export const Default = createStoryComponent(Template);
