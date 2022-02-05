import tw from "twin.macro";
import AnimatedNumbers from "../AnimatedNumbers";

export interface ScoreProps {
  count: number;
}

const Score: React.FC<ScoreProps> = ({ count }) => {
  return (
    <div css={tw`text-xl flex`}>
      <div css={tw`mt-1 mr-1`}>Score</div>
      <div css={tw`text-blue-600`}>
        <AnimatedNumbers hasComma number={count} size={28} />
      </div>
    </div>
  );
};

export default Score;
