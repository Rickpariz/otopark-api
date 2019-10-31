const express = require('express');
const UsuarioController = require('./controllers/UsuarioController');
const EstacionamentoController = require('./controllers/EstacionamentoController');
const routes = express.Router();


// Rotas de Usuários
routes.get('/usuarios/:usuario', UsuarioController.getOne)
routes.route('/usuarios')
    .get(UsuarioController.getAll)
    .post(UsuarioController.create)
    .put(UsuarioController.update)


// Rotas de Estacionamento
routes.get('/estacionamentos/:estacionamento', EstacionamentoController.getOne)
routes.route('/estacionamentos')
    .get(EstacionamentoController.getAll)
    .post(EstacionamentoController.create)
    .put(EstacionamentoController.update)



module.exports = routes;