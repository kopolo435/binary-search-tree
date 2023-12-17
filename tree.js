import Node from "./node.js";

class Tree {
  constructor(array) {
    this.values = array;
    this.values = this.#mergeSort(0, this.values.length - 1);
    this.values = this.#removeDuplicates(this.values);
    this.root = this.#buildTree(this.values);
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

  #removeDuplicates(array) {
    const newMap = new Map();
    const newArray = [];
    array.forEach((element) => {
      if (!newMap.get(element)) {
        newMap.set(element, element);
        newArray.push(element);
      }
    });
    return newArray;
  }

  #buildTree(array) {
    if (array.length === 1) {
      return new Node(array[0]);
    }
    if (array.length === 2) {
      return new Node(array[1], this.#buildTree(array.splice(0, 1)));
    }
    const midPoint = Math.floor(array.length / 2);
    const leftChild = this.#buildTree(array.slice(0, midPoint));
    const rightChild = this.#buildTree(array.slice(midPoint + 1, array.length));
    return new Node(array[midPoint], leftChild, rightChild);
  }

  #searchEmptyChild(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (node.data === value) {
      return 0;
    }

    if (node.data < value) {
      const result = this.#searchEmptyChild(node.right, value);
      if (typeof result === "object") node.setRight(result);
      return 0;
    }
    const result = this.#searchEmptyChild(node.left, value);
    if (typeof result === "object") node.setLeft(result);
    return 0;
  }

  insert(value) {
    this.#searchEmptyChild(this.root, value);
  }
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree1 = new Tree([4, 1, 2, 6, 2, 8, 10, 22, 40]);
prettyPrint(tree1.root);
tree1.insert(-1);
prettyPrint(tree1.root);
