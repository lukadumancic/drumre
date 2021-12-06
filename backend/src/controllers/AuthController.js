import jwt from "jsonwebtoken";

const AuthController = {
  async googleLogin(req, res, next) {
    if (!req.user) {
      return res.status(401).send({ error: "User was not authenticated" });
    }
    const user = req.user;
    const token = jwt.sign('123', process.env.JWT_SECRET);
    return res.status(200).send({ token, user });
  },
};

export default AuthController;
