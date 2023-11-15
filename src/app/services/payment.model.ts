export interface Payment{
    paymentID: string,
    creditCardNum: string;
    expDate: string;
    cvv: string;
    bookingID: string;
    productID: string;
    tourTitle: string;
    totalPrice: number;
    username: string;
}