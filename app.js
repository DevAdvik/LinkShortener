const express = require("express");
const cors = require("cors");
const createURL = require("./routes/createShortUrl");
const redirect = require("./routes/redirect");
const app = express();

const PORT = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(cors());

// Routes
app.use("/createShortUrl", createURL);
app.use("*", redirect);

// console.log(hashIt("test"));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}....`);
})

