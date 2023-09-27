import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import { TestProvider } from "~/helpers/testHelpers";
import mockMons from "~/mocks/mons";
import MainContainer from "./MainContainer";

export default {
  title: "containers/MainContainer",
  component: MainContainer,
  args: {},
} as ComponentMeta<typeof MainContainer>;

const Template: ComponentStory<typeof MainContainer> = () => (
  <TestProvider api={{ getAllMons: () => Promise.resolve(mockMons.allMons) }}>
    <MainContainer />
  </TestProvider>
);

export const Default = createStoryComponent(Template);
