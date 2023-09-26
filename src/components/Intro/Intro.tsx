import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { random, shuffle } from "lodash-es";
import tw from "twin.macro";
import { Mon } from "~/types";

export interface IntroProps {
  mons: Mon[];
  onEnter: VoidFunction;
}

const Intro: React.FC<IntroProps> = ({ mons, onEnter }) => {
  const [dropCount, setDropCount] = useState(0);

  const start = useCallback(() => {
    onEnter();
  }, [onEnter]);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        start();
      }
    },
    [start],
  );

  const dropMon = useCallback(() => {
    const mon = shuffle(mons)[0];
    return <DropItem src={mon.image} />;
  }, [mons]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    const timer = setInterval(() => setDropCount((count) => ++count), 2000);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      clearInterval(timer);
    };
  }, [handleKeydown]);

  return (
    <div
      css={tw`h-screen w-full flex justify-center items-center bg-primary flex-col gap-10 overflow-hidden`}
      onClick={start}
    >
      <h1 css={tw`text-8xl text-white font-bold`}>Pokédrops</h1>
      <h2 css={tw`text-2xl text-white animate-pulse`}>Press enter or click anywhere</h2>
      <div key={dropCount}>{dropMon()}</div>
    </div>
  );
};

interface DropItemProps {
  src: string;
}

const DropItem = ({ src }: DropItemProps) => {
  const size = random(100, 300);

  const left = random(0, window.innerWidth - size);

  const delay = random(0, 500);

  return (
    <motion.div
      initial={{
        position: "absolute",
        left,
        top: -size,
        translateY: "-50px",
        width: size,
        height: size,
        zIndex: 10,
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
      }}
    >
      <img src={src} width="100%" height="100%" />
    </motion.div>
  );
};

export default Intro;
