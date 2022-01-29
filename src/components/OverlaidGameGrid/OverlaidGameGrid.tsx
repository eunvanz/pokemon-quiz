import GameGrid from "../GameGrid";

export interface OverlaidGameGridProps {
  currentMonImage: string;
  duration: number;
  stackedMonImages: string[][];
}

const OverlaidGameGrid: React.FC<OverlaidGameGridProps> = ({
  currentMonImage,
  duration,
  stackedMonImages,
}) => {
  return (
    <>
      <GameGrid gridItemSize={6} width={300} />
    </>
  );
};

export default OverlaidGameGrid;
