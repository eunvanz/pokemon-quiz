import {
  convertStackedMonImagesToArray,
  getPositionFrom2DArray,
  getStackedSizeFromStackedMonImages,
} from "./OverlaidGameGrid.helpers";

describe("convertStackedMonImagesToArray", () => {
  it("converts 2D array to 1D array", () => {
    const result = convertStackedMonImagesToArray([
      [
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
      ],
      [],
      [
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      ],
      [
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
      ],
      [],
      [
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png",
      ],
    ]);
    expect(result).toEqual([
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      undefined,
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
      undefined,
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
      undefined,
      undefined,
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    ]);
  });
});

describe("getPositionFrom2DArray", () => {
  it("returns position from an array by column size", () => {
    expect(getPositionFrom2DArray(6, 0)).toEqual({ x: 5, y: 0 });
    expect(getPositionFrom2DArray(6, 5)).toEqual({ x: 0, y: 0 });
    expect(getPositionFrom2DArray(6, 1)).toEqual({ x: 4, y: 0 });
    expect(getPositionFrom2DArray(6, 10)).toEqual({ x: 1, y: 1 });
    expect(getPositionFrom2DArray(6, 20)).toEqual({ x: 3, y: 3 });
  });
});

describe("getPenaltyFromStackedMonImages", () => {
  it("returns stacked size of column", () => {
    const stackedMonImages = [
      [
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
      ],
      [],
      [
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      ],
      [
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
      ],
      [],
      [
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png",
      ],
    ];
    expect(getStackedSizeFromStackedMonImages(stackedMonImages, 0)).toBe(2);
    expect(getStackedSizeFromStackedMonImages(stackedMonImages, 1)).toBe(0);
    expect(getStackedSizeFromStackedMonImages(stackedMonImages, 2)).toBe(1);
    expect(getStackedSizeFromStackedMonImages(stackedMonImages, 3)).toBe(4);
    expect(getStackedSizeFromStackedMonImages(stackedMonImages, 4)).toBe(0);
    expect(getStackedSizeFromStackedMonImages(stackedMonImages, 5)).toBe(1);
  });
});
