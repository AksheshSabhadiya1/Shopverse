const { Router } = require("express");
const { getOrders, getOrdersById, getCancelations } = require("../../controllers/user/orderController");
const orderRouter = Router();


orderRouter.get("/orders", getOrders);

orderRouter.get("/orders/:orderid", getOrdersById);

orderRouter.get("/cancellations", getCancelations);


module.exports = orderRouter;
