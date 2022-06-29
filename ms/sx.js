const { Console } = require("console")
const { resolve } = require("path")

function call2(context, ...value) {
    context = context || window  //当call方法第一个参数为null时，this默认指向window
    context.func = this
    const result = context.func(...value)
    delete context.func
    return result //call方法的返回值
}

function apply2(context, value) {
    context = context || window  //当apply方法第一个参数为null时，this默认指向window
    context.func = this
    const result = context.func(...value)
    delete context.func
    return result //apply方法的返回值
}
// call、apply方法的实现主要注意两点：1.this参数传null时，this默认指向window。 2.处理函数的返回值

function bind2(context, ...value1) {
    const self = this
    const func = function (...value2) {
        context = this instanceof self ? this : context  //如果bind2绑定生成的函数被当作构造函数，忽略传入的context
        self.apply(context, [...value1, value2])
    }
    func.prototype = self.prototype
    return func
}
//bind方法的实现主要有一个难点： 当bind生成的函数作为构造函数使用时,忽略bind函数传入的this值。既bind生成的函数当作原始的构造函数来使用。
//实现的关键在于  this instanceof self?  和 func.prototypt = self.prototype 这两句 

function new2(Func, ...values) {
    const obj = new Object()
    Object.setPrototypeOf(obj, Func.prototype)
    const result = Func.apply(obj, values)
    return typeof result === 'object' ? result : obj  //构造函数返回值如果是个object，生成的实例就是这个object
}
//new的实现需要注意: 构造函数也有可能有返回值。当返回值是一个对象时,构造函数生成的对象即为这个对象。如果构造函数返回其它非对象值，则返回生成的实例。

function instanceof2(obj, constructor) {
    let current = Object.getPrototypeOf(obj)
    while (current !== null) {
        if (current.constructor === constructor) {
            return true
        }
        current = Object.getPrototypeOf(current)
    }
    return false
}
Function.prototype.call2 = call2
Function.prototype.apply2 = apply2
Function.prototype.bind2 = bind2

//防抖
function debounce(func, wait) {
    let tiemout
    let iscalled = false
    return function (...args) {
        clearTimeout(tiemout)
        tiemout = setTimeout(() => {
            iscalled = false
        }, wait)
        if (!iscalled) {
            func.apply(this, args)
            iscalled = true
        }
    }
}

//节流
function jl(func, wait) {
    let timeout
    let previous = 0
    if (true) {  //时间戳方式
        return function (...args) {
            let now = +new Date()
            const context = this
            if ((now - previous) > wait) {
                func.apply(context, args)
                previous = now
            }
        }
    } else {  //setTimeout方式
        return function (...args) {
            const context = this
            if (!timeout) {
                timeout = setTimeout(() => {
                    func.apply(context, args)
                    timeout = null
                }, wait)
            }
        }
    }
}

//函数柯里化
function curry(fn, ...args1) {
    let length = fn.length
    let _args = args1 || []
    return function (...args2) {
        let combineArgs = [..._args, ...args2]
        if (combineArgs.length < length) {
            return curry.apply(this, [fn, ...combineArgs])
        } else {
            return fn.apply(this, combineArgs)
        }
    }
}

//深拷贝
function deepCopy(obj, cach = new WeakMap()) {
    if (!obj instanceof Object) return obj
    if (cach.has(obj)) return cach.get(obj)
    if (obj instanceof Function) {
        return function (...rest) {
            return obj.apply(this, rest)
        }
    }
    let newobj = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj))
    cach.set(obj, newobj)
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] instanceof Object) {
                newobj[key] = deepCopy(obj[key], cach)
            } else {
                newobj[key] = obj[key]
            }
        }
    }
    return newobj
}
