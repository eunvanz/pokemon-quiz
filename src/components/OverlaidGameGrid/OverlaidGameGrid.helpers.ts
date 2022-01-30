export const convertStackedMonImagesToArray: (
  stackedMonImages: string[][],
) => string[] = (stackedMonImages) => {
  const colSize = stackedMonImages.length;
  const result: string[] = [];

  stackedMonImages.forEach((rows, colIndex) => {
    rows.forEach((item, rowIndex) => {
      const index = rowIndex * colSize + colIndex;
      result[index] = item;
    });
  });
  return result;
};

export const getPositionFrom2DArray: (
  colSize: number,
  index: number,
) => { x: number; y: number } = (colSize, index) => {
  const x = colSize - (index % colSize) - 1;
  const y = Math.floor(index / colSize);
  return { x, y };
};

export const getStackedSizeFromStackedMonImages: (
  stackedMonImages: string[][],
  colIndex: number,
) => number = (stackedMonImages, colIndex) => {
  return stackedMonImages[colIndex].length;
};
