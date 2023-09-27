import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
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

  const wordsDelays = useMemo(() => {
    return Array.from({ length: 9 }).map(() => random(0.1, 2.0));
  }, []);

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
      css={tw`relative h-screen w-full flex justify-center items-center bg-primary flex-col gap-10 overflow-hidden`}
      onClick={start}
    >
      <h1 css={tw`flex sm:text-8xl text-4xl text-white font-bold`}>
        <DropWord delay={wordsDelays[0]}>P</DropWord>
        <DropWord delay={wordsDelays[1]}>o</DropWord>
        <DropWord delay={wordsDelays[2]}>k</DropWord>
        <DropWord delay={wordsDelays[3]}>é</DropWord>
        <DropWord delay={wordsDelays[4]}>d</DropWord>
        <DropWord delay={wordsDelays[5]}>r</DropWord>
        <DropWord delay={wordsDelays[6]}>o</DropWord>
        <DropWord delay={wordsDelays[7]}>p</DropWord>
        <DropWord delay={wordsDelays[8]}>s</DropWord>
      </h1>
      <h2 css={tw`sm:text-2xl text-white animate-pulse text-center`}>
        Press enter or click anywhere
      </h2>
      <div key={dropCount}>{dropMon()}</div>
    </div>
  );
};

interface DropItemProps {
  src: string;
}

const DropItem = ({ src }: DropItemProps) => {
  const [delay, setDelay] = useState(100_000);

  const size = random(100, 300);

  const left = random(0, window.innerWidth - size);

  const handleOnImageLoad = useCallback(() => {
    setDelay(random(0, 500));
  }, []);

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
      <img src={src} width="100%" height="100%" onLoad={handleOnImageLoad} />
    </motion.div>
  );
};

interface DropWordProps {
  delay: number;
  children: string;
}

const DropWord = ({ delay, children }: DropWordProps) => {
  return (
    <motion.div
      initial={{
        y: "-50vh",
      }}
      animate={{
        y: 0,
      }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 200,
        duration: 0.5,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Intro;
