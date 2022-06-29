class Deque {
    #items = {}
    #count = 0
    #lowestCount = 0
    constructor() {

    }
    size() {
        return this.#count-this.#lowestCount
    }
    isEmpty() {
        return this.size() === 0
    }
    addBack(element) {
        this.#items[this.#count] = element
        this.#count++
    }
    addFront(element) {
        if (this.isEmpty()) {
            this.addBack(element)
        } else {
            this.#lowestCount--
            this.#items[this.#lowestCount] = element
        }
    }
    removeFront(){
        if(this.isEmpty()){
            return undefined
        }
        let result = this.#items[this.#lowestCount]
        delete this.#items[this.#lowestCount]
        this.#lowestCount++
        return result
    }
    removeBack(){
        if(this.isEmpty()){
            return undefined
        }
        let result = this.#items[this.#count]
        delete this.#items[this.#count]
        this.#count--
        return result
    }
    peekFront(){
        if(this.isEmpty()){
            return undefined
        }
        return this.#items[this.#lowestCount]
    }
    peekBack(){
        if(this.isEmpty()){
            return undefined
        }
        return this.#items[this.#count-1]
    }
    clear(){
        this.#items={}
        this.#count = 0
        this.#lowestCount = 0
    }
    toString(){
        if(this.isEmpty()){
            return ''
        }

        let result = `${this.#items[this.#lowestCount]}`

        for(let i = this.#lowestCount+1;i<this.#count;i++){
            result = `${result},${this.#items[i]}`
        }

        return result
    }
}

export {Deque}


