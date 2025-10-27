
const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

categorySchema.pre(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});


categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

const category = mongoose.model("Category", categorySchema);

module.exports = category;