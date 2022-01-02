import tw from "twin.macro";
import Button from "../Button";
import TextField from "../TextField";

export interface MonNameInputProps {}

const MonNameInput: React.FC<MonNameInputProps> = ({}) => {
  return (
    <div>
      <div css={tw`flex`}>
        <div css={tw`flex-1 pr-2`}>
          <TextField isBlock placeholder="Enter Pokémon's name" />
        </div>
        <Button css={tw`px-6`}>Fire (Enter)</Button>
      </div>
      <div css={tw`pt-2`}>
        <Button css={tw`w-full`} color="secondary">
          Skip (Space bar)
        </Button>
      </div>
    </div>
  );
};

export default MonNameInput;
