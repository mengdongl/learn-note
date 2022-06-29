

class Dep {
    constructor() {
        this.list = []
    }

    addSub(value) {
        this.list.push(value)
    }
    collect() {
        if (global.target) {
            this.addSub(global.target)
        }
    }
    notice() {
        const list = [...this.list]
        for (let item of list) {
            item.update()
        }
    }
}

class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm
        this.getter = parsePath(exp)
        this.cb = cb
        this.val = this.get()
    }

    get() {
        global.target = this
        let val = this.getter.call(this.vm, this.vm)
        global.target = undefined
        return val
    }

    update() {
        const oldval = this.val
        this.val = this.get()
        this.cb.call(this.vm, this.val, oldval)
    }
}
const bailRE = /[^\w.$]/
function parsePath(path) {
    if (bailRE.test(path)) {
        return
    }
    const segments = path.split('.')
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}

const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)

const obMethods = ["push", "pop", "shift", "unshift", "sort", "reverse", "splice"]

for (let item of obMethods) {
    const oringe = arrayProto[item]
    Object.defineProperty(arrayMethods, item, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: function mutaion(...args) {
            console.log('触发了数组mutation')
            
            let ruslt =  oringe.apply(this, args)
            const ob = this.__ob__
            ob.dep.notice()
            return ruslt
        }
    })
}

class Observe {
    constructor(data) {
        this.value = data
        if (Array.isArray(data)) {
            Object.setPrototypeOf(data, arrayMethods)
        } else {
            this.walk(data)
        }
    }

    walk(data) {
        let keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(data, keys[i], data[keys[i]])
        }
    }
}

function defineReactive(data, key, val) {
    if(typeof val === "object"){
        new Observe(val)
    }
    let dep = new Dep()
    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get: function () {
            dep.collect()
            return val
        },
        set: function (newval) {
            if (newval === val) {
                return
            }
            val = newval
            dep.notice()
        }
    })
}



let obj1 = {
    a: 1,
    b: 2,
    c: {
        d:1
    }
}

new Observe(obj1)

new Watcher(obj1, 'c.d', function (newval, oldval) {
    console.log("newval:", newval, "oldval:", oldval)
})

// obj1.c.push(2)

obj1.a = 2

obj1.a = 3

obj1.a = 4

obj1.c.d=2
obj1.c.d=3
obj1.c.d=4