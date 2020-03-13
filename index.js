let self = {
    dd: (val) => console.log(val),

    isArray: (arr) => Array.isArray(arr),

    isObject: (object) => typeof object === 'object' && object !== null,

    pick: (O, K) => K.reduce((o, k) => (o[k]=O[k], o), {}),

    omit: (object, keys) => {
        keys.forEach(key => delete object[key])
        return object
    },

    omitWalk: (object, keys) => {
        Object.keys(object).forEach(key => {
            if(self.isArray(object[key])) self.omitWalk(object[key], keys)
            if(self.isObject(object[key])) self.omitWalk(object[key], keys)
            if(keys.includes(key)) delete object[key]
        })
        return object
    }
}

module.exports = self