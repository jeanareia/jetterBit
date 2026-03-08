const Item = require('./Item')

class Order{
    constructor({id, orderId, value, creationDate, items}){
        this.id = id;
        this.orderId = orderId;
        this.value = value;
        this.creationDate = creationDate;
        this.items = (items || []).map(item=> new Item(item));
    }
}

module.exports = Order;