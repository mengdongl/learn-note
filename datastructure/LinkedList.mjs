import { Node } from './Node.mjs'

function defaultEquals(a, b) {
    return a === b;
}

class LinkedList {
    #head = undefined
    #count = 0
    #equalsFn = null
    constructor(equalsFn=defaultEquals) {
        this.#equalsFn = equalsFn
    }
    size(){
        return this.#count
    }
    isEmpty(){
        return this.size()===0
    }
    getElementAt(index){
        if(index>=0&&index<this.size()){
            if(this.isEmpty()){
                return undefined
            }
            let current = this.#head
            for(let i = 0;i<index;i++){
                current = current.next
            }
            return current
        }else{
            return undefined
        }
    }
    push(element){
        let node = new Node(element)
        if(this.isEmpty()){
            this.#head = node
        }else{
            let previous = this.getElementAt(this.size()-1)
            previous.next = node
        }
        this.#count++
    }
    insert(element, position){
        if(this.isEmpty()){
           this.push(element)
           return true
        }else{
            if (position>=0) {
                if(position===0){
                    let node = new Node(element)
                    let current = this.#head
                    this.#head = node
                    node.next = current
                    this.#count++
                }else if(position>=this.size()){
                    this.push(element)
                }else{
                    let node = new Node(element)
                    let previous = this.getElementAt(position-1)
                    let current = previous.next
                    previous.next = node
                    node.next = current
                    this.#count++
                }
                return true
            }else{
                return false
            }
        }
    }
    removeAt(position){
        if(position>=0&&position<this.size()){
            let current
            if(position===0){
                current = this.#head
                this.#head = current.next
            }else{
                let previous = this.getElementAt(position-1)
                current = previous.next
                previous.next = current.next
            }
            this.#count--
            return current
        }else{
            return undefined
        }
    }
    indexOf(element){
        let current = this.#head
        for(let i=0;i<this.size()&&current!=null;i++){
            if(this.#equalsFn(current.element,element)){
                return i
            }
            current = current.next
        }
        return -1
    }
    remove(element){
        if(this.indexOf(element)!==-1){
            let index = this.indexOf(element)
            return this.removeAt(index)
        }else{
            return undefined
        }
    }
    toString(){
        if(this.isEmpty()){
            return ''
        }
        let current = this.#head
        let result = `${current.element}`
        for(let i = 1;i<this.size();i++){
            current = current.next
            result = `${result},${current.element}`
        }
        return result
    }

}

export {LinkedList}




