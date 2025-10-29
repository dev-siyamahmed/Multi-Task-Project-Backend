const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const Order = require("../models/order.model");
const Service = require("../models/service.model");
const SubCategory = require("../models/subCategory.model");
const Category = require("../models/category.model");

// CREATE ORDER
const createOrderIntoDB = async (orderBody, userId) => {
  const {   serviceId, quantity , redirectUrl , note } = orderBody;

  // find the service
  const service = await Service.findById(serviceId);
  if (!service) throw new ApiError(httpStatus.NOT_FOUND, "Service not found");

  // find subCategory and category for tracking
  const subCategory = await SubCategory.findById(service.subCategoryId);
  if (!subCategory) throw new ApiError(httpStatus.NOT_FOUND, "SubCategory not found");

  const category = await Category.findById(subCategory.categoryId);
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category not found");

  // calculate total price
  const totalPrice = service.price * quantity;

  // create new order
  const order = await Order.create({
    userId,
    serviceId,
    subCategoryId: subCategory._id,
    categoryId: category._id,
    redirectUrl,
    quantity,
    note,
    totalPrice
    
  });
  return order;
};

// GET ALL ORDERS

const getAllOrdersFromDB = async (options = {}, userId = null) => {
  const query = { isDeleted: false };

  if (userId) query.userId = userId; 

  const populateFields = "userId serviceId subCategoryId categoryId";

  const orders = await Order.paginate(query, {
    ...options,
    populate: populateFields,
    sort: { createdAt: -1 },
  });

  return orders;
};



// GET ORDER BY ID
const getOrderByIdFromDB = async (id) => {
  const order = await Order.findById(id).populate("userId serviceId subCategoryId categoryId");
  if (!order) throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  return order;
};

// UPDATE ORDER STATUS
const updateOrderStatusInDB = async (id, updateBody, userId) => {
  const order = await getOrderByIdFromDB(id, userId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status !== "pending") {
    throw new Error("Order cannot be updated once it is confirmed or cancelled");
  }

  if (updateBody.quantity && updateBody.quantity !== order.quantity) {
    const service = await Service.findById(order.serviceId);
    if (!service) throw new Error("Service not found");
    order.totalPrice = service.price * updateBody.quantity;
  }

  Object.assign(order, updateBody);
  await order.save();
  return order
};


// DELETE ORDER (soft delete)
const deleteOrderFromDB = async (id, userId) => {
  const order = await getOrderByIdFromDB(id, userId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status !== "pending") {
    throw new Error("Only pending orders can be deleted");
  }

  order.isDeleted = true;
  await order.save();

  return order;
};




// admin service functions

// GET ALL ORDERS
const getAllOrdersForAdminFromDB = async ( options = {}) => {
  const query = { isDeleted: false };
  const populateFields = "userId serviceId subCategoryId categoryId";
  const orders = await Order.paginate({ ...query }, { ...options, populate: populateFields });
  return orders;
};


// GET ORDER BY ID
const getOrderByIdForAdminFromDB = async (id) => {
  const order = await Order.findById(id).populate("userId serviceId subCategoryId categoryId");
  if (!order) throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  return order;
};

// UPDATE ORDER STATUS
const updateOrderStatusForAdminFromDB = async (id, updateBody) => {
  const order = await getOrderByIdForAdminFromDB(id); // Admin জন্য order fetch

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status !== "pending") {
    throw new Error("Order cannot be updated once it is confirmed or cancelled");
  }

  if (updateBody.status) {
    order.status = updateBody.status;
  }

  await order.save();
  return order.populate("userId serviceId subCategoryId categoryId");
};


// DELETE ORDER (soft delete)
const deleteOrderForAdminFromDB = async (id) => {
  const order = await getOrderByIdForAdminFromDB(id);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status !== "pending") {
    throw new Error("Only pending orders can be deleted");
  }

  order.isDeleted = true;
  await order.save();

  return order;
};



module.exports = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrderByIdFromDB,
  updateOrderStatusInDB,
  deleteOrderFromDB,



  // admin exports
  getAllOrdersForAdminFromDB,
  getOrderByIdForAdminFromDB,
  updateOrderStatusForAdminFromDB,
  deleteOrderForAdminFromDB,
};
