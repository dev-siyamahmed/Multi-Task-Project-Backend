

const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

serviceSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

serviceSchema.plugin(toJSON);
serviceSchema.plugin(paginate);

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
