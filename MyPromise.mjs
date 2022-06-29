
//定义三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";


class MyPromise {
    #status = PENDING
    #value = null
    #error = null
    #onFulfilledCbs=[]
    #onRejectedCbs=[]
    constructor(fn){
        const self = this
        function resolve (value){
            if (value instanceof MyPromise) {
                return value.then(resolve, reject)
            }
            setTimeout(()=>{
                if(self.#status===PENDING){
                    self.#status = FULFILLED
                    self.#value = value
                    for(let item of self.#onFulfilledCbs){
                        item(self.#value)
                    }
                }
            },0)
        }
        function reject(error){
            setTimeout(()=>{
                if(self.#status===PENDING){
                    self.#status = REJECTED
                    self.#error = error
                    for(let item of self.#onRejectedCbs){
                        item(self.#error)
                    }
                }
            },0)
        }

        try {
            fn(resolve,reject)
        } catch (error) {
            reject(error)
        }
    }

    then(resolveCb,rejectCb){
        resolveCb = typeof resolveCb ==='function'?resolveCb:(val)=>{}
        rejectCb = typeof rejectCb ==='function'?rejectCb:(err)=>{}
        const self = this
        if (self.#status === FULFILLED) {
            return new MyPromise((resolve,reject)=>{
                setTimeout(()=>{
                        let result = resolveCb(value)
                        handleResult(result,resolve,reject)
                },0)
            })
        } else if(self.#status === REJECTED){
            return new MyPromise((resolve,reject)=>{
                setTimeout(()=>{
                        let result = rejectCb(value)
                        handleResult(result,resolve,reject)
                },0)
            })
        }else{
            return new MyPromise((resolve,reject)=>{
                let f1 = (value)=>{
                    let result = resolveCb(value)
                    handleResult(result,resolve,reject)
                }
                self.#onFulfilledCbs.push(f1)

                let f2 = (error)=>{
                    let result = rejectCb(error)
                    handleResult(result,resolve,reject)
                }
                self.#onRejectedCbs.push(f2)
            })
        }

        function handleResult(result,resolve,reject){
            if (result instanceof MyPromise) {
                if (result.#status===PENDING) {
                    result.then(res=>{
                        handleResult(res,resolve,reject)
                    },err=>{
                        reject(err)
                    })
                } else {
                    result.then(resolve,reject)
                }
            } else {
                resolve(result)
            }
        }
    }
}

let p  = new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
        let p = {
            then(r,j){
                setTimeout(r,2000,2)
            }
        }
        resolve(p)
    },1000)
})

p.then(res=>{
    console.log(res)
})