// CONSTANTES

const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const path = require("path");
const passport = require('passport');
const session = require('express-session');
const routes = require("./src/routes");
const flash = require('connect-flash');
const DB = require('./src/setup/DB.js')
const PORT = '3000'

// APP USE
const app = express();

// CONFIGURAÇÕES APP.USE
app.use(session({
  secret: '%f7qbk)MET*t0z=LGV_vGQJ!$w/SX(NV(.xujTqp=6^hpQlz)$RUT*U9e$g;V',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "src", "views"));


// ROTAS
app.use("/", routes);

// CONEXÃO COM O BANCO DE DADOS
DB.connect()

// CRIAÇÃO DO USUÁRIO PADRÃO NO SISTEMA
const DefaultUserController = require("./src/controllers/DefaultUserController");
DefaultUserController.createDefaultUser();

// SERVER START
app.listen(PORT, () => {
  console.log(`Servidor web rodando na porta ${PORT}.`);
  console.log(`Link de acesso à aplicação: http://localhost:${PORT}`);
})
