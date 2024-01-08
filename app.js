const express = require("express");
const dotenv = require("dotenv");
const hashIt = require("./hashing");
const redirect = require("./routes/redirect");
const app = express();

dotenv.config({ path: './.env' })
const PORT = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("*", redirect);

app.get('/', (req, res) => {
    res.status(200).json({success: true, data: "empty"});
})

console.log(hashIt("test"));


app.listen(PORT, () => {
    console.log("Server running on port 5000....");
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