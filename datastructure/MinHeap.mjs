function defaultCompare(a, b) {
    if (a > b) {
        return 1
    } else if (a < b) {
        return -1
    } else {
        return 0
    }
}

class MinHeap {
    constructor(compareFn = defaultCompare){
        this.heap = []
        this.compareFn = compareFn
    }

    #getLeftIndex(index){
        return 2*index+1
    }
    #getRightIndex(index){
        return 2*index+2
    }
    #getParentIndex(index){
        if(index===0){
            return undefined
        }else{
            return Math.floor((index-1)/2)
        }
    }

    size(){
        return this.heap.length
    }

    isEmpty(){
        return this.size()===0
    }

    insert(value){
        if (value==null) {
            return false
        } else {
            if(this.isEmpty()){
                this.heap.push(value)
            }else{
                this.heap.push(value)
                this.#siftUp(this.heap.length-1)
            }
            return true
        }
    }

    #siftUp(index){
        let element = index
        let parent = this.#getParentIndex(element)
        while(element>0&&this.compareFn(this.heap[parent],this.heap[element])===1){
            [this.heap[element],this.heap[parent]] = [this.heap[parent],this.heap[element]]
            element = parent
            parent = this.#getParentIndex(element)
        }
    }

    extract(){
        if (this.isEmpty()) {
            return undefined
        } else {
            if (this.size()===1) {
                return this.heap.shift()
            } else {
                [this.heap[0],this.heap[this.heap.length-1]] = [this.heap[this.heap.length-1],this.heap[0]]
                let returnVal = this.heap.pop()
                this.#siftDown(0)
                return returnVal
            }
        }
    }

    #siftDown(index){
        let element = index
        let left = this.#getLeftIndex(index)
        let right = this.#getRightIndex(index)

        while(left<this.size()&&right<this.size()){
            if(this.compareFn(this.heap[element],this.heap[left])===1&&this.compareFn(this.heap[right],this.heap[left])===1){
                [this.heap[element],this.heap[left]] = [this.heap[left],this.heap[element]]
                element = left
                left = this.#getLeftIndex(element)
                right = this.#getRightIndex(element)
            }
            if(this.compareFn(this.heap[element],this.heap[right])===1&&this.compareFn(this.heap[left],this.heap[right])===1){
                [this.heap[element],this.heap[right]] = [this.heap[right],this.heap[element]]
                element = right
                left = this.#getLeftIndex(element)
                right = this.#getRightIndex(element)
            }
        }
    }
}

export {MinHeap}