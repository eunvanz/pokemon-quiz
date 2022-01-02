import { GAME_GRID_SIZE } from "~/constants/rules";
import { colors } from "~/styles/colors";

export interface GameGridProps {
  width: number;
}

const gridItemCss = {
  borderColor: colors.lightGray,
  borderStyle: "solid",
  borderWidth: "1px 1px 0 0",
  height: "100%",
  [`&:nth-child(${GAME_GRID_SIZE}n + 1)`]: {
    borderLeftWidth: "1px",
  },
  [`&:nth-child(n + ${GAME_GRID_SIZE ** 2 * 2 - GAME_GRID_SIZE + 1})`]: {
    borderBottomWidth: "1px",
  },
};

const GameGrid: React.FC<GameGridProps> = ({ width }) => {
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: `repeat(${GAME_GRID_SIZE}, 1fr)`,
        width,
        height: width * 2,
      }}
    >
      {Array.from({ length: GAME_GRID_SIZE ** 2 * 2 }).map((_, idx) => (
        <div css={gridItemCss} key={idx} />
      ))}
    </div>
  );
};

export default GameGrid;
