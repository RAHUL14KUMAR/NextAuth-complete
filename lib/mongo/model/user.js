import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
    },
    profileImg: {
      type: String,
    },
    password: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);
export const User = models.Users || model("Users", userSchema);
