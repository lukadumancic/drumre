import passport from "passport";
import AuthController from "../controllers/AuthController";

const routes = (app) => {
  app.get("/", (req, res) =>
    res.send("Welcome to my Google Oauth express server")
  );

  app.post(
    "/oauth/google",
    passport.authenticate("google-token", { session: true, scope: 'https://www.googleapis.com/auth/calendar.readonly' }),
    AuthController.googleLogin
  );

  app.post(
    "/oauth/facebook",
    AuthController.facebookLogin
  );
};

export default routes;
