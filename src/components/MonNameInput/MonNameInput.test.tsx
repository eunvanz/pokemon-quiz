import { composeStories } from "@storybook/testing-react";
import { screen } from "@testing-library/react";
import { renderStory } from "~/helpers/testHelpers";
import { MonNameInputProps } from "./MonNameInput";
import * as stories from "./MonNameInput.stories";

const { Default } = composeStories(stories);

describe("MonNameInput", () => {
  describe("Default", () => {
    const setup = (props?: Partial<MonNameInputProps>) => renderStory(Default, props);

    it("matches with previous snapshot", () => {
      const { container } = setup();
      expect(container).toMatchSnapshot();
    });

    describe("when input is empty", () => {
      it("can not be submitted", () => {});
    });

    describe("when wrong answer is submitted", () => {
      it("resets input and shows error message", () => {});
    });

    describe("when correct answer is submitted", () => {
      it("calls [onSubmit]", () => {});
    });
  });
});
