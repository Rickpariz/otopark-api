const randomstring = require("randomstring");

module.exports = {
    gerarArrayDeObjetos(numbers){
        let array = [];
        for (let index = 1; index <= numbers; index++) {
            array.push({
                item: index
            })
        }

        return array;
    },

    gerarHahcode(){
        return randomstring.generate({
            length: 4,
            charset: '123456789ABCDEF'
        })
    }
}