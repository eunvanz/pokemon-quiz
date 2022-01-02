import { composeStories } from "@storybook/testing-react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderStory } from "~/helpers/testHelpers";
import { MonNameInputProps } from "./MonNameInput";
import * as stories from "./MonNameInput.stories";

const { Default } = composeStories(stories);

describe("MonNameInput", () => {
  const correctAnswer = "ditto";
  const onSubmit = jest.fn();

  describe("Default", () => {
    const setup = (props?: Partial<MonNameInputProps>) => renderStory(Default, props);

    it("matches with previous snapshot", () => {
      const { container } = setup();
      expect(container).toMatchSnapshot();
    });

    describe("when input is empty", () => {
      it("shows error message", async () => {
        setup({ correctAnswer, onSubmit });

        const fireBtn = screen.getByRole("button", { name: /Fire/ });

        userEvent.click(fireBtn);

        await waitFor(() => {
          expect(screen.getByText(/Input the answer/)).toBeInTheDocument();
        });
        expect(onSubmit).not.toBeCalled();
      });
    });

    describe("when wrong answer is submitted", () => {
      it("resets input and shows error message", async () => {
        setup({ correctAnswer, onSubmit });

        const input = screen.getByLabelText("mon name");

        userEvent.type(input, "pikachu");

        const fireBtn = screen.getByRole("button", { name: /Fire/ });

        userEvent.click(fireBtn);

        await waitFor(() => {
          expect(screen.getByText(/It's wrong answer/)).toBeInTheDocument();
        });
        expect(onSubmit).not.toBeCalled();
      });
    });

    describe("when correct answer is submitted", () => {
      it("calls [onSubmit] and reset field", async () => {
        setup({ correctAnswer, onSubmit });

        const input = screen.getByLabelText("mon name");

        userEvent.type(input, "ditto");

        const fireBtn = screen.getByRole("button", { name: /Fire/ });

        userEvent.click(fireBtn);

        await waitFor(() => {
          expect(onSubmit).toBeCalledWith("ditto");
        });
        expect(input).toHaveValue("");
      });
    });
  });
});
