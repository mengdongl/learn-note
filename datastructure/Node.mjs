class Node {
    constructor(element){
        this.element = element
        this.next = undefined
    }
}

class DoublyNode extends Node {
    constructor(element){
        super(element)
        this.prev = undefined
    }
}

export { Node , DoublyNode}