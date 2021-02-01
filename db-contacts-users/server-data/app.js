const express = require("express");
const cors = require("cors");
const monk = require("monk");
const app = express();
const port = 2001;
const db = monk("localHost:27017/agenda");
const usuarios = db.get("contactos");

app.use(cors());

app.use(express.json());
app.enable('trust proxy');

app.get("/", (req, res) => {
  res.json({
    message: "Esperando los contactos....",
  });
});
app.post("/contactos", (req, res) => {
  const user = {
    username: req.body.username.toString(),
    passwd: req.body.passwd.toString(),
    created: new Date(),
  };
  console.log(user);

  usuarios.insert(user).then((usuario) => {
    res.json(usuarios);
  });
});
// app.enable('trust proxy');

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
