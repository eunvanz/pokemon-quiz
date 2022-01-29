import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import OverlaidGameGrid from "./OverlaidGameGrid";

export default {
  title: "components/OverlaidGameGrid",
  component: OverlaidGameGrid,
  args: {
    currentMonImage:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png",
    currentColumn: 3,
    duration: 20,
  },
} as ComponentMeta<typeof OverlaidGameGrid>;

const Template: ComponentStory<typeof OverlaidGameGrid> = (args) => (
  <OverlaidGameGrid {...args} />
);

export const Default = createStoryComponent(Template);
