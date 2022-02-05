import { useEffect, useRef, useState } from "react";
import tw from "twin.macro";

export interface AnimatedNumberProps {
  number: number;
  size: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ number, size }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [numberElementSize, setNumberElementSize] = useState(0);

  const numberWrapperRef = useRef<HTMLDivElement>(null);

  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(number);
  }, [number]);

  useEffect(() => {
    const $numberWrapper = numberWrapperRef.current;
    if ($numberWrapper) {
      $numberWrapper.style.transform = `translateY(${
        numberElementSize * currentIndex * -1
      }px)`;
    }
  }, [currentIndex]);

  useEffect(() => {
    const $number = numberRef.current;
    if ($number) {
      setNumberElementSize($number.getClientRects()[0].height);
    }
  }, []);

  return (
    <div
      css={[
        tw`overflow-hidden inline-block`,
        {
          height: size * 1.5,
        },
      ]}
    >
      <div ref={numberWrapperRef} css={{ transition: "transform ease-out 0.2s" }}>
        {Array.from({ length: 10 }).map((_, number) => (
          <div
            ref={number === 0 ? numberRef : undefined}
            key={number}
            css={[{ fontSize: size }]}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedNumber;
