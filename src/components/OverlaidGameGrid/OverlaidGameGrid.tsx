import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import tw from "twin.macro";
import { burstStar } from "~/helpers/animmations";
import GameGrid from "../GameGrid";

export interface OverlaidGameGridProps {
  currentMonImage?: string;
  currentColumn?: number;
  duration?: number;
  stackedMonImages: string[][];
}

const WIDTH = 300;
const GRID_ITEM_SIZE = 6;
const HEIGHT = WIDTH * 2;

const OverlaidGameGrid: React.FC<OverlaidGameGridProps> = ({
  currentMonImage,
  currentColumn,
  duration = 0,
  stackedMonImages,
}) => {
  return (
    <div css={tw`relative`}>
      <div css={[tw`absolute flex h-full w-full`, { width: WIDTH }]}>
        {Array.from({ length: GRID_ITEM_SIZE }).map((_, idx) => (
          <div key={idx} css={tw`h-full flex-1`}>
            <AnimatePresence>
              {currentMonImage && currentColumn === idx && (
                <MonImg src={currentMonImage} duration={duration} />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <GameGrid gridItemSize={GRID_ITEM_SIZE} width={WIDTH} />
    </div>
  );
};

interface MonImgProps {
  src: string;
  duration: number;
}

const MOVE_UNIT = HEIGHT / (GRID_ITEM_SIZE * 2);

const MonImg = ({ src, duration }: MonImgProps) => {
  const monImgRef = useRef<HTMLImageElement>(null);
  const intervalRef = useRef<number | null>(null);
  const leftRef = useRef<number>(0);

  const [isStacked, setIsStacked] = useState(false);

  const y = useMotionValue(0);

  useEffect(() => {
    const $monImg = monImgRef.current;
    if ($monImg) {
      leftRef.current = $monImg.getClientRects()[0].left;
      const interval = (duration * 1000) / (GRID_ITEM_SIZE * 2);
      let repeat = 0;
      intervalRef.current = window.setInterval(() => {
        repeat++;
        y.set(MOVE_UNIT * repeat);
        if (repeat + 1 === GRID_ITEM_SIZE * 2 && intervalRef.current !== null) {
          setIsStacked(true);
          clearInterval(intervalRef.current);
        }
      }, interval);
    }
    return () => {
      intervalRef.current !== null && clearInterval(intervalRef.current);
    };
  }, [src, duration]);

  const burst = useCallback(() => {
    if (intervalRef.current && !isStacked) {
      burstStar({
        top: y.get() + 40,
        left: leftRef.current,
        color: ["#F59E0B", "#3B82F6", "#DB2777", "#7C3AED"],
        count: 8,
        radius: { 10: 30 },
        degree: 360,
        opacity: { 1: 0 },
      });
    }
  }, [isStacked]);

  return (
    <motion.img
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      exit={{
        opacity: 0,
      }}
      onAnimationStart={burst}
      style={{ y }}
      transition={{
        ease: "linear",
        duration: 0.2,
      }}
      css={tw`absolute transition-transform`}
      width={WIDTH / GRID_ITEM_SIZE}
      ref={monImgRef}
      src={src}
      alt="mon image"
    />
  );
};

export default OverlaidGameGrid;
