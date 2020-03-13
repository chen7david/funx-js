let self = {
    
    pluralize: require('./pluralize'),

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
    },

    mapIds: (objects) => objects.map(el => el.id),

    notIn: (setA, setB) => setA.filter(el => !setB.includes(el)),

    calcSync: (origional, target) => {
        let add = self.notIn(target, origional)
        let remove = self.notIn(origional, target)
        return {add, remove}
    },

    randInt: (length = 1) => {
        let exp = length -1 > 0 ? length -1 : 1
        return Math.floor((Math.random() * 9 * Math.pow(10, exp)) + Math.pow(10, exp))
    },

    timestamp: () => new Date().toISOString()
}

module.exports = self