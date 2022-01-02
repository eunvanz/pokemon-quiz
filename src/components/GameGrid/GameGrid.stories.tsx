import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import GameGrid from "./GameGrid";

export default {
  title: "components/GameGrid",
  component: GameGrid,
  args: {
    width: 300,
  },
} as ComponentMeta<typeof GameGrid>;

const Template: ComponentStory<typeof GameGrid> = (args) => <GameGrid {...args} />;

export const Default = createStoryComponent(Template);
