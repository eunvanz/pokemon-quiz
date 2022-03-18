import { useRef } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import tw from "twin.macro";
import { Generation } from "~/types";
import Button from "../Button";
import "swiper/swiper.min.css";

export interface SelectGenerationProps {
  onSelect: (generation: Generation) => void;
}

const SelectGeneration: React.FC<SelectGenerationProps> = ({ onSelect }) => {
  const swiperRef = useRef<SwiperCore>();

  return (
    <div css={tw`flex-col`}>
      <Swiper
        css={tw`text-center text-4xl my-20`}
        navigation
        onSlideChange={(e) => onSelect(e.activeIndex as Generation)}
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
        ].map((text) => (
          <SwiperSlide key={text}>{text}</SwiperSlide>
        ))}
      </Swiper>
      <div css={tw`flex justify-between`}>
        <Button isBlock css={tw`mr-1`} onClick={() => swiperRef.current?.slidePrev()}>
          Previous
        </Button>
        <Button isBlock css={tw`ml-1`} onClick={() => swiperRef.current?.slideNext()}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default SelectGeneration;
