import { Fragment, useMemo } from "react";
import tw from "twin.macro";
import AnimatedNumber from "../AnimatedNumber";

export interface AnimatedNumbersProps {
  number: number;
  size: number;
  hasComma: boolean;
}

const AnimatedNumbers: React.FC<AnimatedNumbersProps> = ({ number, size, hasComma }) => {
  const numberArray = useMemo(() => {
    return String(number).split("");
  }, [number]);

  return (
    <div css={tw`inline-block`}>
      {numberArray.map((number, index) => (
        <Fragment key={index}>
          {hasComma && (numberArray.length - index) % 3 === 0 && index !== 0 && (
            <div
              css={[
                {
                  fontSize: size,
                  height: size * 1.5,
                  transform: `translateY(${-size / 2}px)`,
                },
                tw`inline-block`,
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
