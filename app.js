const express = require("express");
const cors = require("cors");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

// Importing routers
const createURL = require("./routes/createShortUrl");
const redirect = require("./routes/redirect");
const signup = require("./routes/signup");
const login = require("./routes/login");
const logout = require("./routes/logout");
const dashboard = require("./routes/dashboard");
const deleteLink = require("./routes/deleteZipLink");
const editData = require("./routes/editZipLink");

// Importing helpers
const db = require("./helpers/database");

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(cors());
app.use(session({
    store: new pgSession({
        pool: db,
        tableName: 'user_sessions'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days (in milliseconds)
    }
}))

// Routes
app.use("/createShortUrl", createURL);
app.use("/signup", signup);
app.use("/login", login);
app.use("/logout", logout);
app.use("/dashboard", dashboard);
app.use("/delete", deleteLink);
app.use("/edit", editData);
app.use("*", redirect);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}....`);
})

