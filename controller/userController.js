import userModel from "../models/userModel.js";

//======== UPDTE USER ==========
export const updateUserController = async (req, res, next) => {
  const { name, email, lastname, location } = req.body;
  if (!email || !name || !lastname || !location)
    next("Please Provide all feilds");
  const user = await userModel.findOne({ _id: req.user.userId });
  user.name = name;
  user.lastname = lastname;
  user.email = email;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  });
};
