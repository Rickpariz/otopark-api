const express = require('express');
const UsuarioController = require('./controllers/UsuarioController');
const routes = express.Router();

routes.get('/usuarios/:usuario', UsuarioController.getOne)
routes.route('/usuarios')
    .get(UsuarioController.getAll)
    .post(UsuarioController.create)
    .put(UsuarioController.update)

module.exports = routes;