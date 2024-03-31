export default function currencyFormat(num, cur) {
    if(cur == 1){
        return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' xaf'
    }else if(cur == 2){
        return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' €'
    }else{
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    
 }