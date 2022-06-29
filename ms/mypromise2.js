//模拟实现Promise对象
//定义三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
    constructor(fn) {
        const self = this
        this.status = PENDING
        this.value = null
        this.error = null
        this.onfulfilledcb = []
        this.onrejectedcb = []

        function resolve(value) {
            if (value instanceof MyPromise) {
                return value.then(resolve, reject)
            }
            setTimeout(() => {
                if (self.status === PENDING) {
                    self.status = FULFILLED
                    self.value = value
                    for (let item of self.onfulfilledcb) {
                        item(self.value)
                    }
                }
            }, 0)
        }

        function reject(error) {
            setTimeout(() => {
                if (self.status === PENDING) {
                    self.status = REJECTED
                    self.error = error
                    for (let item of self.onrejectedcb) {
                        item(self.error)
                    }
                }
            }, 0)
        }

        try {
            fn(resolve, reject)
        } catch (error) {
            reject(error)
        }

    }

    then(resolvecb, rejectcb) {
        const self = this
        resolvecb = typeof resolvecb === 'function' ? resolvecb : value => { }
        rejectcb = typeof rejectcb === 'function' ? rejectcb : error => { }
        let nextPromise = null
        if (this.status === PENDING) {
            return new MyPromise((resolve, reject) => {
                let resolveF = value => {
                    let result = resolvecb(value)
                    resolvePromise(result, resolve, reject)
                }
                this.onfulfilledcb.push(resolveF)

                let rejectF = error => {
                    let result = rejectcb(error)
                }
                this.onrejectedcb.push(rejectF)
            })
        } else if (this.status === FULFILLED) {
            return nextPromise = new MyPromise((resolve, reject) => {
                setTimeout(() => {
                    let result = resolvecb(this.value)
                    resolvePromise(result, resolve, reject)
                }, 0)
            })
        } else {
            return new MyPromise((resolve, reject) => {
                setTimeout(() => {
                    let result = rejectcb(this.error)
                    resolvePromise(result, resolve, reject)
                }, 0)
            })
        }

        function resolvePromise(result, resolve, reject) {

            if (result instanceof MyPromise) {
                if (result.status === PENDING) {
                    result.then(res => {
                        resolvePromise(res, resolve, reject)
                    }, err => {
                        reject(err)
                    })
                } else {
                    result.then(resolve, reject)
                }
            } else {
                resolve(result)
            }
        }
    }
}

let p = new MyPromise((resolve, reject) => {
    resolve(new MyPromise(resolve => {
        setTimeout(resolve, 5000, 1)
    }))
})
p.then(res => {
    console.log(res)
}, err => {
    console.log(err)
})



