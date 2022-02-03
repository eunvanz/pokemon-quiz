import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import TargetMon from "./TargetMon";

export default {
  title: "components/TargetMon",
  component: TargetMon,
  args: {
    monImage:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png",
    nextMonImage:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
  },
} as ComponentMeta<typeof TargetMon>;

const Template: ComponentStory<typeof TargetMon> = (args) => <TargetMon {...args} />;

export const Default = createStoryComponent(Template);
