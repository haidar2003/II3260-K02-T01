function numberToRupiah(num : number){
    const result = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",00";
    return result
}

function numberInput(text : string) : number{
    const result = text.replace(/[^0-9]/g, '')
    const result_num = parseInt(result)

    if (isNaN(result_num)){
        return 0
    } else {
        return result_num
    }
    
}

function floatInput(text : string) : number{
    const result = text.replace(/[^\d.]/g, (match, offset) => {
        if (match === '.') {
            return offset === 0 ? '.' : '';
        }
        return ''});
    // const result = text
    const result_num = parseFloat(result)
    if (isNaN(result_num)){
        return 0
    } else {
        return result_num
    }
    
}

export {numberToRupiah, numberInput,floatInput}