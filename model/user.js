const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const productSchema = new mongoose.Schema(
  {
    name: String,
    quantity: Number,
    price: Number,
    image: String,
    id: Object,
  },
  { timestamps: true }
);
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  isAdmin: Boolean,
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  products: [productSchema],
  history: [productSchema],
  walletBalance: { type: Number, default: 0 },
  isReferMoneyAvailed: { type: Boolean, default: false },
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
