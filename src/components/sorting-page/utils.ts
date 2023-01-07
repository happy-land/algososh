import { IRandomArray } from "./sorting-type.types";

export const makeDelay = (millisecond: number) =>
  new Promise((res) => setTimeout(res, millisecond));

export const swap = (
  arr: IRandomArray[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const selectionSort = (array: IRandomArray[]) => {
  const { length } = array;
  for (let i = 0; i < length; i++) {
    let maxInd = i;
    for (let j = i + 1; j < length; j++) {
      if (array[maxInd].value < array[j].value) {
        maxInd = j;
      }
    }
    if (maxInd !== i) {
      swap(array, i, maxInd);
    }
  }
  return array;
};

export const bubbleSort = (array: IRandomArray[]) => {
  const { length } = array;
  for (let i = 0; i < length; i++) {
    for (let compareIndex = 0; compareIndex < length - i - 1; compareIndex++) {
      const left = array[compareIndex].value;
      const right = array[compareIndex + 1].value;
      if (left < right) {
        array[compareIndex].value = right;
        array[compareIndex + 1].value = left;
      }
    }
  }

  return array;
};
