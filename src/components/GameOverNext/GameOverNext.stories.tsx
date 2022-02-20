import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import GameOverNext from "./GameOverNext";

export default {
  title: "components/GameOverNext",
  component: GameOverNext,
  args: {},
} as ComponentMeta<typeof GameOverNext>;

const Template: ComponentStory<typeof GameOverNext> = (args) => (
  <GameOverNext {...args} />
);

export const Default = createStoryComponent(Template);
