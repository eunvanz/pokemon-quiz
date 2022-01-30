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
