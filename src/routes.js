const express = require('express');
const routes = express.Router();
const UsuarioController = require('./controllers/UsuarioController');
const EstacionamentoController = require('./controllers/EstacionamentoController');
const ClienteController = require('./controllers/ClienteController');


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


// Rotas de Cliente
routes.get('/clientes/:cliente', ClienteController.getOne)
routes.route('/clientes')
    .get(ClienteController.getAll)
    .post(ClienteController.create)
    .put(ClienteController.update)



module.exports = routes;