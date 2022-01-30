import { ComponentProps } from "react";
import { composeStories } from "@storybook/testing-react";
import { renderStory } from "~/helpers/testHelpers";
import OverlaidGameGrid from "./OverlaidGameGrid";
import * as stories from "./OverlaidGameGrid.stories";

const { Default } = composeStories(stories);

describe("OverlaidGameGrid", () => {
  const setup = (props?: ComponentProps<typeof OverlaidGameGrid>) =>
    renderStory(Default, props);

  it("matches with previous snapshot.", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
