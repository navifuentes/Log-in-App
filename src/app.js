import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import __dirname from "./utils.js";
import config from "./config.js";
import cookieParser from "cookie-parser";

const { mongo, sessions } = config;

// Initialize express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://ivanfa:XkCvT34E1Y7kp38M@coderbackend.sofmxkl.mongodb.net/sessions?retryWrites=true&w=majority",
    }),
    resave: false,
    saveUninitialized: true,
    secret: "foo",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //1 day
    },
  })
);

// Settings Handlebars view engine
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Routes
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/api/users/register", async (req, res) => {
  const { email, username, password } = req.body;
  const newUser = {
    email,
    username,
    password,
  };
  console.log(newUser);
  res.cookie("CoderCookie", newUser).send("una cookie");
  //res.send(`<h1>an email has been sent to "${email}" </h1> `);
});
app.get("/getCookies", (req, res) => {
  res.send(req.cookies);
});

app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    return res.send(`Has visitado este sitio ${req.session.counter} veces`);
  }
  req.session.counter = 1;
  res.send("Bienvenido");
  return;
});

const server = app.listen(8080, () => {
  console.log("Listening on port 8080");
});
