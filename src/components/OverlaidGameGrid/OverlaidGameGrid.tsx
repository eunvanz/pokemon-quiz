import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  AnimationControls,
  motion,
  useAnimation,
  useMotionValue,
} from "framer-motion";
import tw from "twin.macro";
import { motionVariants } from "~/helpers/framer";
import { burstStar } from "~/helpers/mojs";
import GameGrid from "../GameGrid";
import {
  getPositionFrom2DArray,
  getStackedSizeFromStackedMonImages,
} from "./OverlaidGameGrid.helpers";

export interface OverlaidGameGridProps {
  currentMonImage?: string;
  currentColumn?: number;
  duration?: number;
  stackedMonImages: string[][];
}

const WIDTH = 300;
const GRID_ITEM_SIZE = 6;
const CELL_SIZE = WIDTH / GRID_ITEM_SIZE;
const HEIGHT = WIDTH * 2;
const TOTAL_GRID_COUNT = GRID_ITEM_SIZE ** 2 * 2;

const OverlaidGameGrid: React.FC<OverlaidGameGridProps> = ({
  currentMonImage,
  currentColumn,
  duration = 0,
  stackedMonImages,
}) => {
  const animation = useAnimation();
  const vibrationTimeout = useRef<number | null>();

  const vibrate = useCallback(() => {
    animation.start("vibe");
  }, []);

  const stackedSize = useMemo(() => {
    if (currentColumn !== undefined) {
      return getStackedSizeFromStackedMonImages(stackedMonImages, currentColumn);
    }
    return 0;
  }, [currentColumn, stackedMonImages]);

  useEffect(() => {
    if (currentMonImage && duration) {
      vibrationTimeout.current = window.setTimeout(
        vibrate,
        duration * 1000 -
          ((duration * 1000) / (GRID_ITEM_SIZE * 2)) * (stackedSize + 1) +
          100,
      );
      return () => {
        vibrationTimeout.current && clearTimeout(vibrationTimeout.current);
      };
    }
  }, [currentMonImage, duration, stackedSize]);

  return (
    <motion.div animate={animation} variants={motionVariants} css={tw`relative`}>
      <div css={[tw`absolute flex h-full w-full`, { width: WIDTH }]}>
        {Array.from({ length: GRID_ITEM_SIZE }).map((_, idx) => (
          <div key={idx} css={tw`h-full flex-1`}>
            <AnimatePresence>
              {currentMonImage && currentColumn === idx && (
                <MonImg
                  src={currentMonImage}
                  duration={duration}
                  penalty={getStackedSizeFromStackedMonImages(stackedMonImages, idx)}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div css={[tw`absolute grid grid-cols-6 h-full w-full`, { width: WIDTH }]}>
        {Array.from({ length: TOTAL_GRID_COUNT }).map((_, idx) => {
          const { x, y } = getPositionFrom2DArray(
            GRID_ITEM_SIZE,
            TOTAL_GRID_COUNT - idx - 1,
          );
          const monImage = stackedMonImages[x]?.[y];

          return (
            <div key={idx} css={{ height: CELL_SIZE }}>
              {monImage && <img src={monImage} width={CELL_SIZE} alt="mon image" />}
            </div>
          );
        })}
      </div>
      <GameGrid gridItemSize={GRID_ITEM_SIZE} width={WIDTH} />
    </motion.div>
  );
};

interface MonImgProps {
  src: string;
  duration: number;
  penalty: number;
}

const MOVE_UNIT = HEIGHT / (GRID_ITEM_SIZE * 2);

const MonImg = ({ src, duration, penalty }: MonImgProps) => {
  const monImgRef = useRef<HTMLImageElement>(null);
  const intervalRef = useRef<number | null>(null);
  const leftRef = useRef<number>(0);
  const isStackedRef = useRef<boolean>(false);

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
        if (repeat + 1 + penalty === GRID_ITEM_SIZE * 2 && intervalRef.current !== null) {
          isStackedRef.current = true;
          intervalRef.current && clearInterval(intervalRef.current);
        }
      }, interval);
    }
    return () => {
      intervalRef.current !== null && clearInterval(intervalRef.current);
    };
  }, [src, duration]);

  const burst = useCallback(() => {
    if (intervalRef.current && !isStackedRef.current) {
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
  }, []);

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
      width={CELL_SIZE}
      ref={monImgRef}
      src={src}
      alt="mon image"
    />
  );
};

export default OverlaidGameGrid;
