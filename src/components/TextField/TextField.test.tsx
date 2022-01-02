import { ComponentProps } from "react";
import { composeStories } from "@storybook/testing-react";
import { renderStory } from "~/helpers/testHelpers";
import TextField from "./TextField";
import * as stories from "./TextField.stories";

const { Default, Block, Disabled, Error } = composeStories(stories);

describe("TextField", () => {
  describe("Default", () => {
    const setup = (props?: ComponentProps<typeof TextField>) =>
      renderStory(Default, props);

    it("matches with previous snapshot.", () => {
      const { container } = setup();
      expect(container).toMatchSnapshot();
    });
  });

  describe("Block", () => {
    const setup = (props?: ComponentProps<typeof TextField>) => renderStory(Block, props);

    it("matches with previous snapshot.", () => {
      const { container } = setup();
      expect(container).toMatchSnapshot();
    });
  });

  describe("Disabled", () => {
    const setup = (props?: ComponentProps<typeof TextField>) =>
      renderStory(Disabled, props);

    it("matches with previous snapshot.", () => {
      const { container } = setup();
      expect(container).toMatchSnapshot();
    });
  });

  describe("Error", () => {
    const setup = (props?: ComponentProps<typeof TextField>) => renderStory(Error, props);

    it("matches with previous snapshot.", () => {
      const { container } = setup();
      expect(container).toMatchSnapshot();
    });
  });
});
