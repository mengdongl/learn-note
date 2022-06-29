class Stack {
    #items=[]
    constructor(){
    }
    isEmpty(){
        return this.#items.length ===0
    }
    push(value){
        this.#items.push(value)
    }
    pop(){
        return this.#items.pop()
    }
    size(){
        return this.#items.length
    }
    peek(){
        return this.#items[this.#items.length-1]
    }
    clear(){
        this.#items=[]
    }
}


export {Stack}
