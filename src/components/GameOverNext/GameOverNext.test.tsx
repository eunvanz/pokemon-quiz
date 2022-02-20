import { ComponentProps } from "react";
import { composeStories } from "@storybook/testing-react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderStory } from "~/helpers/testHelpers";
import GameOverNext from "./GameOverNext";
import * as stories from "./GameOverNext.stories";

const { Default } = composeStories(stories);

describe("GameOverNext", () => {
  const setup = (props?: ComponentProps<typeof GameOverNext>) =>
    renderStory(Default, props);

  it("matches with previous snapshot.", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("calls [onNext] callback correctly", () => {
    const onNext = jest.fn();
    setup({ onNext });

    const nextBtn = screen.getByRole("button", { name: /check your rank/i });

    userEvent.click(nextBtn);

    expect(onNext).toBeCalledTimes(1);
  });
});
