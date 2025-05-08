const { Router } = require("express");
const { getOrders, getOrdersById, getCancelations } = require("../../controllers/user/orderController");
const { checkAuthCookie } = require("../../middleware/authToken");
const orderRouter = Router();


orderRouter.get("/orders", checkAuthCookie('userToken'), getOrders);

orderRouter.get("/orders/:orderid", checkAuthCookie('userToken'), getOrdersById);

orderRouter.get("/cancellations", checkAuthCookie('userToken'), getCancelations);


module.exports = orderRouter;
