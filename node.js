export default class Node {
  constructor(data, leftChildren = null, rightChildren = null) {
    this.data = data;
    this.left = leftChildren;
    this.right = rightChildren;
  }
}
