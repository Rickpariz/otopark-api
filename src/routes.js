const express = require('express');
const UsuarioController = require('./controllers/UsuarioController');
const routes = express.Router();

routes.get('/usuarios', UsuarioController.create)

module.exports = routes;