import tw from "twin.macro";
import Button from "../Button";

export interface GameOverNextProps {
  onNext: VoidFunction;
}

const GameOverNext: React.FC<GameOverNextProps> = ({ onNext }) => {
  return (
    <div css={tw`flex flex-col items-center`}>
      <h1>Click a Pokémon to check the answer</h1>
      <h3>or</h3>
      <Button css={tw`w-full`} onClick={onNext}>
        Check your rank
      </Button>
    </div>
  );
};

export default GameOverNext;
