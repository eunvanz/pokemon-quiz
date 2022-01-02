import { composeStories } from "@storybook/testing-react";
import { renderStory } from "~/helpers/testHelpers";
import { TextFieldProps } from "./TextField";
import * as stories from "./TextField.stories";

const { Default, Disabled, Error } = composeStories(stories);

describe("TextField", () => {
  describe("Default", () => {
    const setup = (props?: Partial<TextFieldProps>) => renderStory(Default, props);

    it("matches with previous snapshot.", () => {
      const { container } = setup();
      expect(container).toMatchSnapshot();
    });
  });

  describe("Disabled", () => {
    const setup = (props?: Partial<TextFieldProps>) => renderStory(Disabled, props);

    it("matches with previous snapshot.", () => {
      const { container } = setup();
      expect(container).toMatchSnapshot();
    });
  });

  describe("Error", () => {
    const setup = (props?: Partial<TextFieldProps>) => renderStory(Error, props);

    it("matches with previous snapshot.", () => {
      const { container } = setup();
      expect(container).toMatchSnapshot();
    });
  });
});
