class Queue {
    #item = {}
    #count = 0
    #lowestCount = 0
    constructor(){

    }
    size(){
        return this.#count-this.#lowestCount
    }
    isEmpty(){
        return this.size()===0
    }
    enqueue(element){
        this.#item[this.#count] = element
        this.#count++
    }
    dequeue(){
        if(this.isEmpty()){
            return undefined
        }
        let result = this.#item[this.#lowestCount]
        delete this.#item[this.#lowestCount]
        this.#lowestCount++
        return result
    }
    peek(){
        if(this.isEmpty()){
            return undefined
        }
        return this.#item[this.#lowestCount]
    }
    clear(){
        this.#item={}
        this.#lowestCount = 0
        this.#count = 0
    }
    toString(){
        if(this.isEmpty()){
            return ''
        }
        let result = `${this.#item[this.#lowestCount]}`
        for(let i = this.#lowestCount+1 ;i<this.#count;i++){
            result = `${result},${this.#item[i]}`
        }
        return result
    }
}

export {Queue}
