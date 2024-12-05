import { error } from "console";
import userModel from "../models/userModel.js";

export const ragisterController = async (req, res, next) => {
  const { name, email, password } = req.body;
  //validate
  if (!name) {
    next("Plesae Provide Name");
  }
  if (!email) {
    next("Please Provide Email");
  }
  if (!password) {
    next("Please Provide Password");
  }
  const exisitingUser = await userModel.findOne({ email });
  if (exisitingUser) {
    next("Email Already Ragister Please Login");
  }
  const user = await userModel.create({ name, email, password });
  //token
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "User Created Successfully",
    user,
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    next("Please Provide All Fields");
  }
  //find user by email
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid Useraname or password");
  }
  //compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid Useraname or password");
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(201).json({
    success: true,
    message: "Login Successfully",
    user,
    token,
  });
};
