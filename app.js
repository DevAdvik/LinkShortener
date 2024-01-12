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























// const supabase = createClient("https://kidmlezzyxdsnnwhyplp.supabase.co", process.env.SUPABASEAPI);

// const fetchUrl = async (short_url) => {
//     const { data, error } = await supabase
//         .from("shortlinks")
//         .select("*")
//         .eq("short_url", short_url)
//     console.log(data);
//     if (data.length) {
//         console.log("yes");
//     } else {
//         console.log("no");
//     }
// }
// fetchUrl("test");