import { composeStories } from "@storybook/testing-react";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderStory } from "~/helpers/testHelpers";
import { MonNameInputProps } from "./MonNameInput";
import * as stories from "./MonNameInput.stories";

const { Default } = composeStories(stories);

describe("MonNameInput", () => {
  const correctAnswer = "ditto";
  const onSubmit = jest.fn();
  const onSkip = jest.fn();

  describe("Default", () => {
    const setup = (props?: Partial<MonNameInputProps>) => renderStory(Default, props);

    it("matches with previous snapshot", () => {
      const { container } = setup();
      expect(container).toMatchSnapshot();
    });

    it("has [autocomplete] attribute as [off]", () => {
      setup();

      const input = screen.getByLabelText("mon name");

      expect(input.getAttribute("autocomplete")).toBe("off");
    });

    it("focuses input after click [Fire] button", async () => {
      setup({ correctAnswer });

      const fireBtn = screen.getByRole("button", { name: /fire/i });

      userEvent.click(fireBtn);

      const input = screen.getByLabelText("mon name");

      expect(input).toHaveFocus();

      await waitFor(() => {
        expect(screen.getByText(/Input the answer/)).toBeInTheDocument();
      });
    });

    it("focuses input after click [Skip] button", async () => {
      setup({ onSkip });

      const skipBtn = screen.getByRole("button", { name: /skip/i });

      userEvent.click(skipBtn);

      const input = screen.getByLabelText("mon name");

      await waitFor(() => {
        expect(input).toHaveFocus();
      });
    });

    describe("when input is empty", () => {
      it("shows error message", async () => {
        setup({ correctAnswer, onSubmit });

        const fireBtn = screen.getByRole("button", { name: /fire/i });

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

        const fireBtn = screen.getByRole("button", { name: /fire/i });

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

        const fireBtn = screen.getByRole("button", { name: /fire/i });

        userEvent.click(fireBtn);

        await waitFor(() => {
          expect(onSubmit).toBeCalledWith("ditto");
        });
        expect(input).toHaveValue("");
      });
    });

    describe("keyboard events", () => {
      describe("when press [Space]", () => {
        it("calls [onSkip] and reset value", async () => {
          setup({ onSkip });

          const input = screen.getByLabelText("mon name");

          userEvent.type(input, "wrongAnswer");
          userEvent.type(input, "[Space]");

          expect(onSkip).toBeCalled();

          await waitFor(() => {
            expect(input).toHaveValue("");
          });
        });
      });
    });
  });
});
