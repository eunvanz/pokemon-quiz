import { composeStories } from "@storybook/testing-react";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderStory } from "~/helpers/testHelpers";
import { MonNameInputProps } from "./MonNameInput";
import * as stories from "./MonNameInput.stories";

const { Default } = composeStories(stories);

describe("MonNameInput", () => {
  const correctAnswers = ["ditto", "메타몽"];
  const onSubmit = jest.fn();
  const onSkip = jest.fn();

  describe("Default", () => {
    const setup = (props?: Partial<MonNameInputProps>) => {
      const result = renderStory(Default, props);

      const input = screen.getByLabelText("mon name");

      const fireBtn = screen.getByRole("button", { name: /fire/i });

      const skipBtn = screen.getByRole("button", { name: /skip/i });

      return {
        ...result,
        input,
        fireBtn,
        skipBtn,
      };
    };

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
      const { fireBtn, input } = setup({ correctAnswers });

      userEvent.click(fireBtn);

      expect(input).toHaveFocus();

      await waitFor(() => {
        expect(screen.getByText(/Input the answer/)).toBeInTheDocument();
      });
    });

    it("focuses input and reset error after click [Skip] button", async () => {
      const { input, fireBtn, skipBtn } = setup({ correctAnswers, onSkip });

      userEvent.click(fireBtn);

      await waitFor(() => {
        expect(screen.getByText(/Input the answer/)).toBeInTheDocument();
      });

      userEvent.click(skipBtn);

      await waitFor(() => {
        expect(input).toHaveFocus();
      });
      expect(screen.queryByText(/It's wrong answer/)).not.toBeInTheDocument();
    });

    describe("when input is empty", () => {
      it("shows error message", async () => {
        const { fireBtn } = setup({ correctAnswers, onSubmit });

        userEvent.click(fireBtn);

        await waitFor(() => {
          expect(screen.getByText(/Input the answer/)).toBeInTheDocument();
        });
        expect(onSubmit).not.toBeCalled();
      });
    });

    describe("when wrong answer is submitted", () => {
      it("resets input and shows error message", async () => {
        const { input, fireBtn } = setup({ correctAnswers, onSubmit });

        userEvent.type(input, "pikachu");

        userEvent.click(fireBtn);

        await waitFor(() => {
          expect(screen.getByText(/It's wrong answer/)).toBeInTheDocument();
        });
        expect(onSubmit).not.toBeCalled();
      });
    });

    describe("when correct answer is submitted", () => {
      it("calls [onSubmit] and reset field", async () => {
        const { input, fireBtn } = setup({ correctAnswers, onSubmit });

        userEvent.type(input, "ditto");

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
          const { input } = setup({ onSkip });

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
