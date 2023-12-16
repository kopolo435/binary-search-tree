import Node from "./node.js";

class Tree {
  constructor(array) {
    this.values = array;
    this.values = this.#mergeSort(0, this.values.length - 1);
  }

  #mergeSort(start, end) {
    if (end < start) {
      return [];
    }

    if (start === end) {
      return [this.values[start]];
    }
    const midPoint = Math.ceil((start + end) / 2);
    let left = this.#mergeSort(start, midPoint - 1);
    let right = this.#mergeSort(midPoint, end);
    let merged = [];
    while (left.length > 0) {
      if (right.length === 0) {
        merged = merged.concat(left);
        break;
      }
      if (left[0] <= right[0]) {
        merged.push(left[0]);
        left = left.slice(1, left.length);
      } else {
        merged.push(right[0]);
        right = right.slice(1, right.length);
      }
    }
    if (right.length !== 0) {
      merged = merged.concat(right);
    }
    return merged;
  }
}

const tree1 = new Tree([4, 1, 2]);
console.log("hola1");
