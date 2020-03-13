module.exports = {
    dd(val){ console.log(val) },

    isArray(arr){ return Array.isArray(arr) },

    isObject(object){ return typeof object === 'object' && object !== null },

    pick(O, K){ return K.reduce((o, k) => (o[k]=O[k], o), {})},

    omit(object, keys){
        keys.forEach(key => delete object[key])
        return object
    },

    omitWalk(object, keys){
        Object.keys(object).forEach(key => {
            if(this.isArray(object[key])) omitWalk(object[key], keys)
            if(this.isObject(object[key])) omitWalk(object[key], keys)
            if(keys.includes(key)) delete object[key]
        })
        return object
    }
}