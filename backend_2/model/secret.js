const mongoose = require("mongoose");

const secretSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },

    text: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("secret", secretSchema);
