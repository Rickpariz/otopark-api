const express = require('express');
const routes = express.Router();
const UsuarioController = require('./controllers/UsuarioController');
const EstacionamentoController = require('./controllers/EstacionamentoController');
const ClienteController = require('./controllers/ClienteController');
const VeiculoController = require('./controllers/VeiculoController');
const VagaController = require('./controllers/VagaController');
const TabelaDePrecoController = require('./controllers/TabelaDePrecoController');
const SistemaController = require('./controllers/SistemaController');
const ReservaController = require('./controllers/ReservaController');
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


// Rotas de Veiculos
routes.get('/veiculos/:veiculo', VeiculoController.getOne)
routes.route('/veiculos')
    .get(VeiculoController.getAll)
    .post(VeiculoController.create)
    .put(VeiculoController.update)


// Rotas de Vagas
routes.get('/vagas/:vaga', VagaController.getOne)
routes.route('/vagas')
    .get(VagaController.getAll)
    .post(VagaController.create)
    .put(VagaController.update)


// Rotas de tabelas de preço
routes.get('/tabeladeprecos/:tabeladepreco', TabelaDePrecoController.getOne)
routes.route('/tabeladeprecos')
    .get(TabelaDePrecoController.getAll)
    .post(TabelaDePrecoController.create)
    .put(TabelaDePrecoController.update)


// Rotas de reservas
routes.get('/reservas/:reserva', ReservaController.getOne)
routes.route('/reservas')
    .get(ReservaController.getAll)
    .post(ReservaController.create)
    .put(ReservaController.update)

// rotas do Sistema
routes.post('/system/login', SistemaController.login)


module.exports = routes;