function createNewOrder(req, res) {
    res.send("createNewOrder");
}

function getOrderById(req, res) {
    res.send("getOrderById");
}

function getAllOrders(req, res) {
    res.send("getAllOrders");
}

function updateOrderById(req, res) {
    res.send("UpdateOrderById");
}

function deleteOrderById(req, res) {
    res.send("deleteOrderById");
}


module.exports = {
    createNewOrder,
    getOrderById,
    getAllOrders,
    updateOrderById,
    deleteOrderById
};