const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const connectDB = require("./config/db");
const app = express();

// DOTENV CONFIG FOLDER
dotenv.config({ path: "./config/config.env" });

require("./config/passport")(passport);
require("./config/passport2")(passport);

connectDB();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handlebars Helpers
const { formatDate } = require("./helpers/hbs");

// HANDLEBARS
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      formatDate,
    },
  })
);
app.set("view engine", ".hbs");

//Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

// Express Messages Middleware
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Passort Session Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// PUBLIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/payment", require("./routes/payment"));

app.listen(
  process.env.PORT || 3000,
  console.log(`Server Started at port: ${process.env.PORT}`)
);
