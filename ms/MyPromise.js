const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

class MyPromise {
    constructor(handle) {
        if (typeof handle !== 'function') {
            throw new Error('handle must be a function!')
        }
        this.status = PENDING
        this.value = null
        this.onfulfilledcbs = []
        this.onrejectedcbs = []

        handle(this._resolve.bind(this), this._reject.bind(this))
    }

    _resolve(value) {
        setTimeout(() => {
            if (this.status === PENDING) {
                this.status = FULFILLED
                this.value = value
                for (let cb of this.onfulfilledcbs) {
                    cb(this.value)
                }
            }
        }, 0)
    }

    _reject(err) {
        setTimeout(() => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.value = err
                for (let cb of this.onrejectedcbs) {
                    cb(this.value)
                }
            }
        }, 0)
    }

    then(resolvecb, rejectcb) {
        const { value, status } = this
        return new MyPromise((resolveNext, rejectNext) => {
            let fulfilledcb = val => {
                try {
                    if (typeof resolvecb !== "function") {
                        resolveNext(val)
                    } else {
                        let res = resolvecb(val)
                        if (res instanceof MyPromise) {
                            res.then(resolveNext, rejectNext)
                        } else {
                            resolveNext(res)
                        }
                    }
                } catch (error) {
                    rejectNext(error)
                }
            }

            let rejectedcb = err => {
                try {
                    if (typeof rejectcb !== "function") {
                        rejectNext(err)
                    } else {
                        let res = rejectcb(err)
                        if (res instanceof MyPromise) {
                            res.then(resolveNext, rejectNext)
                        } else {
                            resolveNext(res)
                        }
                    }
                } catch (error) {
                    rejectNext(error)
                }
            }

            switch (status) {
                case PENDING:
                    this.onfulfilledcbs.push(fulfilledcb)
                    this.onrejectedcbs.push(rejectedcb)
                    break;
                case FULFILLED:
                    setTimeout(fulfilledcb, 0, value)
                    break;
                case REJECTED:
                    setTimeout(rejectedcb, 0, value)
                    break;
                default:
                    break;
            }
        })
    }

    finally(cb) {
        return this.then(value => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.resolve(cb()).then(() => { throw reason }))
    }

    static resolve(value) {
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }

    static all(list = []) {
        return new MyPromise((resolve, reject) => {
            let result = []
            let count = 0
            for (let [i, p] of list.entries()) {
                this.resolve(p).then(res => {
                    count++
                    result[i] = res
                    if (count == list.length){
                        resolve(result)
                    }
                }, err => {
                    reject(err)
                })
            }
        })
    }

    static race(list = []){
        return new MyPromise((resolve,reject)=>{
            for(let p of list){
                this.resolve(p).then(res=>{
                    resolve(res)
                },err=>{
                    reject(err)
                })
            }
        })
    }
}

let p = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 1000, 1)
})

p.then(res => {
    console.log('p1', res)
    return new MyPromise((resolve, reject) => {
        setTimeout(resolve, 2000, 2)
    })
}, err => {
    console.log(err)
}).then(res => {
    console.log(res)
})

p.then(res => {
    console.log('p2:', res)
})