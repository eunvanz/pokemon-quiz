import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Score from "./Score";

export default {
  title: "components/Score",
  component: Score,
  args: {
    label: "Score",
    count: 1234567,
  },
} as ComponentMeta<typeof Score>;

const Template: ComponentStory<typeof Score> = (args) => <Score {...args} />;

export const Default = createStoryComponent(Template);
