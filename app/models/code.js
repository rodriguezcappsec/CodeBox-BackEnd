const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Code",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true
      },
      snippet: {
        type: String,
        required: true
      },
      theme: {
        type: String,
        required: true
      },
      language: {
        type: String,
        required: true
      },
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    },
    {
      timestamps: true
    }
  )
);
