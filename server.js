const express = require("express"); //importing express
const mongoose = require("mongoose"); //importing mongoose
const cors = require("cors"); //importing cors
const User = require("./models/user"); //importing the database model
const bodyParser = require("body-parser"); //importing body-parser
const port = 3000; // assigning 3000 as port number

const app = express(); //declaring app
app.use(bodyParser.json()); //app using body-parser
app.use(cors()); //app using cors
// connecting mongo database
mongoose
  .connect(
    "mongodb+srv://gamkagroverofficial:0CtmSxEmIWcDdVK2@cluster0.hhdhcsp.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("db is connected");
  });
// ???????
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
// register request
app.post("/register", async (req, res) => {
  console.log("hello");
  const { firstname, lastname, username, password } = req.body;
  console.log(req.body);
  if (!firstname || !lastname || !username || !password)
    return res.json({ status: "error", error: "Invalid Credentials!" });

  try {
    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
    });
    console.log(user);
    return res.status(200).json({ status: "ok" });
  } catch (err) {
    return res
      .status(404)
      .json({ status: "error", error: "Invalid Credentials!" });
  }
});

// display data from api
app.get("/", async (req, res) => {
  const user = await User.find();
  res.json(user);
});
//connecting server
app.listen(port, () => {
  console.log("server up");
});
