import Watcher from './watcher.mjs'
import Observe from './observe.mjs'

function Vue() {
    
}


const $watch = function (_vm, expOrFn, cb, options = {}) {
    const vm = _vm
    //const vm = this
    const { deep, immediate } = options
    const watcher = new Watcher(vm, expOrFn, cb, options)

    if (immediate) {
        cb.call(vm, watcher.value)
    }

    return function () {
        watcher.teardown()
    }
}

const $set = function (target, key, val) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, Number(key))
        target.splice(key, 1, val)
        return val
    }

    if (key in target && !(key in Object.prototype)) {
        target[key] = val
        return val
    }

    const ob = target.__ob__

    if (!ob) {
        target[key] = val
        return val
    }
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}

const $delete = function (target, key) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.splice(key, 1)
        return
    }
    if (!hasOwn(target, key)) {
        return
    }
    const ob = target.__ob__
    delete target[key]
    if (!ob) {
        return
    }
    ob.dep.notify()
}

Vue.prototype.$on = function (event, cb) {
    const vm = this
    if (Array.isArray(event)) {
        for (let i = 0; i < event.length; i++) {
            this.$on(event[i], cb)
        }
    } else {
        if (vm.__event[event] || (vm.__event[event] = [])) {
            vm.__event[event].push(cb.bind(vm))
        }
    }
    return vm
}

Vue.prototype.$off = function (event, cb) {
    const vm = this
    if (arguments.length === 0) {
        vm.__event = Object.create(null)
        return vm
    }

    if (Array.isArray(event)) {
        for (let i = 0; i < event.length; i++) {
            this.$off(event[i], cb)
        }
        return vm
    }
    const cbs = vm.__event[event].slice()

    if (!cbs) {
        return vm
    }

    if (arguments.length === 1) {
        vm.__event[event] = null
    }

    if (cb) {
        let i = cbs.length
        while (i--) {
            if (cb === cbs[i] || cb === cbs[i].cb) {
                cbs.splice(i, 1)
                break
            }
        }
    }
    return vm
}

Vue.prototype.$once = function (event, cb) {
    const vm = this
    function on() {
        vm.$off(envent, on)
        fn.apply(vm, arguments)
    }
    on.cb = cb
    this.$on(event, on)
    return vm
}

Vue.prototype.$emit = function (event, ...args) {
    const vm = this
    const cbs = vm.__event[event]
    if (cbs) {
        for (let i = 0; i < cbs.length; i++) {
            try {
                cbs[i].apply(vm, args)
            } catch (error) {
                handleError(error)
            }
        }
    }
    return vm
}

Vue.prototype.$nextTick = function (cb) {
    const vm = this
    nextTick(vm, cb)
    return vm
}


    let pendding = false
    let callbacks = []

    function flush (){
        pendding = false
        const cbs = callbacks.slice()
        callbacks.length = 0
        if(cbs){
            for(let i = 0;i<cbs.length;i++){
                cbs[i]()
            }
        }
    }

    let mico
    const p = Promise.resolve()
    mico = ()=>p.then(flush)

    function nextTick(vm,cb){
        let _resolve
        callbacks.push(()=>{
            if (cb) {
                cb.call(vm)
            } else if(_resolve){
                _resolve(vm)
            }
        })
        if(!pendding){
            pendding = true
            mico()
        }

        if(!cb&&typeof Promise !== "undefined"){
            return new Promise(resolve=>{
                _resolve = resolve
            })
        }
    }



let obj1 = {
    a: 1,
    b: 2,
    c: {
        d: 1
    }
}

new Observe(obj1)

const w = new Watcher(obj1, 'c.d', function (newval, oldval) {
    console.log("newval:", newval, "oldval:", oldval)
})

obj1.a = 2

obj1.a = 3

obj1.a = 4

obj1.c.d = 2
obj1.c.d = 3
w.teardown()
obj1.c.d = 4