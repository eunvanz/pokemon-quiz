import AnimatedNumber from "react-awesome-animated-number";
import tw from "twin.macro";
import "react-awesome-animated-number/dist/index.css";

export interface ScoreProps {
  label: string;
  count: number;
}

const Score: React.FC<ScoreProps> = ({ label, count }) => {
  return (
    <div css={tw`text-xl flex justify-between w-full`}>
      <div css={tw`mt-0.5 mr-1`}>{label}</div>
      <div css={tw`text-blue-600`}>
        <AnimatedNumber hasComma value={count} size={28} />
      </div>
    </div>
  );
};

export default Score;
