import AnimatedNumbers from "react-animated-numbers";
import tw from "twin.macro";

export interface ScoreProps {
  count: number;
}

const Score: React.FC<ScoreProps> = ({ count }) => {
  return (
    <div css={tw`text-xl`}>
      <span>Score</span>
      <AnimatedNumbers includeComma animateToNumber={count} />
    </div>
  );
};

export default Score;
