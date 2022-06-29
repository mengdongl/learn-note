import {LinkedList} from './LinkedList.mjs'

class DoublyLinkedList extends LinkedList{
    #tail = undefined
    constructor(equalsFn){
        super(equalsFn)
    }

    
}

let list = new DoublyLinkedList()

list.push(1)
list.push(2)
list.push(3)
list.push(4)
list.push(5)

