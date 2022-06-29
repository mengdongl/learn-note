//模拟实现async  await 语法糖
function* test() {
    let a = yield new Promise(resolve => {
        setTimeout(resolve, 1000, 1)
    })
    console.log(a)
    let b = yield new Promise(resolve => {
        setTimeout(resolve, 2000, 2)
    })
    console.log(b)
    let c = yield 3
    console.log(c)
    return new Promise(resolve=>{
        setTimeout(resolve,5000,5)
    })
}

function runG(genF) {
    return new Promise((resolve, reject) => {
        let gen = genF()
        function move(val) {
            try {
                let next = gen.next(val)
            } catch (error) {
                return reject(error)
            }
            if (next.done) {
                return resolve(next.value)
            } else {
                Promise.resolve(next.value).then(res=>{
                    move(res)
                }).catch(err=>{
                    return reject(err)
                })
            }
        }
        move()
    })
}

runG(test).then(res=>{
    console.log(res)
})

