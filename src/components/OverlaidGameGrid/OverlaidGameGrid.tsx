import { useEffect, useRef } from "react";
import tw from "twin.macro";
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
  const monImgRef = useRef<HTMLImageElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (currentMonImage && currentColumn !== undefined) {
      const $monImg = monImgRef.current;
      if ($monImg) {
        const interval = (duration * 1000) / (GRID_ITEM_SIZE * 2);
        const moveUnit = HEIGHT / (GRID_ITEM_SIZE * 2);
        let repeat = 0;
        intervalRef.current = window.setInterval(() => {
          repeat++;
          $monImg.style.transform = `translateY(${moveUnit * repeat}px)`;
          if (repeat + 1 === GRID_ITEM_SIZE * 2 && intervalRef.current !== null) {
            clearInterval(intervalRef.current);
          }
        }, interval);
      }
    }
  }, []);

  return (
    <div css={tw`relative`}>
      <div css={[tw`absolute flex h-full w-full`, { width: WIDTH }]}>
        {Array.from({ length: GRID_ITEM_SIZE }).map((_, idx) => (
          <div key={idx} css={tw`h-full flex-1`}>
            {currentMonImage && currentColumn === idx && (
              <img
                css={tw`transition-transform absolute top-0`}
                width={WIDTH / GRID_ITEM_SIZE}
                ref={monImgRef}
                src={currentMonImage}
                alt="mon image"
              />
            )}
          </div>
        ))}
      </div>
      <GameGrid gridItemSize={GRID_ITEM_SIZE} width={WIDTH} />
    </div>
  );
};

export default OverlaidGameGrid;
