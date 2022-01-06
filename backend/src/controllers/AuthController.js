import jwt from "jsonwebtoken";
import User from '../models/Users';

const AuthController = {
  async googleLogin(req, res, next) {
    if (!req.user) {
      return res.status(401).send({ error: "User was not authenticated" });
    }
    const user = req.user;
    const token = jwt.sign('123', process.env.JWT_SECRET);
    return res.status(200).send({ token, user });
  },
  async facebookLogin(req, res, next) {
    const existingGoogleUser = await User.findOne({ email: req.body.email });
    if (existingGoogleUser) {
      existingGoogleUser.facebookID = req.body.id;
      existingGoogleUser.likes = req.body.likeResponseData.data;
      await existingGoogleUser.save();
    }
    return res.status(200).send({ user: existingGoogleUser });
  },
};

export default AuthController;
