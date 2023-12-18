import Node from "./node.js";

export default class Tree {
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

  #searchValue(node, value) {
    if (node === null) {
      return -1;
    }
    if (node.data === value) {
      return node;
    }

    if (value > node.data) {
      return this.#searchValue(node.getRight(), value);
    }

    return this.#searchValue(node.getLeft(), value);
  }

  #breathFirstSearch(callback = null, array = null) {
    if (array.length === 0) {
      return [];
    }
    const node = array.shift();
    const newFila = array;
    if (node.getLeft() != null) newFila.push(node.getLeft());
    if (node.getRight() != null) newFila.push(node.getRight());

    if (callback != null) {
      callback(node);
      return this.#breathFirstSearch(callback, newFila);
    }

    return [node].concat(this.#breathFirstSearch(null, newFila));
  }

  #inOrderRecursive(node, callback) {
    let result = [];
    if (node.getLeft() != null) {
      result = result.concat(this.#inOrderRecursive(node.getLeft(), callback));
    }
    if (callback != null) {
      callback(node);
    }
    result.push(node);
    if (node.getRight() != null) {
      result = result.concat(this.#inOrderRecursive(node.getRight(), callback));
    }
    return result;
  }

  #preOrderRecursive(node, callback) {
    let result = [];
    if (callback != null) {
      callback(node);
    }
    result.push(node);
    if (node.getLeft() != null) {
      result = result.concat(this.#preOrderRecursive(node.getLeft(), callback));
    }
    if (node.getRight() != null) {
      result = result.concat(
        this.#preOrderRecursive(node.getRight(), callback)
      );
    }
    return result;
  }

  #postOrderRecursive(node, callback) {
    let result = [];
    if (node.getLeft() != null) {
      result = result.concat(
        this.#postOrderRecursive(node.getLeft(), callback)
      );
    }
    if (node.getRight() != null) {
      result = result.concat(
        this.#postOrderRecursive(node.getRight(), callback)
      );
    }
    if (callback != null) {
      callback(node);
    }
    result.push(node);
    return result;
  }

  #calcHeight(node) {
    if (node === null) {
      return 0;
    }

    const left = this.#calcHeight(node.getLeft());
    const right = this.#calcHeight(node.getRight());
    if (left > right) {
      return 1 + left;
    }
    return 1 + right;
  }

  #calcDepth(currentNode, nodeWanted) {
    if (currentNode === null) {
      return null;
    }

    if (currentNode === nodeWanted) {
      return 0;
    }

    let right = this.#calcDepth(currentNode.getRight(), nodeWanted);
    let left = this.#calcDepth(currentNode.getLeft(), nodeWanted);
    if (right != null) right += 1;
    if (left != null) left += 1;
    if (right && left) {
      return right > left ? right : left;
    }

    if (!right && left) {
      return left;
    }

    if (!left && right) {
      return right;
    }
    return null;
  }

  loopLevelOrder(callback = null) {
    const fila = [];
    const newFila = [];
    fila.push(this.root);
    while (fila.length > 0) {
      const node = fila.shift();
      if (node.getLeft() != null) {
        fila.push(node.getLeft());
        newFila.push(node.getLeft());
      }
      if (node.getRight() != null) {
        fila.push(node.getRight());
        newFila.push(node.getRight());
      }
      if (callback != null) {
        callback(node);
      }
    }
    if (callback === null) {
      return newFila;
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

  find(value) {
    return this.#searchValue(this.root, value);
  }

  levelOrder(callback = null) {
    if (callback === null) {
      return this.#breathFirstSearch(null, [this.root]);
    }
    this.#breathFirstSearch(callback, [this.root]);
  }

  inOrder(callback = null) {
    if (callback === null) {
      return this.#inOrderRecursive(this.root, null);
    }
    this.#inOrderRecursive(this.root, callback);
  }

  preOrder(callback = null) {
    if (callback === null) {
      return this.#preOrderRecursive(this.root, null);
    }
    this.#preOrderRecursive(this.root, callback);
  }

  postOrder(callback = null) {
    if (callback === null) {
      return this.#postOrderRecursive(this.root, null);
    }
    this.#postOrderRecursive(this.root, callback);
  }

  height() {
    return this.#calcHeight(this.root);
  }

  depth(nodeWanted) {
    return this.#calcDepth(this.root, nodeWanted);
  }

  isBalanced() {
    const left = this.#calcHeight(this.root.getLeft());
    const right = this.#calcHeight(this.root.getRight());
    return Math.abs(left - right) <= 1;
  }

  rebalance() {
    const nodes = this.#inOrderRecursive(this.root);
    const values = [];
    nodes.forEach((node) => {
      values.push(node.data);
    });
    this.root = this.#buildTree(values);
  }
}
