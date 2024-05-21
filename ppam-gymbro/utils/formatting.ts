function numberToRupiah(num : number){
    const result = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",00";
    return result
}

export {numberToRupiah}