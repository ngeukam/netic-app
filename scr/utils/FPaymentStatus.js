export default function PaymentStatus (x) {
if(x==1){
    return 'Not Paid'
}
else if(x==2){
    return 'Partial Paid'
}
else{
    return 'Paid'
}
}