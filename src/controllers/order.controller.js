
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const orderService = require("../services/order.service");


// CREATE ORDER
const createOrder = catchAsync(async (req, res) => {
  const userid = req.user.id;
  const order = await orderService.createOrderIntoDB(req.body , userid);
  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: order,
  });
});

// GET ALL ORDERS
const getAllOrders = catchAsync(async (req, res) => {
  const userId = req.user.id; // logged-in user
  const options = pick(req.query, ["limit", "page", "sortBy"]);

  const orders = await orderService.getAllOrdersFromDB(options, userId);

  res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
    data: orders,
  });
});


// GET ORDER BY ID
const getOrderById = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const order = await orderService.getOrderByIdFromDB(req.params.id, userId);
  res.status(200).json({
    success: true,
    data: order,
  });
});

// UPDATE ORDER STATUS
const updateOrderStatus = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const order = await orderService.updateOrderStatusInDB(req.params.id, req.body, userId);
  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: order,
  });
});

// DELETE ORDER (soft delete)
const deleteOrder = catchAsync(async (req, res) => {
  const userId = req.user.id;
  await orderService.deleteOrderFromDB(req.params.id, userId);
  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});



// admin controllers can be same as above since they have access through auth middleware


// GET ALL ORDERS
const getAllOrdersForAdmin = catchAsync(async (req, res) => {
  const options = pick(req.query, ["limit", "page", "sortBy", "populate"]);
  const orders = await orderService.getAllOrdersFromDB(options);
  res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
    data: orders,
  });
});

// GET ORDER BY ID
const getOrderByIdForAdmin = catchAsync(async (req, res) => {
  const order = await orderService.getOrderByIdFromDB(req.params.id);
  res.status(200).json({
    success: true,
    data: order,
  });
});

// UPDATE ORDER STATUS
const updateOrderStatusForAdmin = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderStatusInDB(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: order,
  });
});

// DELETE ORDER (soft delete)
const deleteOrderForAdmin = catchAsync(async (req, res) => {
  await orderService.deleteOrderFromDB(req.params.id);
  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});



module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,

// admin exports controllers
  getAllOrdersForAdmin,
  getOrderByIdForAdmin,
  updateOrderStatusForAdmin,
  deleteOrderForAdmin,
};
