module.exports = {
    generateArrayNumber(numbers){
        let array = [];
        for (let index = 1; index <= numbers; index++) {
            array.push({
                item: index
            })
        }

        return array;
    } 
}