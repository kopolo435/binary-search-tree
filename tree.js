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

  #findInOrder(node) {
    if (node.getLeft() === null) {
      return node;
    }

    const result = this.#findInOrder(node.getLeft());
    if (result.data === node.getLeft().data) node.setLeft(null);
    return result;
  }

  #searchDeleteValue(node, value) {
    if (node === null) {
      return 0;
    }

    if (node.data === value) {
      if (node.getRight() !== null && node.getLeft() !== null) {
        if (node.getRight().getLeft() === null) {
          const replaceNode = node.getRight();
          replaceNode.setLeft(node.getLeft());
          return replaceNode;
        }
        const replaceNode = this.#findInOrder(node.getRight());
        replaceNode.setRight(node.getRight());
        replaceNode.setLeft(node.getLeft());
        return replaceNode;
      }
      if (node.getRight() !== null) {
        return node.getRight();
      }
      if (node.getLeft() !== null) {
        return node.getLeft();
      }
      return null;
    }

    if (node.data < value) {
      const result = this.#searchDeleteValue(node.getRight(), value);
      if (result === null) node.setRight(null);
      if (typeof result === "object") node.setRight(result);
      return 0;
    }
    if (node.data > value) {
      const result = this.#searchDeleteValue(node.getLeft(), value);
      if (result === null) node.setLeft(null);
      if (typeof result === "object") node.setLeft(result);
      return 0;
    }
  }

  insert(value) {
    this.#searchEmptyChild(this.root, value);
  }

  delete(value) {
    if (value === this.root.data) {
      const node = this.#findInOrder(this.root.getRight());
      node.setLeft(this.root.getLeft());
      node.setRight(this.root.getRight());
      this.root = node;
    } else {
      this.#searchDeleteValue(this.root, value);
    }
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
tree1.delete(144);
prettyPrint(tree1.root);
