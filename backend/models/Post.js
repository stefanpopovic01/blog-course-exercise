const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Naslov posta je obavezan"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Opis posta je obavezan"],
    },
    image: {
      type: String, // URL slike
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ref na User model
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
