/**
 * Express es la funcion que trae todos los metodos 
 * de esta infraestructura http y middleware
 * 
 * Middleware: es un bloque de codigo que se ejecuta ENTRE 
 * el req hasta que la peticion llegue al servidor
 */


const express = require('express');
const cors = require('cors');
const monk = require('monk');
const app = express();
const port = 2001;
const db = monk('localHost:27017/agenda');
const usuarios = db.get('contactos');

app.use(cors());

app.use(express.json());
// app.enable('trust proxy');

autenticacionValida = (user) =>{
  return user.username && user.username.toString().trim() != '' 
  && user.password && user.password.toString().trim() != '';
}

app.get('/', (req, res) => {
  res.json({
    message: 'Esperando los contactos....',
  });
});
app.post('/contactos', (req, res) => {
  if (autenticacionValida(req.body)) {
    const user = {
      username: req.body.username.toString(),
      passwd: req.body.password.toString(),
      created: new Date(),
    };
    console.log(user);

    usuarios.insert(user).then(usuarios => {
      res.json(usuarios);
    });
    }
    else 
    {
      res.status(402);
        res.json({
            message:'Name and spaces are required'
        })
    }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
