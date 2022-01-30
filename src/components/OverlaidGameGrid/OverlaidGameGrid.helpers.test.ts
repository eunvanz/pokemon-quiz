import {
  convertStackedMonImagesToArray,
  getPositionFrom2DArray,
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
    expect(getPositionFrom2DArray(6, 1)).toEqual({ x: 4, y: 0 });
    expect(getPositionFrom2DArray(6, 10)).toEqual({ x: 1, y: 1 });
    expect(getPositionFrom2DArray(6, 20)).toEqual({ x: 3, y: 3 });
  });
});
