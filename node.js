export default class Node {
  constructor(value, leftChildren = null, rightChildren = null) {
    this.value = value;
    this.leftChildren = leftChildren;
    this.rightChildren = rightChildren;
  }
}
