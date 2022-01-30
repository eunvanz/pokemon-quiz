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
    duration: 10,
    stackedMonImages: [
      [
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
      ],
      [],
      [
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      ],
      [
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
      ],
      [],
      [
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png",
      ],
    ],
  },
} as ComponentMeta<typeof OverlaidGameGrid>;

const Template: ComponentStory<typeof OverlaidGameGrid> = (args) => (
  <OverlaidGameGrid {...args} />
);

export const Default = createStoryComponent(Template);
