import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { random, shuffle } from "lodash-es";
import tw from "twin.macro";
import { Mon } from "~/types";

export interface IntroProps {
  onStart: VoidFunction;
  mons: Mon[];
}

const Intro: React.FC<IntroProps> = ({ onStart, mons }) => {
  const [dropCount, setDropCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onStart();
        setIsVisible(false);
      }
    },
    [onStart],
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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          css={tw`absolute h-screen w-full flex justify-center items-center bg-primary flex-col gap-10`}
          exit={{ opacity: 0 }}
        >
          <h1 css={tw`text-8xl text-white font-bold`}>Pokédrops</h1>
          <h2 css={tw`text-2xl text-white animate-pulse`}>Press Enter</h2>
          <div key={dropCount}>{dropMon()}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface DropItemProps {
  src: string;
}

const DropItem = ({ src }: DropItemProps) => {
  const size = random(100, 300);

  const left = random(0, window.innerWidth - size);

  const delay = random(0, 500);

  return createPortal(
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
    </motion.div>,
    document.body,
  );
};

export default Intro;
