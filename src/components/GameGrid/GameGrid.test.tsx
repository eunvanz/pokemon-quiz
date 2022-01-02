import { composeStories } from "@storybook/testing-react";
import { screen } from "@testing-library/react";
import { renderStory } from "~/helpers/testHelpers";
import { GameGridProps } from "./GameGrid";
import * as stories from "./GameGrid.stories";

const { Default } = composeStories(stories);

describe("GameGrid", () => {
  const setup = (props?: Partial<GameGridProps>) => renderStory(Default, props);

  it("matches with previous snapshot", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  describe("gridItemSize", () => {
    it("grid items count should be [girdItemSize] ** 2 * 2", () => {
      const gridItemSize = 10;

      setup({ gridItemSize });

      const gridContainer = screen.getByTestId("game-grid-container");

      expect(gridContainer.childElementCount).toBe(200);
    });
  });
});
