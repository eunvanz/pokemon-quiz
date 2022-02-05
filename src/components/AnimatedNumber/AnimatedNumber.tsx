import { useEffect, useRef, useState } from "react";
import tw from "twin.macro";

export interface AnimatedNumberProps {
  number: number;
  size: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ number, size }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const numberWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(number);
  }, [number]);

  useEffect(() => {
    const $numberWrapper = numberWrapperRef.current;
    if ($numberWrapper) {
      $numberWrapper.style.transform = `translateY(${size * currentIndex * -1}px)`;
    }
  }, [currentIndex, size]);

  return (
    <div
      css={[
        tw`overflow-hidden inline-block`,
        {
          height: size,
        },
      ]}
    >
      <div ref={numberWrapperRef} css={{ transition: "transform ease-out 0.2s" }}>
        {Array.from({ length: 10 }).map((_, number) => (
          <div
            key={number}
            css={[tw`text-center`, { fontSize: size, height: size, lineHeight: 1 }]}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedNumber;
