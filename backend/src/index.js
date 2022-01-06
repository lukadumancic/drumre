import cors from "cors";
import logger from "morgan";
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import "./services/google";
import "./services/facebook";
import mongoose from 'mongoose';
import passport from 'passport';
const cookieSession = require("cookie-session");

mongoose.connect('mongodb+srv://admin1:foobar123@cluster0.bxbwy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

require('./models/Users');

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(
  cookieSession({
    name: 'session',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['testkey123']
  })
);
app.use(passport.initialize());
app.use(passport.session());

routes(app);

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
