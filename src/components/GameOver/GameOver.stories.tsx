import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import GameOver from "./GameOver";

export default {
  title: "components/GameOver",
  component: GameOver,
  args: {
    isVisible: true,
  },
} as ComponentMeta<typeof GameOver>;

const Template: ComponentStory<typeof GameOver> = (args) => <GameOver {...args} />;

export const Default = createStoryComponent(Template);
