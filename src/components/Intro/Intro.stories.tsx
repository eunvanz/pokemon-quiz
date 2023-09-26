import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import mockMons from "~/mocks/mons";
import Intro from "./Intro";

export default {
  title: "components/Intro",
  component: Intro,
  args: {
    mons: mockMons.allMons,
  },
} as ComponentMeta<typeof Intro>;

const Template: ComponentStory<typeof Intro> = (args) => <Intro {...args} />;

export const Default = createStoryComponent(Template);
