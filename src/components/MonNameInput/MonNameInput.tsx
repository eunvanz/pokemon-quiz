import { useCallback } from "react";
import { useForm } from "react-hook-form";
import tw from "twin.macro";
import Button from "../Button";
import TextField from "../TextField";

export interface MonNameInputProps {
  onSubmit: (name: string) => void;
  correctAnswer: string;
}

const MonNameInput: React.FC<MonNameInputProps> = ({ onSubmit, correctAnswer }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = useForm();

  const handleOnSubmit = useCallback(({ monName }) => {
    if (monName === correctAnswer) {
      onSubmit(monName);
      setValue("monName", "");
    } else {
      setError("monName", { message: "It's wrong answer" });
      setValue("monName", "");
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div css={tw`flex`}>
        <div css={tw`flex-1 pr-2`}>
          <TextField
            {...register("monName", { required: "Input the answer" })}
            aria-label="mon name"
            isBlock
            placeholder="Enter Pokémon's name"
            hasError={!!errors.monName}
            errorMessage={errors.monName?.message}
          />
        </div>
        <Button css={tw`px-6`} type="submit">
          Fire (Enter)
        </Button>
      </div>
      <div css={tw`pt-2`}>
        <Button css={tw`w-full`} color="secondary">
          Skip (Space bar)
        </Button>
      </div>
    </form>
  );
};

export default MonNameInput;
