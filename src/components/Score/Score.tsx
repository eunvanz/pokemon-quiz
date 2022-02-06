import AnimatedNumber from "react-awesome-animated-number";
import tw from "twin.macro";
import "react-awesome-animated-number/dist/index.css";

export interface ScoreProps {
  count: number;
}

const Score: React.FC<ScoreProps> = ({ count }) => {
  return (
    <div css={tw`text-xl flex`}>
      <div css={tw`mt-0.5 mr-1`}>Score</div>
      <div css={tw`text-blue-600`}>
        <AnimatedNumber hasComma value={count} size={28} />
      </div>
    </div>
  );
};

export default Score;
