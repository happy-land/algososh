import { ElementStates } from "../../types/element-states";
import { bubbleSort, selectionSort } from "./utils";

const initArray = [
  { value: 1, state: ElementStates.Default },
  { value: 2, state: ElementStates.Default },
  { value: 3, state: ElementStates.Default },
];

const expArray = [
  { value: 3, state: ElementStates.Default },
  { value: 2, state: ElementStates.Default },
  { value: 1, state: ElementStates.Default },
];

describe("testing SortingPage component", () => {
  //selection
  it("selection sorting with empty array", () => {
    expect(selectionSort([])).toEqual([]);
  });

  it("selection sorting with array consist of one element", () => {
    expect(
      selectionSort([
        {
          value: 1,
          state: ElementStates.Default,
        },
      ])
    ).toStrictEqual([
      {
        value: 1,
        state: ElementStates.Default,
      },
    ]);
  });

  it("selection sorting with array consist of some element", () => {
    expect(selectionSort(initArray)).toStrictEqual(expArray);
  });

  //bubble
  it("bubble sorting with empty array", () => {
    expect(bubbleSort([])).toEqual([]);
  });
  it("bubble sorting with array consist of one element", () => {
    expect(
      bubbleSort([
        {
          value: 1,
          state: ElementStates.Default,
        },
      ])
    ).toStrictEqual([
      {
        value: 1,
        state: ElementStates.Default,
      },
    ]);
  });
  it("bubble sorting with array consist of some element", () => {
    expect(bubbleSort(initArray)).toStrictEqual(expArray);
  });
});
