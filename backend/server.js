require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const setCache = require("./Controller/middleware/cacheRoutes")
const credentials = require("./Controller/middleware/credentials");
const Sequelize = require("sequelize");
var sequelizeDb = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  storage: "./session.mysql",
});
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { sequelize } = require("./models");
const verifyJWT = require("./Controller/middleware/verifyJWT");
const PORT = process.env.PORT || 3000;


// credentials enables to fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// webhook endpoint route
app.use("/webhook",bodyParser.raw({ type: "application/json" }), require("./Controller/routes/webHookOrders"));

//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//middleware for session
let sessionStore = new SequelizeStore({
  db: sequelizeDb,
  checkExpirationInterval: 1800000,
});
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
    store: sessionStore,
  })
);
sessionStore.sync();




// this is for cache header to cache static file like images
let options = {
  etag: true,
  redirect: true,
  setHeaders: function (res, path, stat){
    // any other header in response
    res.set({
      'x-timestamp': Date.now(),
      "Hello": "world",
      "Cache-Control": "public, max-age: 86400,"
    })
  }
}
//server static files which is images
app.use(express.static("public", options));

// routes
app.use("/products",setCache, require("./Controller/routes/products"));
app.use("/register", require("./Controller/routes/register"));
app.use("/login", require("./Controller/routes/login"));
app.use("/refresh", require("./Controller/routes/refreshToken"));
app.use("/logout", require("./Controller/routes/logout"));
app.use("/forgot-pwd", require("./Controller/routes/forgotPwd"))

app.use("/cart", require("./Controller/routes/cart"));

app.use(verifyJWT);
app.use("/checkout", require("./Controller/routes/checkout"));
app.use("/orders",require("./Controller/routes/userOrder"));




app.listen(PORT, async () => {
  try {
    console.log("Server up on http://localhost:3000");
    await sequelize.authenticate();
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
  }
});
