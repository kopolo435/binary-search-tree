import Tree from "./tree.js";

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

const tree1 = new Tree([
  4, 1, 2, 6, 2, 8, 10, 22, 40, 70, 50, 32, 54, 32, 54, 65, 16, 73,
]);
console.log(tree1.isBalanced());
prettyPrint(tree1.root);
console.log("InOrder");
let string = "";
tree1.inOrder().forEach((element) => {
  string = `${string} ${element.data}`;
});
console.log(string);
string = "";
console.log("PreOrder");
tree1.preOrder().forEach((element) => {
  string = `${string} ${element.data}`;
});
console.log(string);
console.log("PostOrder");
string = "";
tree1.postOrder().forEach((element) => {
  string = `${string} ${element.data}`;
});
console.log(string);
console.log(`balanceado? ${tree1.isBalanced()}`);
tree1.insert(400);
tree1.insert(250);
tree1.insert(100);
tree1.insert(700);
prettyPrint(tree1.root);
console.log(`balanceado? ${tree1.isBalanced()}`);
tree1.rebalance();
prettyPrint(tree1.root);
console.log(`balanceado? ${tree1.isBalanced()}`);
