const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/Authroute.js");
const { MONGO_URL,CLIENT_URL} = process.env;

mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

  const PORT=4000;
  
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use('/',(req,res)=>{
  res.send("hello from server");
})
app.use(cors({
  origin:CLIENT_URL,
  credentials: true
}));
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
