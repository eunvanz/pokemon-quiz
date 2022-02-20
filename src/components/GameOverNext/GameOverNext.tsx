import tw from "twin.macro";
import Button from "../Button";

export interface GameOverNextProps {
  onNext: VoidFunction;
}

const GameOverNext: React.FC<GameOverNextProps> = ({ onNext }) => {
  return (
    <div css={tw`flex flex-col items-center`}>
      <h1 css={tw`animate-pulse`}>Click Pokémons to check the answers</h1>
      <h3 css={tw`text-gray-500 mb-2`}>or</h3>
      <Button css={tw`w-full`} onClick={onNext}>
        Check your rank
      </Button>
    </div>
  );
};

export default GameOverNext;
