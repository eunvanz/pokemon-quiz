import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import { TestProvider } from "~/helpers/testHelpers";
import mockMons from "~/mocks/mons";
import GamePanelContainer from "./GamePanelContainer";

export default {
  title: "containers/GamePanelContainer",
  component: GamePanelContainer,
  args: {},
} as ComponentMeta<typeof GamePanelContainer>;

const Template: ComponentStory<typeof GamePanelContainer> = () => (
  <TestProvider api={{ getAllMons: () => Promise.resolve(mockMons.allMons) }}>
    <GamePanelContainer />
  </TestProvider>
);

export const Default = createStoryComponent(Template);
