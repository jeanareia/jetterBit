export default class Order{
    constructor(orderId, value, creationDate, status){
        this.orderId = orderId;
        this.value = value;
        this.creationDate = creationDate;
        this.status = status;
    }
}