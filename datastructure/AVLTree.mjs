import { BinarySearchTree } from './BinarySearchTree.mjs'
//AVL树实现
const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};

class AVLTree extends BinarySearchTree {
    constructor(compareFn) {
        super(compareFn)
    }

    #getNodeHeight(node) {
        if (node == null) {
            return -1
        }
        return Math.max(this.#getNodeHeight(node.left), this.#getNodeHeight(node.right)) + 1
    }

    #getBalanceFactor(node) {
        const heightDifference = this.#getNodeHeight(node.left) - this.#getNodeHeight(node.right)
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }

    #rotationLL(node){
        const tem = node.left
        node.left = tem.right
        tem.right = node 
        return tem
    }
    #rotationRR(node){
        const tem = node.right
        node.right = tem.left
        tem.left = node
        return tem
    }
    #rotationLR(node){
        node.left = this.#rotationRR(node.left)
        return this.#rotationLL(node)
    }

    #rotationRL(node){
        node.right = this.#rotationLL(node.right)
        return this.#rotationRR(node)
    }
}

export { AVLTree }



