import { useCallback, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import tw from "twin.macro";
import Button from "../Button";
import TextField from "../TextField";

export interface MonNameInputProps {
  onSubmit: (name: string) => void;
  correctAnswer: string;
  onSkip: VoidFunction;
}

const MonNameInput: React.FC<MonNameInputProps> = ({
  onSubmit,
  correctAnswer,
  onSkip,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = useForm();

  const resetValue = useCallback(() => {
    setValue("monName", "");
  }, []);

  const monNameInputRef = useRef<HTMLInputElement | null>();

  const handleOnSubmit = useCallback(
    ({ monName }) => {
      if (monName === correctAnswer) {
        onSubmit(monName);
        resetValue();
      } else {
        setError("monName", { message: "It's wrong answer" });
        resetValue();
      }
    },
    [correctAnswer, onSubmit],
  );

  const { ref: monNameInputFormRef, ...restTextFieldProps } = useMemo(() => {
    return register("monName", { required: "Input the answer" });
  }, []);

  useEffect(() => {
    const skipOnSpaceKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        onSkip();
        resetValue();
      }
    };
    monNameInputRef.current?.addEventListener("keydown", skipOnSpaceKeyDown);
    return () => {
      monNameInputRef.current?.removeEventListener("keydown", skipOnSpaceKeyDown);
    };
  }, [onSkip]);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div css={tw`flex`}>
        <div css={tw`flex-1 pr-2`}>
          <TextField
            {...restTextFieldProps}
            ref={(e) => {
              monNameInputFormRef(e);
              monNameInputRef.current = e;
            }}
            aria-label="mon name"
            isBlock
            placeholder="Enter Pokémon's name"
            hasError={!!errors.monName}
            errorMessage={errors.monName?.message}
            autoComplete="off"
          />
        </div>
        <Button css={tw`px-6`} type="submit">
          Fire (Enter)
        </Button>
      </div>
      <div css={tw`pt-2`}>
        <Button css={tw`w-full`} color="secondary" onClick={onSkip}>
          Skip (Space bar)
        </Button>
      </div>
    </form>
  );
};

export default MonNameInput;
