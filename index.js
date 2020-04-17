const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

let self = {
    
    pluralize: require('./pluralize'),

    dd: (val) => console.log(val),

    isArray: (arr) => Array.isArray(arr),

    isObject: (object) => typeof object === 'object' && object !== null,

    isString: (object) => typeof object === 'string',

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

    reqdir: (...folderPath) => {
    
        const modules = {}
        const folder = path.join(...folderPath)
        const files = fs.readdirSync(folder)
    
        for(let file of files){
            if(file.indexOf(".js") > -1 && file != 'index.js')
            modules[file.replace(/\.js/, '')] = require(path.join(folder,file))
        }
    
        return modules
    },

    mapIds: (objects) => objects.map(el => el.id),

    notIn: (setA, setB) => setA.filter(el => !setB.includes(el)),

    randInt: (min,max) => Math.floor(Math.random() * (max - min + 1)) + min,

    randEl: (array) => {
        const randInt = self.randInt(0, array.length -1)
        return array[randInt]
    },

    randChar: () => {
        const chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ"
        return self.randEl(chars)
    },

    serialInt: (mask) => {
        let serial = ""
        if(mask) {
            for(let i = 0; i < mask.length; i++){
                let maskChar = mask[i] 
                serial += maskChar == "0" ? self.randInt(0,9) : maskChar
            }
        }
        return serial
    },

    serialChar: (mask) => {
        let serial = ""
        if(mask) {
            for(let i = 0; i < mask.length; i++){
                let maskChar = mask[i] 
                serial += maskChar == "0" ? self.randChar() : maskChar
            }
        }
        return serial
    },

    md5: () => crypto.createHash('md5').update(`${Math.random()}`).digest('hex'),

    timestamp: () => new Date().toISOString(),


}

module.exports = self