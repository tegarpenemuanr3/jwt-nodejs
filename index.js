const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

app.get("/", (req, res, nexr) => {
  res.json({
    message: "Hello mas broo..",
  });
});

app.post("/", verifyUser, (req, res, nexr) => {
  res.json({
    message: "Hello mas broo..ini method POST loh..",
    data: req.body,
  });
});

app.post("/login", (req, res, next) => {
  const user = {
    id: 1,
    username: "admin",
    email: "admin@mail.com",
  };
  jwt.sign(user, "secret", { expiresIn: "30s" }, (err, token) => {
    if (err) {
      console.log(err);
      res.sendStatus(304);
      return;
    }
    const tokenGenerate = token;

    res.json({
      user: user,
      token: tokenGenerate,
    });
  });
});

function verifyUser(req, res, next) {
  const bearer = req.headers.bearer;
  jwt.verify(bearer, "secret", (err, data) => {
    if (err) {
      console.log(err.message);
      res.json(err);
    }
    req.body = data;
    next();
  });
}

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
