import { Swiper, SwiperSlide } from "swiper/react";
import tw from "twin.macro";
import { Generation } from "~/types";
import Button from "../Button";
import "swiper/swiper.min.css";

export interface SelectGenerationProps {
  onSelect: (generation: Generation) => void;
}

const SelectGeneration: React.FC<SelectGenerationProps> = ({ onSelect }) => {
  return (
    <div css={tw`flex-col`}>
      <Swiper
        css={tw`text-center`}
        navigation
        onSlideChange={(e) => onSelect(e.activeIndex as Generation)}
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
        <Button isBlock>Previous</Button>
        <Button isBlock>Next</Button>
      </div>
    </div>
  );
};

export default SelectGeneration;
