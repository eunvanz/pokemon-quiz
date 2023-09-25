import { useCallback, useEffect, useRef, useState } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import tw from "twin.macro";
import { Generation } from "~/types";
import Button from "../Button";
import "swiper/swiper.min.css";

export interface SelectGenerationProps {
  onStart: (generation: Generation) => void;
}

const SelectGeneration: React.FC<SelectGenerationProps> = ({ onStart }) => {
  const swiperRef = useRef<SwiperCore>();

  const [generation, setGeneration] = useState<Generation>(0);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        swiperRef.current?.slidePrev();
      } else if (e.key === "ArrowRight") {
        swiperRef.current?.slideNext();
      } else if (e.key === "Enter") {
        onStart(generation);
      }
    },
    [onStart],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  return (
    <div css={tw`flex-col`}>
      <div css={tw`text-3xl text-center text-primary animate-pulse`}>
        CHOOSE A GENERATION TO CHALLENGE
      </div>
      <Swiper
        css={tw`text-center text-4xl my-20`}
        navigation
        onSlideChange={(e) => setGeneration((e.activeIndex - 1) as Generation)}
        loop
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {[
          "All Generations",
          "Generation I",
          "Generation II",
          "Generation III",
          "Generation IV",
          "Generation V",
          "Generation VI",
          "Generation VII",
          "Generation VIII",
          "Generation IX",
        ].map((text) => (
          <SwiperSlide key={text}>{text}</SwiperSlide>
        ))}
      </Swiper>
      <div css={tw`flex justify-between w-1/2 mx-auto`}>
        <Button
          isBlock
          css={tw`mr-1`}
          variant="outlined"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          Previous
        </Button>
        <Button
          isBlock
          css={tw`ml-1`}
          variant="outlined"
          onClick={() => swiperRef.current?.slideNext()}
        >
          Next
        </Button>
      </div>
      <div css={tw`mx-auto w-1/2 mt-4`}>
        <Button isBlock onClick={() => onStart(generation)}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default SelectGeneration;
