


const express = require("express");
const { orderController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const orderRouter = express.Router();

orderRouter.post("/create",auth('employee'), orderController.createOrder);  
orderRouter.get("/list", auth('employee'), orderController.getAllOrders);
orderRouter.get("/details/:id", auth('employee'), orderController.getOrderById);
orderRouter.patch("/update/:id", auth('employee'), orderController.updateOrderStatus);
orderRouter.patch("/delete/:id", auth('employee'), orderController.deleteOrder);




// admin routes
orderRouter.get("/admin/list", auth('admin'), orderController.getAllOrdersForAdmin);
orderRouter.get("/admin/details/:id", auth('admin'), orderController.getOrderByIdForAdmin);
orderRouter.patch("/admin/update/:id", auth('admin'), orderController.updateOrderStatusForAdmin);
orderRouter.patch("/admin/delete/:id", auth('admin'), orderController.deleteOrderForAdmin);

module.exports = orderRouter;
