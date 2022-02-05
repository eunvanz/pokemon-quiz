import { Fragment, useMemo } from "react";
import tw from "twin.macro";
import AnimatedNumber from "../AnimatedNumber";

export interface AnimatedNumbersProps {
  number: number;
  size: number;
  hasComma?: boolean;
}

const AnimatedNumbers: React.FC<AnimatedNumbersProps> = ({ number, size, hasComma }) => {
  const numberArray = useMemo(() => {
    return String(number).split("");
  }, [number]);

  return (
    <div css={[tw`inline-flex`, { height: size }]}>
      {numberArray.map((number, index) => (
        <Fragment key={index}>
          {hasComma && (numberArray.length - index) % 3 === 0 && index !== 0 && (
            <div
              css={[
                tw`inline-block`,
                {
                  fontSize: size,
                  height: size,
                  lineHeight: 1,
                },
              ]}
            >
              ,
            </div>
          )}
          <AnimatedNumber number={Number(number)} size={size} />
        </Fragment>
      ))}
    </div>
  );
};

export default AnimatedNumbers;
