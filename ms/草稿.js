function runGen(genF){
    return new Promise((resolve,reject)=>{
        let gen
        try {
            gen = genF()
        } catch (error) {
            reject(error)
        }
        function move(prevalue){
            let current
            try {
                current = gen.next(prevalue)
            } catch (error) {
                reject(error)
            } 
            let {value,done} = current
            if (done) {
                resolve(value)
            } else {
                Promise.resolve(value).then(res=>{
                    move(res)
                })
            }

        }
        move()
    })
}

function * myAsync (){
    let a = yield new Promise(resolve=>{
        setTimeout(resolve,1000,1)
    })
    console.log(a)

    let b = yield 2
    console.log(b)
    let c = yield new Promise(resolve=>{
        setTimeout(resolve,1000,3)
    })
    console.log(c)
    return 4
}

runGen(myAsync).then(res=>{
    console.log(res)
})