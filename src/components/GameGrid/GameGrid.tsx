import { useMemo } from "react";
import { colors } from "~/styles/colors";

export interface GameGridProps {
  width: number;
  gridItemSize: number;
}

const GameGrid: React.FC<GameGridProps> = ({ width, gridItemSize }) => {
  const gridItemCss = useMemo(() => {
    return {
      borderColor: colors.lightGray,
      borderStyle: "solid",
      borderWidth: "1px 1px 0 0",
      height: "100%",
      [`&:nth-child(${gridItemSize}n + 1)`]: {
        borderLeftWidth: "1px",
      },
      [`&:nth-child(n + ${gridItemSize ** 2 * 2 - gridItemSize + 1})`]: {
        borderBottomWidth: "1px",
      },
    };
  }, [gridItemSize]);

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridItemSize}, 1fr)`,
        width,
        height: width * 2,
      }}
    >
      {Array.from({ length: gridItemSize ** 2 * 2 }).map((_, idx) => (
        <div css={gridItemCss} key={idx} />
      ))}
    </div>
  );
};

export default GameGrid;
