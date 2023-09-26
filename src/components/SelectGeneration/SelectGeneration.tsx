import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { random, shuffle } from "lodash-es";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import tw from "twin.macro";
import { GENERATIONS } from "~/constants/rules";
import { Generation, Mon } from "~/types";
import Button from "../Button";
import "swiper/swiper.min.css";

export interface SelectGenerationProps {
  onStart: (generation: Generation) => void;
  onNavigateToLeaderBoard: VoidFunction;
  mons: Mon[];
}

const SelectGeneration: React.FC<SelectGenerationProps> = ({
  onStart,
  onNavigateToLeaderBoard,
  mons,
}) => {
  const swiperRef = useRef<SwiperCore>();

  const [generation, setGeneration] = useState<Generation>(0);

  const generationMons = useMemo(() => {
    if (generation === 0) {
      return mons;
    } else {
      return mons.slice(
        generation === 1 ? 0 : GENERATIONS[(generation - 1) as Generation] + 1,
        GENERATIONS[generation],
      );
    }
  }, [mons, generation]);

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
    [onStart, generation],
  );

  const renderRainItems = useCallback(() => {
    return shuffle(generationMons)
      .slice(0, 50)
      .map((mon, idx) => {
        const src = mon.image;
        return <RainItem key={`${generation}_${idx}`} src={src} />;
      });
  }, [generationMons, generation]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  const generationTexts = [
    "All Generations",
    "1st Generation",
    "2nd Generation",
    "3rd Generation",
    "4th Generation",
    "5th Generation",
    "6th Generation",
    "7th Generation",
    "8th Generation",
    "9th Generation",
  ];

  return (
    <div css={tw`relative flex flex-col h-screen w-full justify-center overflow-hidden`}>
      <div css={tw`text-2xl text-center text-primary animate-pulse`}>
        CHOOSE A GENERATION TO CHALLENGE
      </div>
      <div>
        <Swiper
          css={tw`text-center text-4xl my-20`}
          navigation
          onSlideChange={(e) => {
            const activeIndex = e.activeIndex - 1;
            if (activeIndex === -1) {
              setGeneration((generationTexts.length - 1) as Generation);
            } else if (activeIndex === generationTexts.length) {
              setGeneration(0);
            } else {
              setGeneration(activeIndex as Generation);
            }
          }}
          loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {generationTexts.map((text) => (
            <SwiperSlide key={text}>{text}</SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div css={tw`flex justify-between w-1/2 mx-auto`}>
        <Button
          isBlock
          css={tw`mr-1`}
          variant="outlined"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          Previous (Left)
        </Button>
        <Button
          isBlock
          css={tw`ml-1`}
          variant="outlined"
          onClick={() => swiperRef.current?.slideNext()}
        >
          Next (Right)
        </Button>
      </div>
      <div css={tw`mx-auto w-1/2 mt-4`}>
        <Button isBlock onClick={() => onStart(generation)}>
          Start (Enter)
        </Button>
      </div>
      <div css={tw`mx-auto w-1/2 mt-4`}>
        <Button isBlock color="secondary" onClick={() => onNavigateToLeaderBoard()}>
          Leaderboard
        </Button>
      </div>
      <AnimatePresence>{renderRainItems()}</AnimatePresence>
    </div>
  );
};

export default SelectGeneration;

interface RainItemProps {
  src: string;
}

const RainItem = ({ src }: RainItemProps) => {
  const size = random(100, 200);

  const delay = random(0, 2_000);

  const left = random(0, window.innerWidth - size);

  const zIndex = random(-10, 3);

  return (
    <motion.div
      initial={{
        position: "absolute",
        left,
        top: -size,
        translateY: "-50px",
        width: size,
        height: size,
        zIndex,
      }}
      animate={{
        translateY: `${window.innerHeight + size + 50}px`,
        transitionEnd: {
          display: "none",
        },
      }}
      transition={{
        ease: "easeIn",
        duration: 1.5,
        delay: delay / 1000,
        opacity: { duration: 0.5 },
      }}
      exit={{ opacity: 0 }}
    >
      <img src={src} width="100%" height="100%" />
    </motion.div>
  );
};
