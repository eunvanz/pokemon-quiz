import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import mockMons from "~/mocks/mons";
import Main from "./Main";

export default {
  title: "components/Main",
  component: Main,
  args: {
    mons: mockMons.allMons,
  },
} as ComponentMeta<typeof Main>;

const Template: ComponentStory<typeof Main> = (args) => <Main {...args} />;

export const Default = createStoryComponent(Template);
