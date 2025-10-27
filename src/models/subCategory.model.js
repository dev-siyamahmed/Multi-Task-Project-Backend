
const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

subCategorySchema.pre(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

subCategorySchema.plugin(toJSON);
subCategorySchema.plugin(paginate);
const subCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = subCategory;
