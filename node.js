export default class Node {
  constructor(data, leftChildren = null, rightChildren = null) {
    this.data = data;
    this.left = leftChildren;
    this.right = rightChildren;
  }

  setRight(node) {
    this.right = node;
  }

  getRIght() {
    return this.right;
  }

  setLeft(node) {
    this.left = node;
  }

  getLeft() {
    return this.left;
  }
}
