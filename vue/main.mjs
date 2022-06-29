function defineReactive(data, key, val) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('getter:',val)
            return val
        },
        set: function (newVal) {
            if (val === newVal) {
                return
            }
            val = newVal
            console.log('setter:',val)
        }
    })
}

let a = {}
defineReactive(a,'mdl',18)
