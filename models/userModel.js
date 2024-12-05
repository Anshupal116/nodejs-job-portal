import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

//schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: [6, "Password Should Be grater than 6 Alphabate"],
      select: true,
    },
    location: {
      type: String,
      default: "Delhi",
    },
  },
  { timestamps: true }
);
//middelwares
userSchema.pre("save", async function () {
  if (!this.isModied) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// JASON WEB TOKEN
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
export default mongoose.model("user", userSchema);
