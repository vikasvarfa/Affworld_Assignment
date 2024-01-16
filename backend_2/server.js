const express = require("express");
const cors = require("cors");
const signin = require("./route/auth/signin");
const signup = require("./route/auth/signup");
const auth = require("./middleware/auth");
const add_secret = require("./route/protectedroutes/add_secret");
const get_secrets = require("./route/protectedroutes/get_secrets");
const app = express();

require("dotenv").config();

// Connect to database
require("./config/database").connect();

const PORT = process.env.PORT || 9002;

app.use(express.json());
app.use(cors());

app.post("/signup", signup);
app.post("/signin", signin);
app.post("/add_secret", auth, add_secret);
app.get("/get_secrets", auth, get_secrets);
app.listen(PORT, () =>
  console.log(`Server started : http://localhost:${PORT}`)
);
