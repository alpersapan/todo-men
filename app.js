const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const pageRoute = require("./routers/pageRoute");
const todoRoute = require("./routers/todoRoute");
const userRoute = require("./routers/userRoute");

const app = express();

global.userIN = null;
global.userName = null;

//Connect DB
mongoose
  .connect(
    "mongoconnection",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connected Successfully");
  });

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
app.use(
  session({
    secret: "my_todolist",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongoconnection",
    }),
  })
);
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  userName = req.session.userName;
  next();
});

//Routes
app.use("/", pageRoute);
app.use("/todos", todoRoute);
app.use("/user", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
