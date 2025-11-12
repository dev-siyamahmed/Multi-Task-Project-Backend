

const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const orderSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    redirectUrl: {
      type: String,
      required : true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    totalPrice: {
      type: Number,
      default: null,
    },
    note : {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    startDate: {
      type: Date,
      default: null,  
    },
    endDate: {
      type: Date,
      default: null,  
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// exclude deleted orders automatically
orderSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

const order = mongoose.model("Order", orderSchema);
module.exports = order;
