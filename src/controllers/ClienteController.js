const mongoose = require('mongoose');
const Cliente = require('../models/Cliente');

module.exports = {
    async create(req, res) {
        try {
            const { nome, rg, estacionamento, telefone } = req.body;

            if (!nome || !rg || !estacionamento || !telefone) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const cliente = await Cliente.create({
                nome,
                rg,
                estacionamento: new mongoose.Types.ObjectId(estacionamento),
                telefone
            });

            return res.json(cliente);
        } catch (err) { res.status(500).send(err.message) }
    },

    async getAll(req, res) {
        try {

            const clientes = await Cliente.find().exec();
            return res.json(clientes);

        } catch (err) { res.status(500).send(err.message) }
    },

    async getOne(req, res) {
        try {
            const { cliente } = req.params;

            if (!cliente) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const clienteEncontrado = await Cliente.findOne({ _id: new mongoose.Types.ObjectId(cliente) }).exec();
            return res.json(clienteEncontrado);

        } catch (err) { res.status(500).send(err.message) }
    },

    async update(req, res) {
        try {
            const { cliente, nome, rg, estacionamento, telefone } = req.body;

            if (!cliente || !nome || !rg || !estacionamento || !telefone) {
                return res.status(500).send('Informações não enviadas para o servidor');
            }

            const clienteAtualizado = await Cliente.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(cliente) },
                {
                    $set: {
                        nome,
                        rg,
                        estacionamento: new mongoose.Types.ObjectId(estacionamento),
                        telefone
                    }
                }, { new: true }).exec();

            return res.json(clienteAtualizado);
        } catch (err) { res.status(500).send(err.message) }
    }
}