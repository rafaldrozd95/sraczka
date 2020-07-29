const mongoose = require("mongoose");

const tyreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    size: {
      type: String,
      ref: "Size",
      required: true,
      lowercase: true,
    },
    type: {
      type: String,
      ref: "Type",
      required: true,
      lowercase: true,
      enum: ["nowa", "bieznikowana"],
    },
    clas: {
      type: String,
      ref: "Class",
      required: true,
      lowercase: true,
      enum: ["terenowa", "samochodowa", "wzmacniana"],
    },
    image: [String],
    imageCover: [String],
    price: { type: Number, required: true },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Tyre", tyreSchema);
