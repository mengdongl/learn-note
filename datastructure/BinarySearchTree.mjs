class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

function defaultCompare(a, b) {
    if (a > b) {
        return 1
    } else if (a < b) {
        return -1
    } else {
        return 0
    }
}
class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.root = null
    }

    insert(key) {
        if (this.root == null) {
            this.root = new Node(key)
        } else {
            this.#insertNode(this.root, key)
        }
    }

    #insertNode(node, key) {
        if (this.compareFn(node.key, key) === 1) {
            if (node.left == null) {
                node.left = new Node(key)
            } else {
                this.#insertNode(node.left, key)
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key)
            } else {
                this.#insertNode(node.right, key)
            }
        }
    }

    search(key) {
        return this.#searchNode(this.root, key)
    }

    #searchNode(node, key) {
        if (node != null) {
            if (this.compareFn(node.key, key) === 1) {
               return this.#searchNode(node.left, key)
            } else if (this.compareFn(node.key, key) === -1) {
               return this.#searchNode(node.right, key)
            } else {
                return true
            }
        } else {
            return false
        }

    }

    inOrderTraverse(callBack) {
        this.#inOrderTraverseNode(this.root, callBack)
    }

    #inOrderTraverseNode(node, cb) {
        if (node != null) {
            this.#inOrderTraverseNode(node.left, cb)
            cb(node.key)
            this.#inOrderTraverseNode(node.right, cb)
        }
    }

    preOrderTraverse(callBack){
        this.#preOrderTraverseNode(this.root,callBack)
    }

    #preOrderTraverseNode(node,cb){
        if(node!=null){
            cb(node.key)
            this.#preOrderTraverseNode(node.left)
            this.#preOrderTraverseNode(node.right)
        }
    }

    postOrderTraverse(callBack){
        this.#postOrderTraverseNode(this.root,callBack)
    }

    #postOrderTraverseNode(node,cb){
        if(node!=null){
            this.#postOrderTraverseNode(node.left)
            this.#postOrderTraverseNode(node.right)
            cb(node.key)
        }
    }

    min(){
        if(this.root == null){
            return undefined
        }else{
            return this.#minNode(this.root)
        }
    }

    max(){
        if(this.root == null){
            return undefined
        }else{
            let current = this.root
            while(current.right){
                current = current.right
            }
            return current
        }
    }

    remove(key){
        if (this.root==null) {
            return false
        } else {
            this.root = this.#removeNode(this.root,key)
        }
    }

    #removeNode(node,key){
        if(node==null){
            return null
        }
        if (this.compareFn(node.key,key)===1) {
            node.left = this.#removeNode(node.left,key)
            return node
        } else if(this.compareFn(node.key,key)===-1) {
            node.right = this.#removeNode(node.right,key)
            return node
        }else{
            if(node.left ==null && node.right ==null){
                node = null
                return node
            }
            if(node.right == null ){
                node = node.left
                return node
            }
            if(node.left == null){
                node = node.right
                return node
            }
            const min = this.#minNode(node.right)
            node.key = min.key
            node.right = this.#removeNode(node.right,min.key)
            return node
        }
    }

    #minNode(node){
        let current = node
        while(current!=null&&current.left!=null){
            current = current.left
        }
        return current
    }
}



export { BinarySearchTree }